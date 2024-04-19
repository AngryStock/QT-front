import React, { useState } from 'react';

import { useAppSelector } from '@/store/hooks';
import { Orders } from '@/store/reducers/orderSlice';

import DoneOrder from './DoneOrder';
import PreparingOrder from './PreparingOrder';
import WaitingOrder from './WaitingOrder';

export default function Order() {
  const [selectedTab, Setselected] = useState('주문대기');
  const tabNames = ['주문대기', '준비중', '주문완료'];

  const waitingOrder = useAppSelector((state) => state.order).filter((order: Orders) => order.status === 'Waiting');
  const preparingOrder = useAppSelector((state) => state.order).filter((order: Orders) => order.status === 'Preparing');
  const doneOrder = useAppSelector((state) => state.order).filter((order: Orders) => order.status === 'Done');

  const tabNumber = [waitingOrder.length, preparingOrder.length, doneOrder.length];

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className=" w-[112px] h-full">
        {tabNames.map((tab, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                Setselected(tab);
              }}
              className={`${selectedTab === tab ? 'bg-slate-400' : 'bg-slate-300'} flex flex-col justify-center items-center h-1/3  hover:bg-slate-400 cursor-pointer`}
            >
              {tab}
              <p>{tabNumber[i]}</p>
            </div>
          );
        })}
      </div>
      <div className="h-full overflow-y-scroll" style={{ width: 'calc(100% - 112px)' }}>
        {selectedTab === '주문대기' && <WaitingOrder waitingOrder={waitingOrder} />}
        {selectedTab === '준비중' && <PreparingOrder preparingOrder={preparingOrder} />}
        {selectedTab === '주문완료' && <DoneOrder doneOrder={doneOrder} />}
      </div>
    </div>
  );
}
