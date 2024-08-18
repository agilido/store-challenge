"use client";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [totalCost, setTotalCost] = useState<number>(0);
  const { cartItems, getTotalCost } = useCart();
  useEffect(() => {
    setTotalCost(getTotalCost());
  }, [cartItems]);

  return (
    <main className="flex-row min-h-screen md:px-12 px-2">
      <Link href="/" className="text-4xl max-w-[50%]">
        <span className="pr-12 py-8 relative md:-left-5 inline-block transition-transform hover:-translate-x-1 ">
          <span className="!-rotate-180 inline-block mr-2">-&gt;</span>
          Home
        </span>
      </Link>
      <div className="flex justify-between md:text-2xl text-lg font-semibold">
        <h2>Cart</h2>
        <h2 data-test="cart-totalprice">
          Total Price: £{" "}
          <span data-test="cart-totalCost">
            {Math.floor(totalCost * 100) / 100}
          </span>
        </h2>
      </div>
      {cartItems.map((item) => (
        <CartItem
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          key={item.id}
          description={item.description}
        />
      ))}
    </main>
  );
};

export default page;
