// ...importações

import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit } = useForm();
  const getYear = new Date().getFullYear();

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <>
      <div className='flex justify-center items-center border-b border-b-slate-200 shadow-sm pb-2 mb-6'>
        <header className='text-center my-10'>
          <h2 className='text-2xl md:text-3xl font-bold text-slate-800'>
            Cálculo do Tempo de Serviço, Pedágio e Data de Transferência para a
            Reserva
          </h2>
          <p className='text-slate-500 mt-2'>
            Conforme ITRH número 286, de 05 de dezembro de 2022
          </p>
        </header>
      </div>

      <h3 className='text-lg font-semibold text-slate-700 mb-4 flex justify-center'>
        Informar os dados{' '}
        <span className='text-green-600 mx-1'>anteriores</span> /{' '}
        <span className='text-green-600 mx-1'>posteriores</span> a 01/01/2022
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-10'>
          <div className='bg-white p-6 rounded-md shadow-md w-full'>
            <h4 className='text-md font-semibold text-slate-700 mb-4 text-center'>
              Dados anteriores a 01/01/2022
            </h4>
            <div className='grid xl:grid-cols-12 md:grid-cols-12 gap-4'>
              <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Data de ingresso no CBMMG:
                </label>
                <input
                  type='date'
                  {...register('dataIngresso')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>* Dia / Mês / Ano</p>
              </div>
              <div className='xl:col-span-3 md:col-span-4 col-span-12'>
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
              <div className='xl:col-span-4 md:col-span-4 col-span-12'>
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
              <div className='xl:col-span-3 md:col-span-4 col-span-12'>
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
              <div className='xl:col-span-2 md:col-span-4 col-span-12'>
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
              <div className='xl:col-span-2 md:col-span-4 col-span-12'>
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

          <div className='bg-white p-6 rounded-md shadow-md w-full'>
            <h4 className='text-md font-semibold text-slate-700 mb-4 text-center'>
              Dados posteriores a 01/01/2022
            </h4>
            <div className='grid xl:grid-cols-12 md:grid-cols-12 gap-4'>
              <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Data de ingresso no CBMMG:
                </label>
                <input
                  type='date'
                  {...register('dataIngresso1')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>* Dia / Mês / Ano</p>
              </div>
              <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Férias Anuais
                </label>
                <input
                  type='text'
                  {...register('feriasAnuais1')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Dias'
                />
                <p className='text-sm text-slate-500'>
                  * Férias anuais na vantagem de forma simples (Dias)
                </p>
              </div>
              <div className='xl:col-span-4 md:col-span-4 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Férias Prêmio
                </label>
                <input
                  type='text'
                  {...register('feriasPremio1')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Férias-prêmio na vantagem de forma simples (Dias)
                </p>
              </div>
              <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Tempo Averbado
                </label>
                <input
                  type='text'
                  {...register('tempoAverbadoAnos1')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Tempo averbado de outros órgãos (Anos)
                </p>
              </div>
              <div className='xl:col-span-2 md:col-span-4 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Tempo Averbado
                </label>
                <input
                  type='text'
                  {...register('tempoAverbadoDias1')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                />
                <p className='text-sm text-slate-500'>
                  * Tempo averbado de outros órgãos (Dias)
                </p>
              </div>
              <div className='xl:col-span-2 md:col-span-4 col-span-12'>
                <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                  Dias a serem descontados
                </label>
                <input
                  type='text'
                  {...register('diasDesconto1')}
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
          <div className='flex justify-center my-20 '>
            <button
              type='submit'
              className='bg-green-500 py-3 px-6 w-3/4 rounded text-white font-semibold hover:bg-green-600'
            >
              Calcular
            </button>
          </div>
        </div>
        <h3 className='text-lg font-semibold text-slate-700 my-6 flex justify-center'>
          Tabela do <span className='text-green-600 mx-1'>pedágio</span>
        </h3>

        <div className='bg-white p-6 rounded-md shadow-md w-full mb-6'>
          <div className='grid xl:grid-cols-12 md:grid-cols-12 gap-4'>
            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Tempo faltante da reserva remunerada e abono permanência
              </label>
              <input
                type='text'
                {...register('tempoFaltanteReserva')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
              />
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Pedágio para reserva voluntária e abono permanência
              </label>
              <input
                type='text'
                {...register('pedagioReservaVoluntaria')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                placeholder=''
              />
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Tempo de serviço exigido para o militar
              </label>
              <input
                type='text'
                {...register('tempoServicoMilitar')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
              />
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Efetivo serviço exigido para a militar
              </label>
              <input
                type='text'
                {...register('efetivoServicoMilitar')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
              />
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Tempo faltante para transferência compulsória para a reserva
              </label>
              <input
                type='text'
                {...register('tempoFaltanteCompulsoria')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
              />
            </div>

            <div className='xl:col-span-3 md:col-span-4 col-span-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Pedágio para reserva compulsória
              </label>
              <input
                type='text'
                {...register('pedagioCompulsoria')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
              />
            </div>

            <div className='sm:col-span-2 lg:col-span-3 mb-12'>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Tempo de efetivo serviço máximo permitido
              </label>
              <input
                type='text'
                {...register('tempoMaximoPermitido')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
              />
            </div>
          </div>
        </div>

        <h3 className='text-lg font-semibold text-slate-700 mb-4 flex justify-center'>
          <span className='text-green-600 mx-1'>Resultados</span>
        </h3>

        <div className='bg-white p-6 rounded-md shadow-md w-full mb-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Data da reserva voluntária e jus ao abono permanência
              </label>
              <input
                type='text'
                {...register('dataReservaVoluntaria')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
              />
            </div>

            <div>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Data da reserva voluntária da militar
              </label>
              <input
                type='text'
                {...register('dataReservaMilitar')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
              />
            </div>

            <div>
              <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                Data da reserva compulsória
              </label>
              <input
                type='text'
                {...register('dataReservaCompulsoria')}
                className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
              />
            </div>
          </div>
        </div>
      </form>

      <footer className='text-center text-sm p-4'>
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
    </>
  );
}

export default App;
