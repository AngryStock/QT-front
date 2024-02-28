import { useRef, useState } from 'react';

function CustomDateRangePicker() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const endDateRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full h-12 flex items-center justify-between ">
      <input
        type="date"
        max="9999-12-31"
        className="border border-gray-400 h-12 rounded-lg px-2 w-5/12 cursor-pointer"
        value={startDate}
        onClick={() => {
          setStartDate('');
        }}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      />
      <span className="font-bold">~</span>
      <input
        ref={endDateRef}
        type="date"
        max="9999-12-31"
        className="border border-gray-400 h-12 rounded-lg px-2 w-5/12 cursor-pointer"
        value={endDate}
        onClick={() => {
          setEndDate('');
        }}
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
      />
    </div>
  );
}

export default CustomDateRangePicker;
