import { useState } from "react";

export function usePagination(itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const getPaginatedItems = <T,>(items: T[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const totalPages = (totalItems: number) => 
    Math.ceil(totalItems / itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    getPaginatedItems,
    totalPages,
  };
}