import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { optionSelectedHandler } from '../../store/reducers/optionsSlice';

interface MenusItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  img: string;
}
interface Options {
  id: string;
  title: string;
  essential: boolean;
  only: boolean;
  optionLists: OptionLists[];
}

interface OptionLists {
  id: string;
  name: string;
  price: number;
  isSelected: boolean;
}

function Option() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const menu: MenusItem = useAppSelector((state) => state.topExposureMenus.find((menu: MenusItem) => menu.id === id));
  const options = useAppSelector((state) => state.options);
  const [amount, setAmount] = useState(1);
  let totalPrice =
    options.reduce(
      (totalPrice: number, option: Options) =>
        totalPrice +
        option.optionLists.reduce((subTotalPrice, subOption) => {
          if (subOption.isSelected) {
            return subTotalPrice + subOption.price;
          }
          return subTotalPrice;
        }, 0),

      menu.price,
    ) * amount;

  return (
    <div className="w-full h-full">
      <header className="w-full flex items-center justify-center h-12 border-b text-center">
        <div className="w-1/5 material-symbols-outlined">navigate_before</div>
        <div className="w-3/5 whitespace-nowrap overflow-hidden">{menu.name}</div>
        <div className="w-1/5 material-symbols-outlined ">shopping_cart</div>
      </header>
      <div className="w-full overflow-y-scroll" style={{ height: `calc(100% - 48px - 68px)` }}>
        <img src={menu.img} alt={menu.name} />
        <div className="w-full bg-gray-200 text-xs text-center text-gray-500">
          위 사진은 연출된 사진으로, 실제와 다를 수 있습니다.
        </div>
        <div className="w-full px-2 py-4 border-b">
          <div className="font-bold">{menu.name}</div>
          <div className="text-xs text-gray-500">{menu.description}</div>
        </div>
        <div className="w-full px-2 py-4 border-b font-bold flex justify-between text-sm items-center">
          <div>가격</div>
          <div>{menu.price.toLocaleString()}원</div>
        </div>
        {options.map((option: Options) => {
          return (
            <div className="w-full border-b p-2" key={option.id}>
              <div className="text-sm font-bold  py-1">
                {option.title} {option.essential && <span className=" text-rose-500 text-xs">(필수 선택)</span>}
              </div>
              {option.optionLists.map((optionList: OptionLists) => {
                return (
                  <div className="w-full flex items-center text-xs py-1 cursor-pointer" key={optionList.id}>
                    <input
                      id={optionList.id}
                      type="checkbox"
                      className="w-4 h-4 accent-rose-500  cursor-pointer"
                      checked={optionList.isSelected}
                      onChange={(e) => {
                        dispatch(optionSelectedHandler({ optionId: option.id, optionListId: optionList.id }));
                      }}
                    />
                    <label
                      htmlFor={optionList.id}
                      className="w-full flex items-center justify-between pl-1  cursor-pointer"
                    >
                      <div>{optionList.name}</div>
                      {optionList.price === 0 ? (
                        <div>추가비용없음</div>
                      ) : (
                        <div>+{optionList.price.toLocaleString()}원</div>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="w-full px-2 py-4 flex items-center justify-between text-sm font-bold border-b">
          <div>수량</div>
          <div className="flex items-center justify-around gap-x-4">
            <div
              className={`${
                amount === 1 ? 'text-gray-200' : ' cursor-pointer'
              } material-symbols-outlined rounded-full border border-gray-200`}
              onClick={() => {
                if (amount > 1) {
                  setAmount(amount - 1);
                }
              }}
            >
              remove
            </div>
            <div>{amount}</div>
            <div
              className="material-symbols-outlined rounded-full"
              onClick={() => {
                setAmount(amount + 1);
              }}
            >
              add
            </div>
          </div>
        </div>
        <div className="px-2 py-4 flex justify-between items-center bg-gray-200">
          <div className="text-sm font-bold">총 주문금액</div>
          <div className="text-rose-500 font-bold">{totalPrice.toLocaleString()}원</div>
        </div>
      </div>
      <div className="w-full px-2 py-4 flex justify-center items-center shadow shadow-black ">
        <button className="w-full p-2 text-white bg-rose-500 rounded-lg text-sm font-semibold">
          {totalPrice.toLocaleString()}원 담기
        </button>
      </div>
    </div>
  );
}

export default Option;
