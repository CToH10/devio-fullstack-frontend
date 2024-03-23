export function ProductQuantityInput() {
  return (
    <div className="relative flex items-center max-w-[8rem]">
      <button
        type="button"
        id="decrement-button"
        className="bg-green-2 border border-green-2 rounded-[50%] absolute z-20 p-3 h-9 focus:ring-green-1 focus:ring-2 focus:outline-none"
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
        className="block w-full py-2.5 h-9 relative z-0 rounded-3xl p-l-4"
        defaultValue="1"
      />
      <button
        type="button"
        id="increment-button"
        className="bg-green-2 border border-green-2 rounded-[50%] right-0 absolute z-20 p-3 h-9 focus:ring-green-1 focus:ring-2 focus:outline-none"
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
