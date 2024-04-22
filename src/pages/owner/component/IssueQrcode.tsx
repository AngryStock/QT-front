import { useState } from 'react';

import QR from 'qrcode.react';
import { useParams } from 'react-router-dom';

export default function IssueQrcode() {
  const [tables, setTables] = useState(2);
  const { id } = useParams();

  function QrPrint() {
    const arr = [];
    for (let i = 1; i <= tables; i++) {
      arr.push(
        <div className="flex flex-col justify-center items-center p-2">
          <div className="font-bold">테이블 {i}</div>
          <div>
            <QR id={'qr-gen' + i} value={`qrtable.p-e.kr/menu/${id}/${i}`} includeMargin={true} size={186} />
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              className="flex justify-center items-center gap-2 px-2 py-1 border rounded-lg border-slate-400"
            >
              <div className="material-symbols-outlined">print</div>
              <div>인쇄</div>
            </button>
            {/* <button
              type="button"
              className="flex justify-center items-center gap-2 px-2 py-1 border rounded-lg border-slate-400"
            >
              <div className="material-symbols-outlined">qr_code_scanner</div>
              <div>QR발급</div>
            </button> */}
          </div>
        </div>,
      );
    }
    return arr;
  }

  return (
    <div className="w-full h-full relative">
      <div className="flex justify-end items-center gap-2 p-2">
        <div className="flex justify-center items-center gap-[6px]">
          <div>테이블 수:</div>
          <input
            type="number"
            className="border border-slate-400 rounded-lg px-2 py-1 w-[68px] text-center"
            value={tables}
            onChange={(e) => {
              setTables(Number(e.target.value));
            }}
          />
          <button
            type="button"
            className="flex justify-center items-center gap-2 px-2 py-1 border rounded-lg border-slate-400"
          >
            <div className="material-symbols-outlined">print</div>
            <div>전체 인쇄</div>
          </button>
          {/* <button
            type="button"
            className="flex justify-center items-center gap-2 px-2 py-1 border rounded-lg border-slate-400"
          >
            <div className="material-symbols-outlined">qr_code_scanner</div>
            <div>전체 QR발급</div>
          </button> */}
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center items-center p-2">
          <div className="font-bold">카운터</div>
          <div>
            <QR id={'qr-gen0'} value={`qrtable.p-e.kr/menu/${id}/0`} includeMargin={true} size={186} />
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              className="flex justify-center items-center gap-2 px-2 py-1 border rounded-lg border-slate-400"
            >
              <div className="material-symbols-outlined">print</div>
              <div>인쇄</div>
            </button>
            {/* <button
              type="button"
              className="flex justify-center items-center gap-2 px-2 py-1 border rounded-lg border-slate-400"
            >
              <div className="material-symbols-outlined">qr_code_scanner</div>
              <div>QR발급</div>
            </button> */}
          </div>
        </div>
        {QrPrint()}
      </div>
    </div>
  );
}
