import { ModalHandler } from '@/pages/owner/component/MenuManagement';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Cart, deleteAllCart, deleteCart, setCartAmount } from '@/store/reducers/cartSlice';
import { addOrder } from '@/store/reducers/orderSlice';

interface CartModalPops {
  modalHandler: ModalHandler;
  businessName: string;
  table: string | undefined;
}

function CartModal({ modalHandler, businessName, table }: CartModalPops) {
  const dispatch = useAppDispatch();
  const cart: Cart[] = useAppSelector((state) => state.cart);
  const totalPrice = cart.reduce((totalPrice: number, cart: Cart) => totalPrice + cart.price * cart.amount, 0);
  const totalAmount = cart.reduce((totalAmount: number, cart: Cart) => totalAmount + cart.amount, 0);

  console.log(totalPrice);

  return (
    <div className="absolute w-full h-full z-20 bg-white">
      <header className="w-full flex items-center justify-center h-12 border-b text-center">
        <div
          className="w-1/5 material-symbols-outlined"
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
            <div className=" text-slate-400 text-xs">전체삭제</div>
          </div>
          {cart.map((item) => {
            return (
              <div className="w-full px-2 py-4 border-b border-slate-300" key={item.id}>
                <div className="w-full gap-2 flex">
                  <img src={item.img} alt={item.name} className="rounded-lg w-[60px] h-[43px]" />
                  <div className="">
                    <div className=" text-sm">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.options.join(', ')}</div>
                    <div className=" font-bold text-sm">{item.price.toLocaleString()}원</div>
                  </div>
                  <img
                    src="/images/close.png"
                    className="w-[18px] h-[18px]"
                    onClick={() => {
                      dispatch(deleteCart(item.id));
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
                          dispatch(setCartAmount({ id: item.id, amount: item.amount - 1 }));
                        }
                      }}
                    >
                      remove
                    </div>
                    <div className=" text-sm">{item.amount}</div>
                    <div
                      className="material-symbols-outlined "
                      onClick={() => {
                        dispatch(setCartAmount({ id: item.id, amount: item.amount + 1 }));
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
            <div className="flex justify-center items-center">
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
            dispatch(
              addOrder({
                table: table,
                price: totalPrice,
                menus: cart.map((item) => ({
                  name: item.name,
                  options: item.options,
                  amount: item.amount,
                })),
              }),
            );
            dispatch(deleteAllCart());
            modalHandler('optionModalIsOpen', false);
            modalHandler('cartModalIsOpen', false);
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
