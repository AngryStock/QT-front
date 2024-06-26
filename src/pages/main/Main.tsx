import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CustomDropdown from '@/component/CustomDropdown';
import { useAppSelector } from '@/store/hooks';

import styles from './Main.module.css';
import LoginModal from './modal/LoginModal';
import SigninModal from './modal/SigninModal';
import SubmittedModal from './modal/SubmittedModal';

function Main() {
  const navigate = useNavigate();

  const language = ['KR', 'EN', 'JP'];
  const [modal, setModal] = useState({
    loginModalIsOpen: false,
    signinModalIsOpen: false,
    submittedModalIsOpen: false,
  });
  const modalHandler = (name: string, value: boolean) => {
    setModal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginState = useAppSelector((state) => state.loginState);
  useEffect(() => {
    if (loginState) {
      navigate(`/owner/${loginState.id}`);
    }
  }, [loginState, navigate]);

  return (
    <div className="h-full w-full  relative">
      {modal.signinModalIsOpen && <SigninModal modalHandler={modalHandler} />}
      {modal.loginModalIsOpen && <LoginModal modalHandler={modalHandler} />}
      {modal.submittedModalIsOpen && <SubmittedModal modalHandler={modalHandler} />}
      <div className="h-full relative z-10">
        <div className={`h-full ${styles.mainBackground} absolute top-0 right-0 bottom-0 left-0 -z-10`}></div>
        <header className="w-full flex items-center p-4 font-bold whitespace-nowrap justify-between">
          <div className="w-1/2">
            <div className="w-1/4 text-white cursor-pointer hover:text-rose-300">QRORDER</div>
          </div>
          <div className="w-1/2 flex items-center text-center">
            <div className="w-1/4 text-white p-2 rounded-lg cursor-pointer hover:text-rose-300">도입사례</div>
            <div
              className="w-1/4 text-white p-2 rounded-lg cursor-pointer hover:text-rose-300"
              onClick={() => {
                modalHandler('signinModalIsOpen', true);
              }}
            >
              업체등록
            </div>
            <div
              className="w-1/4 text-white p-2 rounded-lg cursor-pointer hover:text-rose-300"
              onClick={() => {
                modalHandler('loginModalIsOpen', true);
              }}
            >
              로그인
            </div>
            <div className="w-1/4 ">
              <CustomDropdown
                list={language}
                options={['center']}
                height={10}
                selectTextColor={'white'}
                hoverSelctTextColor={'rose'}
              />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Main;
