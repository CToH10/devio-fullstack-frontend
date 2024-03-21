"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface DesktopNavProps {
  flexDir?: string;
}

export const DesktopNav = ({ flexDir }: DesktopNavProps) => {

  const router = useRouter();

  return (
    <section className={`flex items-center justify-between gap-3 ${flexDir}`}>
      <>
        <Link
          className={`btn-medium ${flexDir ? "w-4/5" : ""
            } btn-green text-center text-size_8_14`}
          href="/"
        >
          Pedidos
        </Link>
        <Link
          href={"/kitchen"}
          className={`btn-medium ${flexDir ? "w-4/5" : ""
            } btn-green text-center text-size_8_14`}
        >
          Cozinha
        </Link>
        <Link
          href={"/checkout"}
          className={`btn-medium ${flexDir ? "w-4/5" : ""
            } btn-green text-center text-size_8_14`}
        >
          Retirada
        </Link>
      </>
    </section>
  );
};
