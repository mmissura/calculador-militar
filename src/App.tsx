import { useForm } from 'react-hook-form';
import { calculateServiceTime } from './services/calculator';
import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { IoIosFemale, IoIosInformationCircleOutline } from 'react-icons/io';
import { zodResolver } from '@hookform/resolvers/zod';

import { handleMenuScroll } from './utils/handleScroll';
import LogoBombeiro from './assets/bombeiro-logo.png';
import { CustomTooltip } from './components/CustomPopover';
import { formSchema, Schema } from './schemas/form.schema';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      dataReferenceDinamic: new Date().toISOString().split('T')[0],
    },
    resolver: zodResolver(formSchema),
  });
  const [results, setResults] = useState<ReturnType<
    typeof calculateServiceTime
  > | null>(null);

  const onSubmit = (data: Schema) => {
    const calculatedResults = calculateServiceTime(data);
    setResults(calculatedResults);

    setTimeout(() => {
      handleMenuScroll('result');
    }, 200);
  };

  const formatDate = (date: Date) => {
    const getCustomDate = addDays(new Date(date), 1);
    return format(getCustomDate, 'dd/MM/yyyy', { locale: ptBR });
  };

  const formatTimeInYearsAndDays = (days: number) => {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    // const remainMonths = Math.floor((days % 365.25) / 30.44);
    // return `${years} anos (${days} dias)`;
    // return `${years} anos e ${remainingDays} dias (${days} dias)`;
    return `${years} anos e ${remainingDays} dias`;
  };

  return (
    <div className='w-full'>
      <header className='text-center flex flex-row justify-center items-center bg-linear-to-b from-orange-400 to-orange-500 mb-6 p-2 gap-4 py-4 w-full 2xl:gap-x-16 xl:gap-x-16 lg:gap-x-16'>
        <img src={LogoBombeiro} alt='Logo Bombeiros' className='w-28' />
        <div>
          <h2 className='2xl:text-2xl xl:text-2xl lg:text-xl text-lg md:text-2xl font-bold text-white'>
            Cálculo do Tempo de Serviço, Pedágio e Data de Transferência para a
            Reserva
          </h2>
          <p className='text-white text-sm 2xl:text-lg xl:text-lg lg:text-lg'>
            Conforme ITRH número 286, de 05 de dezembro de 2022
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='2xl:w-1/3 xl:w-1/3 lg:w-1/3 w-full mx-auto px-6 mb-6'>
          <label className='text-sm text-orange-400 mb-1 font-semibold flex items-center gap-1'>
            Data de ingresso no CBMMG:{' '}
            <CustomTooltip
              className='w-72'
              content='Informe a data em que o militar ingressou na Instituição Militar Estadual (IME). A data utilizada para o cálculo do tempo de serviço, aplicação do pedágio e definição das datas de reserva. 
                Apenas militares com ingresso até 17/12/2019 se enquadram nas regras de transição previstas pela Lei Complementar nº 168/2022.'
            >
              <IoIosInformationCircleOutline
                size={18}
                data-popover-target='default-popover'
              />
            </CustomTooltip>
          </label>

          <input
            type='date'
            // max={new Date('2019-12-17').toISOString().split('T')[0]}
            {...register('dataIngresso')}
            className='w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400 data-[error]:border-red-600'
            data-error={errors && errors.dataIngresso}
          />
          <span className='text-sm text-slate-500'>* Dia / Mês / Ano</span>
          {errors && errors.dataIngresso && (
            <p className='text-sm text-red-500'>
              {errors.dataIngresso.message}
            </p>
          )}
        </div>
        {/* <div className='w-full flex flex-col justify-center'>
            <label className='text-sm text-orange-400 mb-1 font-semibold flex items-center gap-1'>
              Data de referência para o tempo de atividade militar:{' '}
              <CustomTooltip
                className='w-72'
                content='Este campo vem preenchido automaticamente com a data atual , servindo como base para calcular o tempo total de atividade de natureza militar do usuário. A data pode ser alterada caso o militar deseje verificar essa informação em relação a outro momento específico. A alteração da data é opcional e não interfere nos demais cálculos da calculadora'
              >
                <IoIosInformationCircleOutline
                  size={18}
                  data-popover-target='default-popover'
                />
              </CustomTooltip>
            </label>

            <input
              type='date'
              {...register('dataReferenceDinamic')}
              className='w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400 data-[error]:border-red-600'
              data-error={errors && errors.dataReferenceDinamic}
            />
            <span className='text-sm text-slate-500'>* Dia / Mês / Ano</span>
          </div> */}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-6 mb-10'>
          <div className='bg-slate-100 p-6 rounded-md shadow-md w-full'>
            <h4 className='text-md font-semibold text-orange-400 mb-4 text-center'>
              Dados anteriores a 01/01/2022{' '}
            </h4>
            <div className='grid xl:grid-cols-12 md:grid-cols-12 gap-4'>
              <div className='xl:col-span-4 col-span-12'>
                <label className='text-sm text-slate-700 mb-1 font-semibold flex items-center gap-1'>
                  Férias Anuais{' '}
                  <CustomTooltip
                    className='w-72'
                    content='Informe a quantidade de dias de férias anuais não gozadas e convertidas em vantagem. A data de referência é aquela em que o período foi vencido e transformado em vantagem, e não a data de aquisição. O preenchimento deve ser feito de forma simples.'
                  >
                    <IoIosInformationCircleOutline
                      size={18}
                      data-popover-target='default-popover'
                    />
                  </CustomTooltip>
                </label>
                <input
                  type='number'
                  {...register('feriasAnuais')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Dias'
                />
                <p className='text-sm text-slate-500'>
                  * Férias anuais na vantagem de forma simples
                </p>
              </div>
              <div className='xl:col-span-4 col-span-12'>
                <label className='text-sm text-slate-700 mb-1 font-semibold flex items-center gap-1'>
                  Férias Prêmio
                  <CustomTooltip
                    className='w-72'
                    content='Informe a quantidade, em dias, de férias-prêmio não gozadas nem convertidas em espécie. A data de referência é aquela em que o militar adquiriu o direito à concessão, independentemente de ter sido convertida em vantagem após o início do período de transição.'
                  >
                    <IoIosInformationCircleOutline
                      size={18}
                      data-popover-target='default-popover'
                    />
                  </CustomTooltip>
                </label>
                <input
                  type='number'
                  {...register('feriasPremio')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Dias'
                />
                <p className='text-sm text-slate-500'>
                  * Férias-prêmio na vantagem de forma simples
                </p>
              </div>
              <div className='xl:col-span-4 col-span-12'>
                <label className='text-sm text-slate-700 mb-1 font-semibold flex items-center gap-1'>
                  Dias a serem descontados
                  <CustomTooltip
                    className='w-72'
                    content='Informe a soma do tempo que o militar tenha que possa vir a ser descontado do tempo de serviço, como prisões, suspensões, faltas ao serviço, situações funcionais diversas, etc. Devem ser considerados apenas os descontos anteriores a 01/01/2022.
'
                  >
                    <IoIosInformationCircleOutline
                      size={18}
                      data-popover-target='default-popover'
                    />
                  </CustomTooltip>
                </label>
                <input
                  type='number'
                  {...register('diasDesconto')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Dias'
                />
                <p className='text-sm text-slate-500'>
                  * Verificar descontos legais
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='text-sm text-slate-700 mb-1 font-semibold flex items-center gap-1'>
                  Tempo Averbado
                  <CustomTooltip
                    className='w-72'
                    content=' Informe a soma do tempo que o militar tenha averbado de outros órgãos. Esse tempo será considerado mesmo que a averbação tenha ocorrido após o início do período de transição.'
                  >
                    <IoIosInformationCircleOutline
                      size={18}
                      data-popover-target='default-popover'
                    />
                  </CustomTooltip>
                </label>
                <div className='flex w-full gap-1'>
                  <input
                    type='number'
                    {...register('tempoAverbadoAnos')}
                    className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                    placeholder='Anos'
                  />
                  <input
                    type='number'
                    {...register('tempoAverbadoDias')}
                    className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                    placeholder='Dias'
                  />
                </div>
                <p className='text-sm text-slate-500'>
                  * Tempo averbado de outros órgãos
                </p>
              </div>

              <div className='xl:col-span-6 col-span-12'>
                <label className='text-sm text-slate-700 mb-1 font-semibold flex items-center gap-1'>
                  Tempo averbado universitário
                  <CustomTooltip
                    className='w-72'
                    content='Este campo deve ser preenchido EXLUSIVAMENTE pelos militares QOS, que possuem o direito à averbação do tempo universitário, conforme o tempo de efetivo serviço. Deve-se informar apenas o tempo averbado adquirido antes de 01/01/2022.
'
                  >
                    <IoIosInformationCircleOutline
                      size={18}
                      data-popover-target='default-popover'
                    />
                  </CustomTooltip>
                </label>
                <input
                  type='number'
                  {...register('tempoAverbadoAnosUniversity')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Anos'
                />
                <p className='text-sm text-slate-500'>
                  * Exclusivo para militares QOS
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
                <label className='text-sm text-slate-700 mb-1 font-semibold flex items-center gap-1'>
                  Férias Anuais
                  <CustomTooltip
                    className='w-72'
                    content='Informe a quantidade de dias de férias anuais não gozadas e convertidas após o início do período de transição.'
                  >
                    <IoIosInformationCircleOutline
                      size={18}
                      data-popover-target='default-popover'
                    />
                  </CustomTooltip>
                </label>
                <input
                  type='number'
                  {...register('afterFeriasAnuais')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Dias'
                />
                <p className='text-sm text-slate-500'>
                  * Férias anuais na vantagem de forma simples
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='text-sm text-slate-700 mb-1 font-semibold flex items-center gap-1'>
                  Férias Prêmio
                  <CustomTooltip
                    className='w-72'
                    content='Informe a quantidade, em dias, de férias-prêmio não gozadas nem convertidas em espécie. Devem ser considerados apenas os períodos adquiridos após o início do período de transição.'
                  >
                    <IoIosInformationCircleOutline
                      size={18}
                      data-popover-target='default-popover'
                    />
                  </CustomTooltip>
                </label>
                <input
                  type='number'
                  {...register('afterFeriasPremio')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Dias'
                />
                <p className='text-sm text-slate-500'>
                  * Férias-prêmio na vantagem de forma simples
                </p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='text-sm text-slate-700 mb-1 font-semibold flex items-center gap-1'>
                  Tempo Averbado
                  <CustomTooltip
                    className='w-72'
                    content='Este campo deve ser preenchido apenas pelos militares QOS, que possuem o direito de averbação conforme o tempo de efetivo serviço.'
                  >
                    <IoIosInformationCircleOutline
                      size={18}
                      data-popover-target='default-popover'
                    />
                  </CustomTooltip>
                </label>
                <div className='flex w-full gap-1'>
                  <input
                    type='number'
                    {...register('afterTempoAverbadoAnos')}
                    className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                    placeholder='Anos'
                  />
                  <input
                    type='number'
                    {...register('afterTempoAverbadoDias')}
                    className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                    placeholder='Dias'
                  />
                </div>
                <p className='text-sm text-slate-500'>* Militares QOS</p>
              </div>
              <div className='xl:col-span-6 col-span-12'>
                <label className='text-sm text-slate-700 mb-1 font-semibold flex items-center gap-1'>
                  Dias a serem descontados
                  <CustomTooltip
                    className='w-72'
                    content='Informe a soma do tempo que o militar tenha que possa vir a ser descontado do tempo de serviço após o início do período de transição, como prisões, suspensões, faltas ao serviço, situações funcionais diversas, etc.'
                  >
                    <IoIosInformationCircleOutline
                      size={18}
                      data-popover-target='default-popover'
                    />
                  </CustomTooltip>
                </label>
                <input
                  type='number'
                  {...register('afterDiasDesconto')}
                  className='block w-full p-3 bg-white border rounded shadow-sm placeholder-slate-400'
                  placeholder='Dias'
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

        {results && (
          <>
            <div className='bg-slate-50 p-6 rounded-md w-full'>
              <h3
                className='text-lg font-semibold text-orange-500 my-2 flex justify-center scroll-mt-4'
                id='result'
              >
                Tabela do pedágio
              </h3>
              <div className='grid xl:grid-cols-12 md:grid-cols-12 gap-4'>
                <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                  <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                    Tempo faltante da reserva remunerada e abono permanência
                  </label>

                  {results.tempoFaltanteReserva <= 0 ? (
                    <p className='text-sm font-semibold text-orange-500'>
                      Militar já possui direito à transferência para reserva
                      voluntária; nesse caso não há cálculo de pedágio.
                    </p>
                  ) : (
                    <p className='text-lg font-semibold text-orange-500'>
                      {results.tempoFaltanteReserva} dias
                    </p>
                  )}
                </div>
                <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                  <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                    Pedágio para reserva voluntária e abono permanência
                  </label>
                  {results.pedagioReservaVoluntaria <= 0 ? (
                    <p className='text-sm font-semibold text-orange-500'>
                      Militar já possui direito à transferência para reserva
                      voluntária; nesse caso não há cálculo de pedágio.
                    </p>
                  ) : (
                    <p className='text-lg font-semibold text-orange-500'>
                      {results.pedagioReservaVoluntaria} dias
                    </p>
                  )}
                </div>
                <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                  <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                    Tempo de serviço exigido para o militar
                  </label>
                  <p className='text-lg font-semibold text-orange-500'>
                    {results.tempoFaltanteReserva <= 0 ? (
                      <p className='text-sm font-semibold text-orange-500'>
                        Militar já possui direito à transferência para reserva
                        voluntária; nesse caso não há cálculo de pedágio.
                      </p>
                    ) : (
                      formatTimeInYearsAndDays(results.tempoServicoExigido)
                    )}
                  </p>
                </div>

                <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                  <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                    Tempo faltante para transferência compulsória para reserva
                  </label>
                  <p className='text-lg font-semibold text-orange-500'>
                    {results.tempoFaltanteCompulsoria} dias
                  </p>
                </div>
                <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                  <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                    Pedágio para reserva compulsória
                  </label>
                  <p className='text-lg font-semibold text-orange-500'>
                    {results.pedagioCompulsoria} dias
                  </p>
                </div>
                <div className='xl:col-span-3 md:col-span-4 col-span-12'>
                  <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                    Tempo de efetivo serviço máximo permitido
                  </label>
                  <p className='text-lg font-semibold text-orange-500'>
                    {formatTimeInYearsAndDays(results.tempoEfetivoMaximo)}
                  </p>
                </div>
                <div className='xl:col-span-3 md:col-span-4 col-span-12 border p-3 border-pink-400'>
                  <label className='text-sm text-slate-700 mb-1 font-semibold flex gap-1 items-center'>
                    Efetivo serviço exigido para a militar (mulher)
                    <IoIosFemale size={20} className='text-pink-500' />
                  </label>
                  {results.efetivoServicoExigido === 'Data já atingida' ? (
                    <p className='text-sm font-semibold text-orange-500'>
                      Militar já possui direito à transferência para reserva
                      voluntária; nesse caso não há cálculo de pedágio.
                    </p>
                  ) : (
                    <p className='text-lg font-semibold text-orange-500'>
                      {results.efetivoServicoExigido}
                    </p>
                  )}
                </div>

                {/* <div className='xl:col-span-3 md:col-span-4 col-span-12 p-3'>
                  <label className='text-sm text-slate-700 mb-1 font-semibold flex gap-1 items-center'>
                    Tempo de natureza militar
                  </label>

                  <p className='text-lg font-semibold text-orange-500'>
                    {results.dataTempoNaturezaMilitar.years} anos e{' '}
                    {results.dataTempoNaturezaMilitar.days} dias
                  </p>
                </div> */}
              </div>
            </div>

            <div className='bg-slate-100 p-6 rounded-md w-full'>
              <h3 className='text-lg font-semibold text-orange-500 mb-2 flex justify-center'>
                Resultados
              </h3>
              <div className='grid xl:grid-cols-12 md:grid-cols-12 gap-4'>
                <div className='xl:col-span-4 md:col-span-4 col-span-12'>
                  <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                    Data da reserva voluntária e jus ao abono permanência
                  </label>
                  <p className='text-lg font-semibold text-orange-500'>
                    {results.tempoFaltanteReserva <= 0 ? (
                      <p className='text-sm font-semibold text-orange-500'>
                        Militar já possui direito à transferência para reserva
                        voluntária; nesse caso não há cálculo de pedágio.
                      </p>
                    ) : (
                      formatDate(results.dataReservaVoluntaria)
                    )}
                  </p>
                </div>

                <div className='xl:col-span-4 md:col-span-4 col-span-12'>
                  <label className='block text-sm text-slate-700 mb-1 font-semibold'>
                    Data da reserva compulsória
                  </label>
                  <p className='text-lg font-semibold text-orange-500'>
                    {formatDate(results.dataReservaCompulsoria)}
                  </p>
                </div>
                <div className='xl:col-span-4 md:col-span-4 col-span-12  border p-3 border-pink-400'>
                  <label className='text-sm text-slate-700 mb-1 font-semibold flex gap-1 items-center'>
                    Data da reserva voluntária da militar (mulher)
                    <IoIosFemale size={20} className='text-pink-500' />
                  </label>

                  {results.efetivoServicoExigido === 'Data já atingida' ? (
                    <p className='text-sm font-semibold text-orange-500'>
                      Militar já possui direito à transferência para reserva
                      voluntária; nesse caso não há cálculo de pedágio.
                    </p>
                  ) : (
                    <p className='text-lg font-semibold text-orange-500'>
                      {formatDate(results.dataReservaVoluntariaMilitar)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </form>

      <footer className='text-center text-sm p-8 bg-white'>
        <div className='2xl:w-auto xl:w-auto 2xl:px-0 xl:px-0 w-full px-3'>
          <p className='text-slate-600 text-center text-sm mb-1'>
            Copyright © {new Date().getFullYear()} Jean Georges Hallal Junior.
          </p>
          <p className='text-slate-600 text-center text-xs'>
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
