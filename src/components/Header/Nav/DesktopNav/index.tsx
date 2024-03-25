'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DesktopNavProps {
  flexDir?: string;
}

export function DesktopNav({ flexDir }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <section className={`flex items-center justify-between gap-3 ${flexDir}`}>
      <Link
        className={`btn-medium ${
          flexDir ? 'w-4/5' : ''
        } btn-green text-center text-size_8_14 ${pathname === '/' ? 'active' : ''}`}
        href="/"
      >
        Pedidos
      </Link>
      <Link
        href="/kitchen"
        className={`btn-medium ${
          flexDir ? 'w-4/5' : ''
        } btn-green text-center text-size_8_14 ${pathname === '/kitchen' ? 'active' : ''}`}
      >
        Cozinha
      </Link>
      <Link
        href="/checkout"
        className={`btn-medium ${
          flexDir ? 'w-4/5' : ''
        } btn-green text-center text-size_8_14 ${pathname === '/checkout' ? 'active' : ''}`}
      >
        Retirada
      </Link>
    </section>
  );
}
