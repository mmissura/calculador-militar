import { FormFieldsProps } from './types/form.types';

import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit } = useForm<FormFieldsProps>();
  const getYear = new Date().getFullYear();

  const onSubmit = (data: FormFieldsProps) => {
    console.log(data);
  };

  return (
    <div className='w-full'>
      <header className='text-center py-10 flex flex-col justify-center items-center bg-linear-to-b from-orange-400 to-orange-500 mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-white'>
          Cálculo do Tempo de Serviço, Pedágio e Data de Transferência para a
          Reserva
        </h2>
        <p className='text-white mt-2'>
          Conforme ITRH número 286, de 05 de dezembro de 2022
        </p>
      </header>

      <h3 className='text-lg font-semibold text-slate-700 mb-6 flex justify-center'>
        Informar os dados anteriores / posteriores a 01/01/2022
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-6 mb-10'>
          <div className='bg-slate-100 p-6 rounded-md shadow-md w-full'>
            <h4 className='text-md font-semibold text-orange-400 mb-4 text-center'>
              Dados anteriores a 01/01/2022
            </h4>
            <div className='grid xl:grid-cols-12 md:grid-cols-12 gap-4'>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Data de ingresso no CBMMG:
                </label>
                <input
                  type='date'
                  max={new Date('2021, 12, 31').toISOString().split('T')[0]}
                  {...register('dataIngresso')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>* Dia / Mês / Ano</p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Férias Anuais
                </label>
                <input
                  type='text'
                  {...register('feriasAnuais')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Dias'
                />
                <p className='text-sm text-slate-500'>
                  * Férias anuais na vantagem de forma simples (Dias)
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Férias Prêmio
                </label>
                <input
                  type='text'
                  {...register('feriasPremio')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Férias-prêmio na vantagem de forma simples (Dias)
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Tempo Averbado
                </label>
                <input
                  type='text'
                  {...register('tempoAverbadoAnos')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Tempo averbado de outros órgãos (Anos)
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Tempo Averbado
                </label>
                <input
                  type='text'
                  {...register('tempoAverbadoDias')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Tempo averbado de outros órgãos (Dias)
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Dias a serem descontados
                </label>
                <input
                  type='text'
                  {...register('diasDesconto')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Verificar descontos legais
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-md border border-slate-100 w-full'>
            <h4 className='text-md font-semibold text-orange-400 mb-4 text-center'>
              Dados posteriores a 01/01/2022
            </h4>
            <div className='grid xl:grid-cols-12 md:grid-cols-12 gap-4'>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Data de ingresso no CBMMG:
                </label>
                <input
                  type='date'
                  {...register('afterDataIngresso')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>* Dia / Mês / Ano</p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Férias Anuais
                </label>
                <input
                  type='text'
                  {...register('afterFeriasAnuais')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Dias'
                />
                <p className='text-sm text-slate-500'>
                  * Férias anuais na vantagem de forma simples (Dias)
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Férias Prêmio
                </label>
                <input
                  type='text'
                  {...register('afterFeriasPremio')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Férias-prêmio na vantagem de forma simples (Dias)
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Tempo Averbado
                </label>
                <input
                  type='text'
                  {...register('afterTempoAverbadoAnos')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Tempo averbado de outros órgãos (Anos)
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Tempo Averbado
                </label>
                <input
                  type='text'
                  {...register('afterTempoAverbadoDias')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Tempo averbado de outros órgãos (Dias)
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Dias a serem descontados
                </label>
                <input
                  type='text'
                  {...register('afterDiasDesconto')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Verificar descontos legais
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='border-b border-b-slate-200 shadow-sm'>
          <div className='flex justify-center my-10'>
            <button
              type='submit'
              className='bg-orange-400 py-3 px-6 w-3/4 rounded text-white font-semibold hover:bg-orange-500'
            >
              Calcular
            </button>
          </div>
        </div>
        <h3 className='text-lg font-semibold text-orange-500 my-6 flex justify-center'>
          Tabela do pedágio
        </h3>

        <div className='bg-white p-6 rounded-md shadow-md w-full mb-6'>
          <div className='grid xl:grid-cols-12 md:grid-cols-12 gap-4'>
            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Tempo faltante da reserva remunerada e abono permanência
              </label>
              resultado
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Pedágio para reserva voluntária e abono permanência
              </label>
              resultado
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Tempo de serviço exigido para o militar
              </label>
              resultado
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Efetivo serviço exigido para a militar
              </label>
              resultado
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Tempo faltante para transferência compulsória para a reserva
              </label>
              resultado
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Pedágio para reserva compulsória
              </label>
              resultado
            </div>

            <div className='sm:col-span-2 lg:col-span-3 mb-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Tempo de efetivo serviço máximo permitido
              </label>
              resultado
            </div>
          </div>
        </div>

        <h3 className='text-lg font-semibold text-slate-700 mb-4 flex justify-center'>
          <span className='text-orange-500'>Resultados</span>
        </h3>

        <div className='bg-slate-100 p-6 rounded-md w-full mb-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Data da reserva voluntária e jus ao abono permanência
              </label>
              resultado
            </div>

            <div>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Data da reserva voluntária da militar
              </label>
              resultado
            </div>

            <div>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Data da reserva compulsória
              </label>
              resultado
            </div>
          </div>
        </div>
      </form>

      <footer className='text-center text-sm p-4 bg-slate-300'>
        <div className='2xl:w-auto xl:w-auto 2xl:px-0 xl:px-0 w-full px-3'>
          <p className='text-slate-600 text-center text-sm'>
            Copyright © {getYear} Jean Georges Hallal Junior.
          </p>
          <p className='text-slate-600 text-center text-xs pt-3'>
            Desenvolvido por
            <a
              href='https://missura.com.br'
              target='_blank'
              className='text-slate-600'
            >
              {' '}
              <strong>Missura Networks.</strong>
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
