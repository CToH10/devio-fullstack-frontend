'use client';

import { useWindowSize } from '@/utils/hooks/windowSize';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export function NavItems() {
  const size = useWindowSize();

  return (
    <nav className="flex items-center justify-center relative">
      {size.width <= 430 ? <MobileNav /> : <DesktopNav />}
    </nav>
  );
}
