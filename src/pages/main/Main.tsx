import { useState } from 'react';

import CustomDropdown from '@/component/CustomDropdown';

import styles from './Main.module.css';
import LoginModal from './modal/LoginModal';
import SigninModal from './modal/SigninModal';

function Main() {
  const language = ['KR', 'EN', 'JP'];
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signinModalIsOpen, setSigninModalIsOpen] = useState(false);

  return (
    <div className="h-full w-full  relative">
      {signinModalIsOpen && (
        <SigninModal signinModalIsOpen={signinModalIsOpen} setSigninModalIsOpen={setSigninModalIsOpen} />
      )}
      {loginModalIsOpen && <LoginModal setLoginModalIsOpen={setLoginModalIsOpen} loginModalIsOpen={loginModalIsOpen} />}
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
                setSigninModalIsOpen(!signinModalIsOpen);
              }}
            >
              업체등록
            </div>
            <div
              className="w-1/4 text-white p-2 rounded-lg cursor-pointer hover:text-rose-300"
              onClick={() => {
                setLoginModalIsOpen(!loginModalIsOpen);
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
