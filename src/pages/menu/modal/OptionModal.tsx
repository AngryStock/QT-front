import { useEffect, useState } from 'react';

import axios from 'axios';

import { ModalHandler } from '@/pages/owner/component/MenuManagement';
import { Cart } from '@/store/reducers/cartSlice';
import { Menus } from '@/store/reducers/menusSlice';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { OptionLists, Options, optionSelectedHandler, setOption } from '../../../store/reducers/optionsSlice';

interface OptionModalPops {
  menuId: string;
  modalHandler: ModalHandler;
  table: string | undefined;
  publish: (text: string) => void;
  storeId: string | undefined;
}

function OptionModal({ menuId, modalHandler, table, publish, storeId }: OptionModalPops) {
  const dispatch = useAppDispatch();

  const menu = useAppSelector((state) => state.menus.find((menu: Menus) => menu.id === menuId));
  const options = useAppSelector((state) => state.options).filter((option: Options) => option.menuId === menuId);

  useEffect(() => {
    axios.get(`/api/menuOption//find/menuId/CategoryAndOption/${menuId}`).then((res3) => {
      dispatch(setOption(res3.data));
    });
  }, [menuId, dispatch]);

  const cart = useAppSelector((state) => state.cart);
  const [amount, setAmount] = useState(1);
  const totalPrice =
    options.reduce(
      (totalPrice: number, option: Options) =>
        totalPrice +
        option.optionLists.reduce((subTotalPrice, subOption) => {
          if (subOption.selected) {
            return subTotalPrice + subOption.price;
          }
          return subTotalPrice;
        }, 0),

      menu.price,
    ) * amount;

  const selectedOptions = options.flatMap((option: Options) =>
    option.optionLists.filter((list) => list.selected).map((list) => list.name),
  );

  const totalAmount = cart.reduce((totalAmount: number, cart: Cart) => totalAmount + cart.amount, 0);

  return (
    <div className="absolute w-full h-full z-20 bg-white">
      <header className="w-full flex items-center justify-center h-12 border-b text-center">
        <div
          className="w-1/5 material-symbols-outlined"
          onClick={() => {
            modalHandler('optionModalIsOpen', false);
          }}
        >
          navigate_before
        </div>
        <div className="w-3/5 whitespace-nowrap overflow-hidden">{menu.name}</div>
        <div className="w-1/5 relative flex justify-center items-center">
          <div
            className=" material-symbols-outlined relative"
            onClick={() => {
              modalHandler('cartModalIsOpen', true);
            }}
          >
            shopping_cart
          </div>
          {totalAmount !== 0 && (
            <div className="w-5 h-5 bg-rose-500 absolute top-1/2 left-1/2 rounded-full text-sm text-white">
              {totalAmount}
            </div>
          )}
        </div>
      </header>
      <div className="w-full overflow-y-scroll" style={{ height: `calc(100% - 48px - 68px)` }}>
        <img src={`/api/image/${menu.menuImageUrl}`} alt={menu.name} />
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
            <div className="w-full border-b p-2" key={option.categoryId}>
              <div className="text-sm font-bold  py-1">
                {option.title} {option.essential && <span className=" text-rose-500 text-xs">(필수 선택)</span>}
              </div>
              {option.optionLists.map((optionList: OptionLists, i) => {
                return (
                  <div className="w-full flex items-center text-xs py-1 cursor-pointer" key={i}>
                    <input
                      id={'checkbox' + option.categoryId + i}
                      type="checkbox"
                      className="w-4 h-4 accent-rose-500  cursor-pointer"
                      checked={optionList.selected}
                      onChange={() => {
                        dispatch(optionSelectedHandler({ optionId: option.categoryId, index: i }));
                      }}
                    />
                    <label
                      htmlFor={'checkbox' + option.categoryId + i}
                      className="w-full flex items-center justify-between pl-1  cursor-pointer"
                      onChange={() => {
                        dispatch(optionSelectedHandler({ optionId: option.categoryId, index: i }));
                      }}
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
                amount === 1 ? 'text-gray-200 border-gray-200' : ' cursor-pointer border-black'
              } material-symbols-outlined rounded-full border `}
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
              className="material-symbols-outlined "
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
      <div className="w-full px-2 py-4 flex justify-center items-center custom_shadow ">
        <button
          type="button"
          className="w-full p-2 text-white bg-rose-500 rounded-lg text-sm font-semibold"
          onClick={() => {
            publish(
              JSON.stringify({
                type: 'add',
                cartDTO: {
                  tableNo: table,
                  storeId: storeId,
                  menuId: menuId,
                  name: menu.name,
                  img: menu.menuImageUrl,
                  options: selectedOptions,
                  price: totalPrice,
                  amount: amount,
                },
              }),
            );
            // dispatch(
            //   addCart({
            //     table: table,
            //     menuId: menuId,
            //     name: menu.name,
            //     options: selectedOptions,
            //     img: menu.img,
            //     price: totalPrice,
            //     amount: amount,
            //   }),
            // );
            // modalHandler('optionModalIsOpen', false);
          }}
        >
          {totalPrice.toLocaleString()}원 담기
        </button>
      </div>
    </div>
  );
}

export default OptionModal;
