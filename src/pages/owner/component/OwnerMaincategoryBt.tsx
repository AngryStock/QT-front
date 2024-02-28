import React from 'react';

export default function OwnerMaincategoryBt({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-row justify-evenly">
      {categories.map((category, i) => (
        <button
          key={i}
          className="border-2 rounded-lg w-20 h-8 flex justify-center items-center text-gray-500 hover:bg-rose-200"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
