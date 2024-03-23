'use client';

import { useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  register?: UseFormRegisterReturn;

  error?: string;
}

export function ProductQuantityInput({ register, error }: Props) {
  const [value, setValue] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const minusValue = () => {
    if (value - 1 > 0) {
      setValue(value - 1);
    }
  };

  const addValue = () => {
    if (value + 1 < 21) {
      setValue(value + 1);
    }
  };

  const inputValue = (number: number) => {
    if (number > 0 && number < 20) {
      setValue(number);
    }
  };
  return (
    <div className="relative flex items-center max-w-[8rem]">
      <button
        type="button"
        id="decrement-button"
        className="bg-green-2 border border-green-2 rounded-[50%] absolute z-20 p-3 h-9 focus:ring-none focus:outline-none disabled:bg-grey-4 disabled:border-grey-4"
        onClick={() => inputRef.current?.stepDown()}
      >
        <svg
          className="w-4 h-3 text-whiteFixed"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        {...register}
        ref={inputRef}
        type="number"
        id="quantity-input"
        className="block w-full py-2.5 h-9 relative z-0 rounded-3xl pl-14 border-green-2"
        step={1}
        min={1}
        max={20}
      />
      <button
        type="button"
        id="increment-button"
        className="bg-green-2 border border-green-2 rounded-[50%] right-0 absolute z-20 p-3 h-9 focus:ring-none focus:outline-none disabled:bg-grey-4 disabled:border-grey-4"
        onClick={() => inputRef.current?.stepUp()}
      >
        <svg
          className="w-4 h-3 text-whiteFixed"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
      {error && <span className="error">{error}</span>}
    </div>
  );
}
