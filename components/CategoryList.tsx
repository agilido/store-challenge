"use client";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CategoryList = () => {
  const { data, error, isLoading } = useSWR("/api/categories", fetcher);

  return (
    <nav className="md:p-10 p-4">
      <h2 className="m-3 text-2xl font-semibold" data-test="cypress-header">
        Categories
      </h2>
      <ul
        className="list-outside space-y-4 items-center"
        data-test="categories-list"
      >
        {error ? (
          "An error has occurred."
        ) : isLoading ? (
          <li className="p-8 bg-gray-300 max-w-72 rounded-lg animate-pulse transition-colors"></li>
        ) : (
          data?.toReversed().map((category: string, idx: number) => (
            <Link
              key={idx}
              data-test={`category-${category}`}
              href={`/category/${category.replace(" ", "-")}`}
              className="p-8 rounded-lg list-item border max-w-72 border-gray-300 hover:bg-gray-100 hover:cursor-pointer transition-colors"
            >
              {category.toUpperCase()}
            </Link>
          ))
        )}
      </ul>
    </nav>
  );
};
