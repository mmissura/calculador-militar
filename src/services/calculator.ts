import { Schema } from '../schemas/form.schema';
import {
  addDays,
  isAfter,
  differenceInDays,
  differenceInYears,
} from 'date-fns';

interface CalculatedResults {
  tempoFaltanteReserva: number;
  pedagioReservaVoluntaria: number;
  tempoServicoExigido: number;
  efetivoServicoExigido: number | string;
  tempoFaltanteCompulsoria: number;
  pedagioCompulsoria: number;
  tempoEfetivoMaximo: number;
  dataReservaVoluntaria: Date;
  dataReservaVoluntariaMilitar: Date;
  dataReservaCompulsoria: Date;
  dataTempoNaturezaMilitar: {
    years: number;
    days: number;
  };
}

export const calculateServiceTime = (data: Schema): CalculatedResults => {
  // Data de referência fixa
  const dataReferencia = new Date('2022-01-01');
  const dataIngresso = new Date(data.dataIngresso);
  const dataReferenceDinamic = new Date(data.dataReferenceDinamic);
  // const getDifferenceInYears = differenceInYears(
  //   new Date(dataReferenceDinamic),
  //   new Date(dataIngresso),
  // );

  const getDifferenceInDays = differenceInDays(
    new Date(dataReferenceDinamic),
    new Date(dataIngresso),
  );

  // console.log(getDifferenceInYears, getDifferenceInDays);

  // Converter valores para números
  const feriasAnuais = Number(data.feriasAnuais) || 0;
  const feriasPremio = Number(data.feriasPremio) || 0;
  const tempoAverbadoAnos = Number(data.tempoAverbadoAnos) || 0;
  const tempoAverbadoDias = Number(data.tempoAverbadoDias) || 0;
  const tempoAverbadoAnosUniversity =
    Number(data.tempoAverbadoAnosUniversity) || 0;
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
      tempoAverbadoDias +
      tempoAverbadoAnosUniversity * 365);
  // =10950-(K15+D5*2+D6*2+C7*365+D7+C9*365)

  function convertDaysToYearsAndDays(totalDays: number) {
    const baseDate = new Date(data.dataReferenceDinamic); // data base fixa
    const targetDate = addDays(baseDate, totalDays);

    const years = differenceInYears(targetDate, baseDate);
    const days = differenceInDays(targetDate, addDays(baseDate, years * 365));

    return { years, days };
  }

  const tempoFaltanteServicoNaturezaMilitar =
    getDifferenceInDays +
    1 -
    diasDesconto +
    feriasAnuais * 2 +
    feriasPremio * 2 +
    tempoAverbadoAnosUniversity * 365 +
    tempoAverbadoDias +
    tempoAverbadoAnos * 365 +
    afterFeriasAnuais +
    afterFeriasPremio -
    afterDiasDesconto +
    afterTempoAverbadoAnos * 365;
  // =10950-(K15+D5*2+D6*2+C7*365+D7+C9*365)

  console.log(
    '>>>>>',
    convertDaysToYearsAndDays(tempoFaltanteServicoNaturezaMilitar),
  );

  // Cálculo do pedágio de tempo de serviço (K19)
  const pedagioTempoServico = Math.ceil(tempoFaltanteServico * 0.17);

  // Cálculos para militares femininos
  const tempo = Math.floor(
    (dataReferencia.getTime() - dataIngresso.getTime()) /
      (1000 * 60 * 60 * 24) +
      1 -
      diasDesconto +
      feriasPremio +
      feriasAnuais +
      tempoAverbadoAnosUniversity * 365,
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

  const getTempoTotalExigidoWoman = (tempoApurado: number): string => {
    if (tempoApurado < 11) return '30 anos (10950 dias)';
    if (tempoApurado < 12) return '29 anos e 8 meses (10825 dias)';
    if (tempoApurado < 13) return '29 anos e 4 meses (10705 dias)';
    if (tempoApurado < 14) return '29 anos (10585 dias)';
    if (tempoApurado < 15) return '28 anos e 8 meses (10460 dias)';
    if (tempoApurado < 16) return '28 anos e 4 meses (10340 dias)';
    if (tempoApurado < 17) return '28 anos (10220 dias)';
    if (tempoApurado < 18) return '27 anos e 8 meses (10095 dias)';
    if (tempoApurado < 19) return '27 anos e 4 meses (9975 dias)';
    if (tempoApurado < 20) return '27 anos (9855 dias)';
    if (tempoApurado < 21) return '26 anos e 8 meses (9730 dias)';
    if (tempoApurado < 22) return '26 anos e 4 meses (9610 dias)';
    if (tempoApurado < 23) return '26 anos (9490 dias)';
    if (tempoApurado < 24) return '25 anos e 8 meses (9365 dias)';
    if (tempoApurado < 25) return '25 anos e 4 meses (9245 dias)';
    return 'Data já atingida';
  };

  const tempoTotalExigido = getTempoTotalExigido(tempoApurado);
  const tempoTotalExigidoWoman = getTempoTotalExigidoWoman(tempoApurado);

  // Cálculo do tempo exigido
  const tempoExigido = 10950 + pedagioTempoServico;

  // Cálculo do tempo máximo
  const tempoMaximo = 10950 + pedagioEfetivoServico;

  // Cálculo das datas
  const dataReservaVoluntaria = addDays(
    dataReferencia,
    tempoFaltanteServico +
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
      feriasPremio -
      tempoAverbadoAnosUniversity * 365 -
      afterTempoAverbadoAnos * 365,
  );

  // =IFERROR(IF(C2>0;IF(C2+K24+L7-L6-L5+D8-D6-D5>E20;E20;C2+K24+L7-L6-L5+D8-D5-D6);"");"Data já atingida")
  // =IFERROR(IF(C2>0;IF(C2+K24+L7-L6-L5+D8-D6-D5-C9*365-K8*365>E20;E20;C2+K24+L7-L6-L5+D8-D5-D6-C9*365-K8*365);"");"Nesse caso não há cálculo de pedágio.")

  const dataReservaCompulsoria = addDays(
    dataReferencia,
    tempoFaltanteEfetivoServico + pedagioEfetivoServico + afterDiasDesconto + 1,
  );

  return {
    tempoFaltanteReserva: tempoFaltanteServico,
    pedagioReservaVoluntaria: pedagioTempoServico,
    tempoServicoExigido: tempoExigido,
    efetivoServicoExigido: tempoTotalExigidoWoman,
    tempoFaltanteCompulsoria: tempoFaltanteEfetivoServico,
    pedagioCompulsoria: pedagioEfetivoServico,
    tempoEfetivoMaximo: tempoMaximo,
    dataReservaVoluntaria,
    dataReservaVoluntariaMilitar: isAfter(
      dataReservaVoluntariaMilitar,
      dataReservaVoluntaria,
    )
      ? dataReservaVoluntaria
      : dataReservaVoluntariaMilitar,
    dataReservaCompulsoria,
    dataTempoNaturezaMilitar: convertDaysToYearsAndDays(
      tempoFaltanteServicoNaturezaMilitar,
    ),
  };
};
