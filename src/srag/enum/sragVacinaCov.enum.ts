export enum SragVacinaCovEnum {
  SIM = 1,
  NAO = 2,
  IGNORADO = 9,
}

export const SragVacinaCovLabels = {
  [SragVacinaCovEnum.SIM]: 'Sim',
  [SragVacinaCovEnum.NAO]: 'Não',
  [SragVacinaCovEnum.IGNORADO]: 'Ignorado',
};
