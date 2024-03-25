import Link from 'next/link';
import React from 'react';
import { PiHamburger } from 'react-icons/pi';
import { NavItems } from './Nav';

export function Header() {
  return (
    <header className="w-full min-h-[47px] bg-green-2 text-whiteFixed flex items-center justify-center">
      <div className="flex justify-between items-center w-4/5">
        <Link
          className="text-whiteFixed text-size_6_20 font-bold flex flex-row gap-2 items-center justify-center"
          href="/"
          translate="no"
          passHref
        >
          <span className="bg-whiteFixed rounded-full w-7 h-7 flex items-center justify-center">
            <PiHamburger className="text-green-2" />
          </span>
          fast food
        </Link>
        <NavItems />
      </div>
    </header>
  );
}
