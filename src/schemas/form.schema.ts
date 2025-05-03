import { z } from 'zod';

// export const formSchema = z.date().max(new Date('2019-12-17'), {
//   message: 'Data deve ser menor que 17/12/2019',
// });

export const formSchema = z.object({
  dataIngresso: z.string().date(),
  feriasAnuais: z.string().optional(),
  feriasPremio: z.string().optional(),
  tempoAverbadoAnos: z.string().optional(),
  tempoAverbadoDias: z.string().optional(),
  diasDesconto: z.string().optional(),
  afterFeriasAnuais: z.string().optional(),
  afterFeriasPremio: z.string().optional(),
  afterDiasDesconto: z.string().optional(),
  afterTempoAverbadoAnos: z.string().optional(),
  afterTempoAverbadoDias: z.string().optional(),
});

export type Schema = z.infer<typeof formSchema>;
