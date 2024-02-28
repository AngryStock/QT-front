import React, { useState } from 'react';

import OwnerMainBt from './component/OwnerMainBt';
import OwnerMainMenuEdit from './component/OwnerMainMenuEdit';
import OwnerMainMenuImg from './component/OwnerMainMenuImg';
import OwnerMaincategoryBt from './component/OwnerMaincategoryBt';

export default function OwnerMainMenu() {
  const [categories, setCategories] = useState(['COFFEE', 'BEVERAGE', 'SMOOTIE', 'ADE/TEA']);

  // let categories = ["COFFEE", "BEVERAGE", "SMOOTIE", "ADE/TEA"]
  return (
    <div className="w-full">
      <header>
        <nav>
          <OwnerMaincategoryBt categories={categories} />
        </nav>
      </header>

      <main className=" flex flex-wrap ">
        {categories.map((category, i) => {
          return (
            <div key={i}>
              <div className="ml-6">{categories[i]}</div>
              <div className=" flex flex-wrap ">
                <OwnerMainMenuImg />
                <OwnerMainMenuImg />
                <OwnerMainMenuImg />
                <OwnerMainMenuImg />
                <OwnerMainMenuImg />
                <OwnerMainMenuImg />
                <OwnerMainMenuImg />
                <OwnerMainMenuEdit />
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
