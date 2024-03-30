import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Category } from '@/store/reducers/categorysSlice';
import { Menus } from '@/store/reducers/menusSlice';

import { useAppSelector } from '../../store/hooks';

interface MenusItem {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  img: string;
}
function Menu() {
  const navigate = useNavigate();

  const topExposure = useAppSelector((state) => state.topExposure);
  const topExporsureMenus = useAppSelector((state) => state.topExposureMenus);
  const categorys: Category[] = useAppSelector((state) => state.categorys);
  const menus: Menus[] = useAppSelector((state) => state.menus);
  const [selectCategory, setSelectCategory] = useState(topExposure);

  function scrollToElement(a: string) {
    const element = document.getElementById(a);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="w-full h-full">
      <header className="w-full flex items-center h-12 justify-center text-center">
        <div className="w-1/5 material-symbols-outlined ">search</div>
        <div className="w-3/5 font-bold ">서브웨이-고덕역점</div>
        <div className="w-1/5 material-symbols-outlined ">shopping_cart</div>
      </header>
      <div className="flex py-2  overflow-x-scroll overflow-hidden border-y scrollbar-hide">
        <button
          className={`${
            topExposure === selectCategory ? 'bg-rose-500 text-white' : ''
          } whitespace-nowrap rounded-full py-1 px-2 ml-2 text-sm`}
          onClick={() => {
            setSelectCategory(topExposure);
            scrollToElement(topExposure);
          }}
        >
          {topExposure}
        </button>
        {categorys.map((category) => {
          return (
            <button
              className={`${
                category.id === selectCategory ? 'bg-rose-500 text-white' : ''
              } whitespace-nowrap rounded-full py-1 px-2 ml-2 text-sm`}
              onClick={() => {
                setSelectCategory(category.id);
                scrollToElement(category.id);
              }}
              key={category.id}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <div className=" overflow-y-scroll overflow-hidden" style={{ height: `calc(100% - 96px)` }}>
        <div className="p-4  bg-gray-300">
          <div className="font-bold" id={topExposure}>
            {topExposure}
          </div>
          <div className="flex gap-2  overflow-x-scroll pt-4 border-t scrollbar-hide">
            {topExporsureMenus.map((menu: MenusItem, i: number) => {
              return (
                <div
                  className="w-[128px] whitespace-nowrap rounded-lg bg-white p-2"
                  key={i}
                  onClick={() => {
                    navigate(`/option/${menu.id}`);
                  }}
                >
                  {/* <div
                    style={{
                      backgroundImage: `url(${menu.img})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                    }}
                    className="w-[112px] h-[80px] rounded-lg"
                  ></div> */}
                  <img src={menu.img} alt={menu.name} width={112} className=" rounded-lg" />
                  <div className="text-sm font-bold overflow-hidden text-ellipsis mt-2">{menu.name}</div>
                  <div className="text-sm">
                    <span>{menu.price.toLocaleString()}</span>
                    <span>원</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {categorys.map((category) => {
          return (
            <div className="pt-4 px-4 border-b-8" key={category.id}>
              <div className="font-bold" id={category.id}>
                {category.name}
              </div>
              {menus
                .filter((menu) => menu.categoryId === category.id)
                .map((menu) => {
                  return (
                    <div className="w-full flex justify-center items-center py-4 border-t" key={menu.id}>
                      <div className="w-full mr-2">
                        <div>{menu.name}</div>
                        <div className="text-xs text-gray-500">{menu.description}</div>
                        <div className="text-sm">
                          <span className="font-bold">{menu.price.toLocaleString()}</span>
                          <span>원</span>
                        </div>
                      </div>
                      <img src={menu.img} alt={menu.name} width={112} className=" rounded-lg border" />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
