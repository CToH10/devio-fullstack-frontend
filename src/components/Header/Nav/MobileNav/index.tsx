import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { DesktopNav } from '../DesktopNav';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="btn-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <p className="text-whiteFixed">X</p>
        ) : (
          <GiHamburgerMenu className="text-whiteFixed" />
        )}
      </button>

      {isOpen && (
        <section className="bg-green-2 absolute right-4 -bottom-36 min-w-[150px] py-3 rounded-md transition ease-in duration-200 z-30">
          <DesktopNav flexDir="flex-col" />
        </section>
      )}
    </>
  );
}
