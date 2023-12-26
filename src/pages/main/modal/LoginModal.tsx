import { Dispatch, SetStateAction } from 'react';

interface LoginModalProps {
  setLoginModalIsOpen: Dispatch<SetStateAction<boolean>>;
  loginModalIsOpen: boolean;
}

function LoginModal({ setLoginModalIsOpen, loginModalIsOpen }: LoginModalProps) {
  return (
    <div className="absolute w-full h-full z-20  flex justify-center items-center">
      <div
        className="w-full h-full absolute"
        onClick={() => {
          setLoginModalIsOpen(!loginModalIsOpen);
        }}
      ></div>
      <div className="w-1/2 h-1/2 bg-white rounded-lg min-w-80 z-10 p-6 font-bold relative">
        <div className="w-full text-right">
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={() => {
              setLoginModalIsOpen(!loginModalIsOpen);
            }}
          >
            close
          </span>
        </div>
        <div className="grid grid-rows-5">
          <div className="w-full h-full flex justify-center items-center">
            <div className="text-lg">오너 로그인</div>
          </div>

          <div className="w-full h-full ">
            <div className="py-2">사업자번호</div>
            <input type="number" className="w-full h-10 border-2 rounded-lg" />
          </div>

          <div className="w-full h-full">
            <div className="py-2">비밀번호</div>
            <input type="password" className="w-full h-10 border-2 rounded-lg" />
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 accent-rose-500" />
            <label htmlFor="default-checkbox" className="ms-2">
              로그인 유지
            </label>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-full bg-rose-500 rounded-lg h-10 flex justify-center items-center cursor-pointer">
              <div className="text-white">로그인</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
