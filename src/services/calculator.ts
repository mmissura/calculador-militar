import { FormFieldsProps } from '../types/form.types';
import { addDays, parseISO, startOfDay } from 'date-fns';

interface CalculatedResults {
  tempoFaltanteReserva: number;
  pedagioReservaVoluntaria: number;
  tempoServicoExigido: number;
  efetivoServicoExigido: number;
  tempoFaltanteCompulsoria: number;
  pedagioCompulsoria: number;
  tempoEfetivoMaximo: number;
  dataReservaVoluntaria: Date;
  dataReservaVoluntariaMilitar: Date;
  dataReservaCompulsoria: Date;
}

export const calculateServiceTime = (
  data: FormFieldsProps,
): CalculatedResults => {
  // Data de referência fixa
  const dataReferencia = startOfDay(parseISO('2022-01-01'));
  const dataIngresso = data.dataIngresso
    ? startOfDay(parseISO(data.dataIngresso))
    : new Date();

  // Converter valores para números
  const feriasAnuais = Number(data.feriasAnuais) || 0;
  const feriasPremio = Number(data.feriasPremio) || 0;
  const tempoAverbadoAnos = Number(data.tempoAverbadoAnos) || 0;
  const tempoAverbadoDias = Number(data.tempoAverbadoDias) || 0;
  const diasDesconto = Number(data.diasDesconto) || 0;
  const afterFeriasAnuais = Number(data.afterFeriasAnuais) || 0;
  const afterFeriasPremio = Number(data.afterFeriasPremio) || 0;
  const afterDiasDesconto = Number(data.afterDiasDesconto) || 0;
  const afterTempoAverbadoAnos = Number(data.afterTempoAverbadoAnos) || 0;
  const afterTempoAverbadoDias = Number(data.afterTempoAverbadoDias) || 0;

  // Cálculo do tempo de efetivo serviço (K15)
  const tempoEfetivoServico = Math.floor(
    (dataReferencia.getTime() - dataIngresso.getTime()) /
      (1000 * 60 * 60 * 24) -
      diasDesconto +
      1,
  );

  // Cálculo do tempo faltante efetivo serviço (K16)
  const tempoFaltanteEfetivoServico = 10950 - tempoEfetivoServico;

  // Cálculo do pedágio efetivo serviço (K17)
  const pedagioEfetivoServico = Math.ceil(tempoFaltanteEfetivoServico * 0.17);

  // Cálculo do tempo faltante de serviço (K18)
  const tempoFaltanteServico =
    10950 -
    (tempoEfetivoServico +
      feriasAnuais * 2 +
      feriasPremio * 2 +
      tempoAverbadoAnos * 365 +
      tempoAverbadoDias);

  // Cálculo do pedágio de tempo de serviço (K19)
  const pedagioTempoServico = Math.ceil(tempoFaltanteServico * 0.17);

  // Cálculos para militares femininos
  const tempo = Math.floor(
    (dataReferencia.getTime() - dataIngresso.getTime()) /
      (1000 * 60 * 60 * 24) +
      1 -
      diasDesconto +
      feriasPremio +
      feriasAnuais,
  );

  const tempoApurado = tempo / 365;

  // Função para determinar o tempo total exigido baseado no tempo apurado
  const getTempoTotalExigido = (tempoApurado: number): number => {
    if (tempoApurado < 11) return 10950;
    if (tempoApurado < 12) return 10825;
    if (tempoApurado < 13) return 10705;
    if (tempoApurado < 14) return 10585;
    if (tempoApurado < 15) return 10460;
    if (tempoApurado < 16) return 10340;
    if (tempoApurado < 17) return 10220;
    if (tempoApurado < 18) return 10095;
    if (tempoApurado < 19) return 9975;
    if (tempoApurado < 20) return 9855;
    if (tempoApurado < 21) return 9730;
    if (tempoApurado < 22) return 9610;
    if (tempoApurado < 23) return 9490;
    if (tempoApurado < 24) return 9365;
    if (tempoApurado < 25) return 9245;
    return 10950;
  };

  const tempoTotalExigido = getTempoTotalExigido(tempoApurado);

  // Cálculo do tempo exigido
  const tempoExigido = 10950 + pedagioTempoServico;

  // Cálculo do tempo máximo
  const tempoMaximo = 10950 + pedagioEfetivoServico;

  // Cálculo das datas
  const dataReservaVoluntaria = addDays(
    dataReferencia,
    tempoFaltanteEfetivoServico +
      pedagioTempoServico -
      182 -
      (afterFeriasAnuais * 2 + afterFeriasPremio * 2) +
      afterDiasDesconto -
      (afterTempoAverbadoAnos * 365 + afterTempoAverbadoDias) +
      1,
  );

  const dataReservaVoluntariaMilitar = addDays(
    dataIngresso,
    tempoTotalExigido +
      afterDiasDesconto -
      afterFeriasPremio -
      afterFeriasAnuais +
      diasDesconto -
      feriasAnuais -
      feriasPremio,
  );

  const dataReservaCompulsoria = addDays(
    dataReferencia,
    tempoFaltanteEfetivoServico + pedagioEfetivoServico + afterDiasDesconto + 1,
  );

  return {
    tempoFaltanteReserva: tempoFaltanteServico,
    pedagioReservaVoluntaria: pedagioTempoServico,
    tempoServicoExigido: tempoExigido,
    efetivoServicoExigido: tempoTotalExigido,
    tempoFaltanteCompulsoria: tempoFaltanteEfetivoServico,
    pedagioCompulsoria: pedagioEfetivoServico,
    tempoEfetivoMaximo: tempoMaximo,
    dataReservaVoluntaria,
    dataReservaVoluntariaMilitar,
    dataReservaCompulsoria,
  };
};
