'use client';

import { useState } from 'react';
import { FaCreditCard, FaMoneyBill1 } from 'react-icons/fa6';

export function PaymentArea() {
  const [active, setActive] = useState('');

  return (
    <section className="flex items-center flex-col lg:max-w-96">
      <form className="w-full flex flex-col gap-10">
        <section
          className={`flex items-center px-12 py-6 rounded-lg border-2 border-grey-4 ${active === 'credit' ? 'border-green-2 border-opacity-70' : ''}`}
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
              onClick={e => setActive(e.currentTarget.value)}
            />
          </label>
        </section>
        <section
          className={`flex items-center px-12 py-6 rounded-lg border-2 border-grey-4 ${active === 'debit' ? 'border-green-2 border-opacity-70' : ''}`}
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
              onClick={e => setActive(e.currentTarget.value)}
            />
          </label>
        </section>
        <section
          className={`flex items-center px-12 py-6 rounded-lg border-2 border-grey-4 ${active === 'cash' ? 'border-green-2 border-opacity-70' : ''}`}
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
              onClick={e => setActive(e.currentTarget.value)}
            />
          </label>
        </section>
      </form>
    </section>
  );
}
