import Product, { TProduct } from "@/components/Product";
import Link from "next/link";
import React from "react";

async function getProducts(categoryName: string) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${categoryName.replace(
      "-",
      "%20"
    )}`
  );
  const data = await res.json();
  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const data = await getProducts(params.categoryName);

  return (
    <div className="flex-row min-h-screen md:px-12 px-2">
      <Link href="/" className="text-4xl max-w-[50%]">
        <span className="pr-12 py-8 relative md:-left-5 inline-block transition-transform hover:-translate-x-1 ">
          <span className="!-rotate-180 inline-block mr-2">-&gt;</span>
          Home
        </span>
      </Link>
      <h2
        className="m-3 text-2xl font-semibold text-nowrap"
        data-test="category-name"
      >
        {params.categoryName.toUpperCase().replace("-", " ")}
      </h2>
      <h5 className="mx-4 text-md text-gray-400">{data?.length} products</h5>
      <div className="justify-center md:mx-12 mx-3 flex flex-wrap md:gap-8 gap-2">
        {data?.map((product: TProduct, idx: number) => (
          <Product
            key={idx}
            id={product.id}
            idx={idx}
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
