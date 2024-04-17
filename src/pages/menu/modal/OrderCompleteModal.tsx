import { ModalHandler } from '@/pages/owner/component/MenuManagement';

interface OrderCompleteModalPops {
  modalHandler: ModalHandler;
  table: string | undefined;
}

function OrderCompleteModal({ modalHandler, table }: OrderCompleteModalPops) {
  return (
    <div className="absolute w-full h-full z-20 bg-white">
      <header className="w-full flex items-center justify-center h-12 border-b text-center">
        <div className="whitespace-nowrap overflow-hidden">주문완료(주문번호)</div>
      </header>
      <div className="w-full flex justify-center items-center" style={{ height: `calc(100% - 48px - 68px)` }}>
        <div className="p-4 flex flex-col gap-[10px] justify-center items-center">
          <div className="font-bold text-lg">테이블 {table}</div>
          <div>주문이 완료 되었습니다.</div>
        </div>
      </div>
      <div className="w-full px-2 py-4 flex justify-center items-center custom_shadow">
        <button
          className="w-full p-2 text-white bg-rose-500 rounded-lg text-sm font-semibold flex justify-center items-center gap-2"
          onClick={() => {
            modalHandler('orderCompleteModalIsOpen', false);
          }}
        >
          <div className=" text-sm">추가 주문하기</div>
        </button>
      </div>
    </div>
  );
}

export default OrderCompleteModal;
