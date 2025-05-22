import { z } from 'zod';

export const formSchema = z.object({
  dataIngresso: z.coerce
    .date({
      errorMap: () => ({
        message: 'Dala Inválida',
      }),
    })
    .max(new Date('2019-12-17'), {
      message: 'A data máxima para ingresso é 17/12/2019',
    }),
  feriasAnuais: z.string().optional(),
  feriasPremio: z.string().optional(),
  tempoAverbadoAnos: z.string().optional(),
  tempoAverbadoDias: z.string().optional(),
  tempoAverbadoAnosUniversity: z.string().optional(),
  diasDesconto: z.string().optional(),
  afterFeriasAnuais: z.string().optional(),
  afterFeriasPremio: z.string().optional(),
  afterDiasDesconto: z.string().optional(),
  afterTempoAverbadoAnos: z.string().optional(),
  afterTempoAverbadoDias: z.string().optional(),
});

export type Schema = z.infer<typeof formSchema>;
