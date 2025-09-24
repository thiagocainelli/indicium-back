export enum SragEvolucaoEnum {
  CURA = 1,
  OBITO = 2,
  OBITO_OUTRAS_CAUSAS = 3,
}

export const SragEvolucaoLabels = {
  [SragEvolucaoEnum.CURA]: 'Cura',
  [SragEvolucaoEnum.OBITO]: 'Óbito',
  [SragEvolucaoEnum.OBITO_OUTRAS_CAUSAS]: 'Óbito por outras causas',
};
