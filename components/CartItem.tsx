"use client";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import React, { useState } from "react";

type CartItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

const CartItem = ({ id, title, price, description, image }: CartItemProps) => {
  const [showDescription, setShowDescription] = useState(false);

  const {
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
    getItemQuantity,
  } = useCart();

  const qty = getItemQuantity(id);

  return (
    <div className="my-4 p-4 md:flex flex-row bg-white w-full md:text-left rounded-lg">
      <div className="p-4 rounded-xl flex justify-center hover:scale-110 transition-all min-w-[30%] md:mr-8 my-4 relative max-h-fit ">
        <Image
          src={image}
          alt="Product photo"
          sizes="70vw"
          className="md:w-[80%] w-[64%] h-auto"
          width={500}
          height={300}
        />
      </div>
      <div className="content-center">
        <p className="text-xl" data-test="cartitem-title">
          {title} <br />
        </p>
        <div>
          <p className="my-1">
            {showDescription ? (
              <>
                {description}{" "}
                <button onClick={() => setShowDescription(false)}>
                  <b>
                    <i>Show less</i>
                  </b>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowDescription(true)}
                className="my-2 bg-[#dde1e238] transition-all rounded-xl border p-2"
              >
                Show Description
              </button>
            )}
          </p>
          <p className="my-4">£ {Math.floor(price * 100) / 100}</p>
          <p className="my-4">
            Quantity: <span data-test="cartitem-qty">{qty}</span>
          </p>
          <div className="flex gap-8">
            <button
              onClick={() => removeItem(id)}
              data-test="cartitem-remove"
              className="my-2 border p-4 w-fit hover:bg-[#dde1e238] transition-all rounded-xl "
            >
              Remove
            </button>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => decreaseItemQuantity(id)}
                data-test="cartitem-decreaseQty"
                className="my-2 border p-4 w-full hover:bg-[#dde1e238] transition-all rounded-xl uppercase"
              >
                -
              </button>
              <button
                onClick={() =>
                  increaseItemQuantity(id, title, price, image, description)
                }
                data-test="cartitem-increaseQty"
                className="my-2 border p-4 w-full hover:bg-[#dde1e238] transition-all rounded-xl uppercase"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
