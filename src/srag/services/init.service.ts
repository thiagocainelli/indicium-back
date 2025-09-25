import fs from 'fs';
import path from 'path';
import { parse } from 'fast-csv';
import prisma from '../../_core/prisma.pg';
import { HttpException } from '@/_common/exceptions/httpException';

type SragCsvRow = Record<string, string | undefined>;

const CSV_DIR = path.resolve(process.cwd(), 'csv-data');

export class InitService {
  static async initIngestionIfEmpty(): Promise<void> {
    try {
      const count = await prisma.sRAG.count();
      if (count > 0) {
        console.info('SRAG table already populated. Skipping ingestion.');
        return;
      }
      console.info('SRAG table empty. Starting ingestion from csv-data...');
      await InitService.ingestAllCsvFiles();
    } catch (error) {
      console.error('Error during CSV ingestion:', error);
      throw new HttpException(
        400,
        `Erro ao iniciar ingestão de CSV: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      );
    }
  }

  static async ingestAllCsvFiles(): Promise<{ files: string[]; inserted: number } | void> {
    try {
      // Verificar se o diretório existe
      if (!fs.existsSync(CSV_DIR)) {
        throw new Error(`Diretório CSV não encontrado: ${CSV_DIR}`);
      }

      const files = await fs.promises.readdir(CSV_DIR);
      const csvFiles = files.filter((f) => f.toLowerCase().endsWith('.csv'));

      if (csvFiles.length === 0) {
        throw new Error('Nenhum arquivo CSV encontrado no diretório');
      }

      console.info(`Encontrados ${csvFiles.length} arquivos CSV para processar`);

      let totalInserted = 0;

      for (const fileName of csvFiles) {
        try {
          const filePath = path.join(CSV_DIR, fileName);
          console.info(`Processando arquivo: ${fileName}`);
          const inserted = await this.ingestOneFile(filePath);
          totalInserted += inserted;
          console.info(`Processed ${fileName}: ${inserted} records inserted`);
        } catch (fileError) {
          console.error(`Erro ao processar arquivo ${fileName}:`, fileError);
          // Continuar com os outros arquivos
        }
      }

      console.info(`Total records inserted: ${totalInserted}`);
      return { files: csvFiles, inserted: totalInserted };
    } catch (error) {
      console.error('Error in ingestAllCsvFiles:', error);
      throw new HttpException(
        400,
        `Erro ao ingerir CSV: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      );
    }
  }

  private static async ingestOneFile(filePath: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const stream = fs.createReadStream(filePath);
      const rows: SragCsvRow[] = [];
      let inserted = 0;

      const BATCH_SIZE = 1000;

      const flushBatch = async () => {
        if (rows.length === 0) return;
        const batch = rows.splice(0, rows.length);

        // ✅ manter contexto
        const data = batch.map((row) => InitService.mapCsvRowToPrismaCreate(row));

        try {
          const res = await prisma.sRAG.createMany({ data, skipDuplicates: true });
          inserted += res.count;
        } catch (err) {
          reject(err);
        }
      };

      stream
        .pipe(
          parse<SragCsvRow, SragCsvRow>({
            headers: true,
            delimiter: ';',
            quote: '"',
            renameHeaders: false,
            discardUnmappedColumns: false,
            ignoreEmpty: true,
            trim: true,
          }),
        )
        .on('error', (error) => reject(error))
        .on('data', (row: SragCsvRow) => {
          rows.push(row);
          if (rows.length >= BATCH_SIZE) {
            stream.pause();
            flushBatch()
              .then(() => stream.resume())
              .catch((e) => reject(e));
          }
        })
        .on('end', async () => {
          try {
            await flushBatch();
            resolve(inserted);
          } catch (e) {
            reject(e);
          }
        });
    });
  }

  private static parseDate(value?: string): Date | null {
    if (!value) return null;
    const v = value.trim();
    if (!v) return null;
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }

  private static parseIntOrNull(value?: string): number | null {
    if (!value) return null;
    const v = value.trim();
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : null;
  }

  private static mapCsvRowToPrismaCreate(row: SragCsvRow) {
    return {
      nuNotific: row['NU_NOTIFIC'] || null,
      dtNotific: InitService.parseDate(row['DT_NOTIFIC']) || null,
      dtSinPri: InitService.parseDate(row['DT_SIN_PRI']) || null,
      sgUf: row['SG_UF'] || row['SG_UF_NOT'] || null,
      coMunRes: row['CO_MUN_RES'] || null,
      csSexo: row['CS_SEXO'] || null,
      idadeNumerica: InitService.parseIntOrNull(row['NU_IDADE_N']),
      evolucao: InitService.parseIntOrNull(row['EVOLUCAO']),
      uti: InitService.parseIntOrNull(row['UTI']),
      dtEntUti: InitService.parseDate(row['DT_ENTUTI']) || null,
      dtSaiUti: InitService.parseDate(row['DT_SAIDUTI']) || null,
      vacinaCov: InitService.parseIntOrNull(row['VACINA_COV']),
      dose1Cov: InitService.parseDate(row['DOSE_1_COV']) || null,
      dose2Cov: InitService.parseDate(row['DOSE_2_COV']) || null,
      doseRef: InitService.parseDate(row['DOSE_REF']) || null,
    };
  }
}
