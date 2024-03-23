'use client';

import { useState } from 'react';

export function ProductQuantityInput() {
  const [value, setValue] = useState(1);

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
        disabled={value === 1}
        className="bg-green-2 border border-green-2 rounded-[50%] absolute z-20 p-3 h-9 focus:ring-none focus:outline-none disabled:bg-grey-4 disabled:border-grey-4"
        onClick={() => minusValue()}
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
        type="number"
        id="quantity-input"
        className="block w-full py-2.5 h-9 relative z-0 rounded-3xl pl-14 border-green-2"
        defaultValue={value}
        value={value}
        min={1}
        max={20}
        onInput={e => inputValue(Number(e.currentTarget.value))}
      />
      <button
        type="button"
        id="increment-button"
        disabled={value === 20}
        className="bg-green-2 border border-green-2 rounded-[50%] right-0 absolute z-20 p-3 h-9 focus:ring-none focus:outline-none disabled:bg-grey-4 disabled:border-grey-4"
        onClick={() => addValue()}
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
    </div>
  );
}
