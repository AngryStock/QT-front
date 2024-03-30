import React, { useState } from 'react';

export default function Order() {
  const [changeColor1, setChangeColor1] = useState(false);
  const [changeColor2, setChangeColor2] = useState(false);
  const [changeColor3, setChangeColor3] = useState(false);

  const changeColorBt1 = () => {
    setChangeColor1(!changeColor1);
    setChangeColor2(false);
    setChangeColor3(false);
  };

  const changeColorBt2 = () => {
    setChangeColor2(!changeColor2);
    setChangeColor1(false);
    setChangeColor3(false);
  };
  const changeColorBt3 = () => {
    setChangeColor3(!changeColor3);
    setChangeColor1(false);
    setChangeColor2(false);
  };
  return (
    <div>
      <div
        onClick={changeColorBt1}
        className={`${changeColor1 ? 'bg-rose-300' : 'bg-gray-200'} flex flex-col justify-center items-center h-36 w-28 hover:bg-rose-300 cursor-pointer`}
      >
        주문대기
        <p>0</p>
      </div>
      <div
        onClick={changeColorBt2}
        className={`${changeColor2 ? 'bg-rose-300' : 'bg-gray-200'} flex flex-col justify-center items-center h-36 w-28 hover:bg-rose-300 cursor-pointer`}
      >
        주문거절
        <p>0</p>
      </div>
      <div
        onClick={changeColorBt3}
        className={`${changeColor3 ? 'bg-rose-300' : 'bg-gray-200'} flex flex-col justify-center items-center h-36 w-28 hover:bg-rose-300 cursor-pointer`}
      >
        주문거절
        <p>0</p>
      </div>
    </div>
  );
}
