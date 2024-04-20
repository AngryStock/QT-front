import { useAppDispatch } from '@/store/hooks';
import { Menu, Orders, deleteOrder, setStatus } from '@/store/reducers/orderSlice';

interface WaitingOrderProps {
  waitingOrder: Orders[];
  publish: (text: string) => void;
}

export default function WaitingOrder({ waitingOrder, publish }: WaitingOrderProps) {
  const dispatch = useAppDispatch();
  const totalAmount = (menus: Menu[]) => {
    return menus.reduce((acc, menu) => acc + menu.amount, 0);
  };
  return (
    <div className="w-full h-full px-4">
      <div className="flex flex-col items-center w-full">
        {waitingOrder.map((order) => {
          return (
            <div
              className="w-full flex items-center justify-center gap-8 border-b-2 border-slate-400 py-4"
              key={order.id}
            >
              <div className="flex flex-col justify-center items-center w-[111px]">
                <div className="text-lg text-slate-500">주문시간</div>
                <div className="text-[40px] font-bold">
                  {new Date(order.date).getHours()}:{new Date(order.date).getMinutes()}
                </div>
                <div className=" text-lg">{order.table}번 테이블</div>
              </div>
              <div className="flex flex-col flex-grow">
                <div className="font-bold text-lg ">
                  [메뉴 {totalAmount(order.menus)}개] {order.price.toLocaleString()}원
                </div>
                {order.menus.map((menu, i) => {
                  return (
                    <div className="text-slate-500" key={i}>
                      <div>
                        # {menu.name} {menu.amount}개
                      </div>
                      <div className="pl-3">
                        {menu.options.length === 0 ? (
                          <div key={i}>ㄴ선택안함</div>
                        ) : (
                          menu.options.map((option, i) => {
                            return <div key={i}>ㄴ{option}</div>;
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-[151px] flex justify-center items-center gap-4">
                <button
                  className="bg-slate-500 w-1/2 h-[101.25px] font-bold text-white text-lg"
                  onClick={() => {
                    publish(JSON.stringify({ orderId: order.id, status: 'DENIED' }));
                    dispatch(deleteOrder(order.id));
                  }}
                >
                  <div>주문</div>
                  <div>거절</div>
                </button>
                <button
                  className="bg-rose-500  w-1/2 h-[101.25px] font-bold text-white text-lg"
                  onClick={() => {
                    publish(JSON.stringify({ orderId: order.id, status: 'ACCEPT' }));
                    dispatch(setStatus({ id: order.id, status: 'ACCEPT' }));
                  }}
                >
                  <div>주문</div>
                  <div>수락</div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
