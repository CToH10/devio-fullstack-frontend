'use client';

import { FaCreditCard, FaMoneyBill1 } from 'react-icons/fa6';
import { useApi } from '@/context/apiContext';

export function PaymentArea() {
  const { paymentMethod, setPaymentMethod, setMoney, change } = useApi();

  return (
    <section className="flex items-center flex-col">
      <form className="w-full flex flex-col gap-10">
        <section
          className={`flex items-center px-6 py-2 rounded-lg border-2 border-grey-4 ${paymentMethod === 'credit' ? 'border-green-2 border-opacity-70' : ''}`}
        >
          <label
            htmlFor="credit"
            className="text-size_6_20 font-semibold text-grey-1 flex flex-row gap-5 justify-normal items-center w-full"
          >
            <FaCreditCard className="text-size_6_20 text-green-2 w-2/12" />
            <span className="w-11/12">Crédito</span>
            <input
              type="radio"
              className="accent-green-2"
              id="credit"
              name="paymentMethod"
              value="credit"
              onClick={e => setPaymentMethod(e.currentTarget.value)}
            />
          </label>
        </section>
        <section
          className={`flex items-center px-6 py-2 rounded-lg border-2 border-grey-4 ${paymentMethod === 'debit' ? 'border-green-2 border-opacity-70' : ''}`}
        >
          <label
            htmlFor="debit"
            className="text-size_6_20 font-semibold text-grey-1 flex flex-row gap-5 justify-normal items-center w-full"
          >
            <FaCreditCard className="text-size_6_20 text-green-2 w-2/12" />
            <span className="w-11/12">Débito</span>
            <input
              type="radio"
              className="accent-green-2"
              id="debit"
              name="paymentMethod"
              value="debit"
              onClick={e => setPaymentMethod(e.currentTarget.value)}
            />
          </label>
        </section>
        <section
          className={`flex items-center px-6 py-2 rounded-lg border-2 border-grey-4 ${paymentMethod === 'cash' ? 'border-green-2 border-opacity-70' : ''}`}
        >
          <label
            htmlFor="cash"
            className="text-size_6_20 font-semibold text-grey-1 flex flex-row gap-5 justify-normal items-center w-full"
          >
            <FaMoneyBill1 className="text-size_6_20 text-green-2 w-2/12" />{' '}
            <span className="w-11/12">Dinheiro</span>
            <input
              type="radio"
              className="accent-green-2"
              id="cash"
              name="paymentMethod"
              value="cash"
              onClick={e => setPaymentMethod(e.currentTarget.value)}
            />
          </label>
        </section>
        <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-0">
          <label
            htmlFor="paying"
            className="flex flex-col  text-size_7_16 text-grey-1 font-bold gap-2 lg:w-[47%] relative"
          >
            Valor entregue
            <input
              type="number"
              name="paying"
              id="paying"
              placeholder="Valor entregue"
              disabled={paymentMethod !== 'cash'}
              step={0.5}
              onInput={e => setMoney(Number(e.currentTarget.value))}
              className="w-full pl-8"
            />
            <span className="absolute left-2 bottom-[0.835rem] font-normal text-size_8_14">
              R$
            </span>
          </label>
          <label
            htmlFor="change"
            className="flex flex-col  text-size_7_16 text-grey-1 font-bold gap-2 lg:w-[47%]"
          >
            Troco
            <input
              type="text"
              name="change"
              id="change"
              disabled
              value={change.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
              className="w-full"
            />
          </label>
        </section>
      </form>
    </section>
  );
}
