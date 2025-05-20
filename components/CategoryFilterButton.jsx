"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryFilterButton({ category, setFilter, filter }) {
  const [categoryChild, setCategoryChild] = useState([]);
  useEffect(() => {
    async function fetchCategoryChild() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${category}`
        );
        const data = await response.json();
        setCategoryChild(data);
      } catch (error) {}
    }
    fetchCategoryChild(category);
  }, []);

  return (
    <ul className="flex gap-4 text-2xl flex-wrap">
      {categoryChild.map((element) => (
        <li
          onClick={() => {
            if (filter != element.name) {
              //if current filter === filter user tries to set, which means user wants to deselect the filter, we set the filter back to ''
              setFilter(element.name);
            } else {
              setFilter("");
            }
          }}
          key={element.id}
          className={`border-2 p-1 select-none cursor-pointer ${
            filter == element.name ? "bg-blue-600" : ""
          }`}
        >
          {element.name}
        </li>
      ))}
    </ul>
  );
}
