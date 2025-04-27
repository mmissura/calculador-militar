export type FormFieldsProps = {
  // Dados anteriores a 01/01/2022
  dataIngresso?: string;
  feriasAnuais?: string;
  feriasPremio?: string;
  tempoAverbadoAnos?: string;
  tempoAverbadoDias?: string;
  diasDesconto?: string;

  // Dados posteriores a 01/01/2022
  afterFeriasAnuais?: string;
  afterFeriasPremio?: string;
  afterDiasDesconto?: string;
  afterTempoAverbadoAnos?: string;
  afterTempoAverbadoDias?: string;
};
