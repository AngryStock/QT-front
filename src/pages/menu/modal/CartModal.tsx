import { Dispatch, SetStateAction } from 'react';

import { ModalHandler } from '@/pages/owner/component/MenuManagement';
import { useAppSelector } from '@/store/hooks';
import { Cart } from '@/store/reducers/cartSlice';

interface CartModalPops {
  modalHandler: ModalHandler;
  businessName: string;
  table: string | undefined;
  publish: (text: string) => void;
  order: (text: string) => void;
  storeId: string | undefined;
  setOrderText: Dispatch<SetStateAction<string>>;
}

function CartModal({ modalHandler, businessName, table, publish, order, storeId, setOrderText }: CartModalPops) {
  const cart: Cart[] = useAppSelector((state) => state.cart);
  const totalPrice = cart.reduce((totalPrice: number, cart: Cart) => totalPrice + cart.price * cart.amount, 0);
  const totalAmount = cart.reduce((totalAmount: number, cart: Cart) => totalAmount + cart.amount, 0);

  return (
    <div className="absolute w-full h-full z-20 bg-white">
      <header className="w-full flex items-center justify-center h-12 border-b text-center">
        <div
          className="w-1/5 material-symbols-outlined cursor-pointer"
          onClick={() => {
            modalHandler('cartModalIsOpen', false);
          }}
        >
          navigate_before
        </div>
        <div className="w-3/5 whitespace-nowrap overflow-hidden">장바구니</div>
        <div className="w-1/5 material-symbols-outlined "></div>
      </header>
      <div className="w-full overflow-y-scroll p-4 flex flex-col gap-2" style={{ height: `calc(100% - 48px - 68px)` }}>
        <div className="w-full border rounded-lg border-slate-300">
          <div className="w-full flex justify-between items-center px-2 py-4 border-b border-slate-300">
            <div className="text-sm">
              {businessName}({table}번 테이블)
            </div>
            <div
              className=" text-slate-400 text-xs cursor-pointer"
              onClick={() => {
                publish(JSON.stringify({ type: 'allDel' }));
              }}
            >
              전체삭제
            </div>
          </div>
          {cart.map((item) => {
            return (
              <div className="w-full px-2 py-4 border-b border-slate-300" key={item.id}>
                <div className="w-full gap-2 flex">
                  <img src={`/api/image/${item.img}`} alt={item.name} className="rounded-lg w-[60px] h-[43px]" />
                  <div className="flex-grow">
                    <div className=" text-sm">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.options.join(', ')}</div>
                    <div className=" font-bold text-sm">{item.price.toLocaleString()}원</div>
                  </div>
                  <img
                    src="/images/close.png"
                    className="w-[18px] h-[18px] cursor-pointer"
                    onClick={() => {
                      publish(JSON.stringify({ type: 'del', cartId: item.id }));
                    }}
                  />
                </div>
                <div className="w-full flex justify-end">
                  <div className="flex border rounded-lg w-[87px] h-[40px] p-2 gap-2 justify-between items-center">
                    <div
                      className={`${
                        item.amount === 1 ? 'text-gray-200 ' : ' cursor-pointer '
                      } material-symbols-outlined  `}
                      onClick={() => {
                        if (item.amount > 1) {
                          publish(JSON.stringify({ type: 'set', cartId: item.id, amount: item.amount - 1 }));
                        }
                      }}
                    >
                      remove
                    </div>
                    <div className=" text-sm">{item.amount}</div>
                    <div
                      className="material-symbols-outlined cursor-pointer "
                      onClick={() => {
                        publish(JSON.stringify({ type: 'set', cartId: item.id, amount: item.amount + 1 }));
                      }}
                    >
                      add
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className="w-full px-2 py-4 flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => {
              modalHandler('cartModalIsOpen', false);
              modalHandler('optionModalIsOpen', false);
            }}
          >
            <div className="material-symbols-outlined">add</div>
            <div className=" text-sm">메뉴 추가하기</div>
          </div>
        </div>
        <div className="w-full border rounded-lg border-slate-300 p-2 text-sm">
          <div className="h-10 flex justify-between items-center">
            <div>결제수단</div>
            <div className="flex justify-center items-center cursor-pointer">
              <div>변경</div>
              <div className=" material-symbols-outlined">navigate_next</div>
            </div>
          </div>
          <div className="h-10 p-2 flex items-center gap-4 bg-slate-300 rounded-lg">
            <img src="/images/kakao_icon.png" alt="kakao_icon.png" />
            <div className="font-bold">카카오페이</div>
          </div>
        </div>

        <div className="px-2 py-4 flex justify-between items-center border-t border-slate-300">
          <div className="text-sm font-bold">총 결제금액</div>
          <div className=" font-bold">{totalPrice.toLocaleString()}원</div>
        </div>
      </div>
      <div className="w-full px-2 py-4 flex justify-center items-center custom_shadow">
        <button
          className="w-full p-2 text-white bg-rose-500 rounded-lg text-sm font-semibold flex justify-center items-center gap-2"
          onClick={() => {
            order(
              JSON.stringify({
                status: 'wait',
                table: table,
                price: totalPrice,
                storeId: storeId,
                menus: cart.map((item) => ({
                  name: item.name,
                  options: item.options,
                  amount: item.amount,
                })),
              }),
            );
            publish(JSON.stringify({ type: 'allDel' }));
            modalHandler('optionModalIsOpen', false);
            modalHandler('cartModalIsOpen', false);
            setOrderText('주문이 완료 되었습니다.');
            modalHandler('orderCompleteModalIsOpen', true);
          }}
        >
          <div className=" text-sm">{totalPrice.toLocaleString()}원 결제하기</div>
          <div className="bg-white rounded-full text-rose-500 w-5 h-5 text-center">{totalAmount}</div>
        </button>
      </div>
    </div>
  );
}

export default CartModal;
