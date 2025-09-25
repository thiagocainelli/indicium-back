import { UsersService } from '../users/users.service';
import { SragService } from '../srag/srag.service';

export async function initModules() {
  await UsersService.initSuperAdmin();

  if (process.env.NODE_ENV !== 'prod') {
    await SragService.initIngestionIfEmpty();
  } else {
    console.log('SRAG ingestion skipped in production');
  }
}
