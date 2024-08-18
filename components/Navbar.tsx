"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cartContext";

export const Navbar = () => {
  const { getTotalQuantity, cartItems } = useCart();
  const [totalQty, setTotalQty] = useState<number>(0);

  useEffect(() => {
    setTotalQty(getTotalQuantity());
  }, [cartItems]);

  return (
    <main className="flex min-w-full justify-end">
      <Link
        href="/cart"
        data-test="cart-button"
        className="relative rounded-lg border px-5 py-2 border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 transition-colors"
      >
        <h2 className="m-3 text-4xl subpixel-antialiased font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
          >
            <path d="M21 9h-1.42l-3.712-6.496-1.736.992L17.277 9H6.723l3.146-5.504-1.737-.992L4.42 9H3a1.001 1.001 0 0 0-.965 1.263l2.799 10.264A2.005 2.005 0 0 0 6.764 22h10.473c.898 0 1.692-.605 1.93-1.475l2.799-10.263A.998.998 0 0 0 21 9zm-3.764 11v1-1H6.764L4.31 11h15.38l-2.454 9z"></path>
            <path d="M9 13h2v5H9zm4 0h2v5h-2z"></path>
          </svg>
        </h2>
        {totalQty > 0 && (
          <div className="absolute right-[5%] bottom-[4%] bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center">
            {totalQty}
          </div>
        )}
      </Link>
    </main>
  );
};
