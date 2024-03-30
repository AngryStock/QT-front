import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/reducers/loginStateSlice';

import MenuManagement from './component/MenuManagement';
import Order from './component/Order';
import Sales from './component/Sales';

export default function OwnerMain() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const subjects = ['주문내역', '매출내역', '상품관리', 'QR발급'];
  const [isOpen, setIsOpen] = useState([true, false, false, false]);
  const subjectToggle = (i: number) => {
    const updateIsOpen = new Array(4).fill(false);
    updateIsOpen[i] = !updateIsOpen[i];
    setIsOpen(updateIsOpen);
  };

  const logout = () => {
    dispatch(login(null));
    navigate('/');
  };

  return (
    <div className="w-full h-full border-gray-700">
      <header className="bg-rose-400  flex justify-center items-center">
        {subjects.map((subject, i) => {
          return (
            <button
              key={i}
              className={`${isOpen[i] ? 'bg-rose-500' : ''} text-white p-4 w-1/5 hover:bg-rose-500`}
              onClick={() => {
                subjectToggle(i);
              }}
            >
              {subject}
            </button>
          );
        })}
        <button
          className="text-white p-4 w-1/5 hover:bg-rose-500"
          onClick={() => {
            logout();
          }}
        >
          로그아웃
        </button>
      </header>
      <div className="w-full" style={{ height: 'calc(100% - 56px)' }}>
        {isOpen[0] && <Order />}
        {isOpen[1] && <Sales />}
        {isOpen[2] && <MenuManagement />}
      </div>
    </div>
  );
}
