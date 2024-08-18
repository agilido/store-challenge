"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";

export type TProduct = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  idx: number;
  category?: string;
};

const Product = ({
  id,
  title,
  price,
  category,
  description,
  image,
  idx,
}: TProduct) => {
  const { increaseItemQuantity } = useCart();

  return (
    <div className="my-4 p-4 md:flex flex-row bg-white md:max-w-2xl w-full md:text-left rounded-lg">
      {image && (
        <div className="p-4 rounded-xl flex justify-center hover:scale-110 transition-all md:mr-8 my-4 relative max-h-fit ">
          <Image
            src={image}
            alt="Product photo"
            sizes="70vw"
            className="md:w-[80%] w-[64%] h-auto"
            width={500}
            height={300}
          />
        </div>
      )}
      <div className="content-center">
        <p className="text-xl">
          {title} <br />
        </p>
        <div>
          <p className="my-4">£ {price}</p>
          <button
            onClick={() =>
              increaseItemQuantity(id, title, price, image, description)
            }
            data-test={`product-addtocart-${idx}`}
            className="my-4 border p-4 w-full hover:bg-[#dde1e238] transition-all rounded-xl uppercase"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
