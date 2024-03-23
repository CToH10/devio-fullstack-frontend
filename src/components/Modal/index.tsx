'use client';

import { FaXmark } from 'react-icons/fa6';

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="modal fixed inset-0 bg-grey-5 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <section className="p-8 border-none w-4/5 shadow-lg rounded-xl bg-whiteFixed relative">
        <section className="text-start pl-2">
          <h3 className="text-size_4_28 font-bold text-gray-900">{title}</h3>
        </section>
        <section className="flex justify-center mt-4">
          <section className="mt-2 px-7 py-3">
            <p className="text-lg text-gray-500">{children}</p>
          </section>
          <button
            type="button"
            onClick={onClose}
            className="btn-small absolute right-4 top-4 text-grey-5 text-size_6_20"
          >
            <FaXmark />
          </button>
        </section>
      </section>
    </section>
  );
}
