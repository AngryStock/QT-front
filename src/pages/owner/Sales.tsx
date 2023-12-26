import { useState } from 'react';
import CustomDropdown from './component/CustomDropdown';
import CustomDateRangePicker from './component/CustomDateRangePicker';

function Sales() {
  let [years, setYears] = useState(['2023년', '2022년', '2021년', '2020년', '2019년']);
  let [tab, setTab] = useState('');
  let halfs = ['상반기', '하반기'];
  let quarters = ['1분기', '2분기', '3분기', '4분기'];
  let saleList = ['카드매출', '현금매출', '기타매출'];

  return (
    <div className="w-full p-4">
      <div className="w-full flex mb-2">
        <div className="w-1/3">
          <CustomDropdown options={years} />
        </div>
        <div className="w-1/3 pl-2">
          {halfs.map((half) => {
            return (
              <button
                className={`${
                  tab === half ? 'bg-rose-200 font-bold' : 'none'
                } border border-gray-400 rounded-lg h-12 p-1 w-1/2`}
                onClick={() => {
                  setTab(half);
                }}
              >
                {half}
              </button>
            );
          })}
        </div>
        <div className="w-1/3 pl-2">
          {quarters.map((quarter) => {
            return (
              <button
                className={`${
                  tab === quarter ? 'bg-rose-200 font-bold' : 'none'
                } border border-gray-400 rounded-lg h-12 p-1 w-1/4`}
                onClick={() => {
                  setTab(quarter);
                }}
              >
                {quarter}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full flex">
        <div className="w-1/3">
          <CustomDateRangePicker />
        </div>
        <div className="w-1/3 pl-2">
          <button className="w-1/4 h-12 bg-rose-500 rounded-lg text-white">조회</button>
        </div>
      </div>
      <div className="my-6 text-sm text-gray-400">
        <div>⁎ 전월 매입자료는 당월 D+5(영업일 기준)일 이내 확인 할 수 있어요.</div>
        <div>
          ⁎ 부가세 신고자료는 최대 6개월까지 조회할 수 있어요. 결산 내역이 많은 경우 데이터 조회 시간이 오래 걸릴 수
          있어요.
        </div>
      </div>
      <div className="w-full p-2 shadow-lg rounded-lg">
        <div className="w-full flex text-lg items-center h-12 mb-4">
          <div className="w-1/2 font-bold relative">매출</div>
          <div className="w-1/2 flex justify-between text-center">
            <button className="w-1/3 text-gray-400 flex justify-center items-center hover:text-rose-200">
              <span>인쇄</span>
              <span className="material-symbols-outlined">print</span>
            </button>
            <button className="w-1/3 text-gray-400 flex justify-center items-center hover:text-rose-200">
              <span>상세내역 다운로드</span>
              <span className="material-symbols-outlined">download</span>
            </button>
            <button className="w-1/3 text-gray-400 flex justify-center items-center hover:text-rose-200">
              <span>이메일 보내기</span>
              <span className="material-symbols-outlined">mail</span>
            </button>
          </div>
        </div>

        <div className="w-full border border-black"></div>
        <div className="flex my-2">
          <div className="w-3/6">매출구분</div>
          <div className="w-1/6 text-right">매출</div>
          <div className="w-1/6 text-right">부가세</div>
          <div className="w-1/6 text-right">합계</div>
        </div>
        {saleList.map((list) => {
          return (
            <>
              <div className="w-full border border-grey-300"></div>
              <div className="flex my-6">
                <div className="w-3/6">{list}</div>
                <div className="w-1/6 text-right"></div>
                <div className="w-1/6 text-right"></div>
                <div className="w-1/6 text-right"></div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Sales;
