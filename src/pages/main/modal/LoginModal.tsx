import { useState } from 'react';

import axios from 'axios';

import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/reducers/loginStateSlice';

type ModalHandler = (name: string, value: boolean) => void;

interface LoginModalProps {
  modalHandler: ModalHandler;
}

function LoginModal({ modalHandler }: LoginModalProps) {
  const dispatch = useAppDispatch();
  const toggleModal = () => modalHandler('loginModalIsOpen', false);

  const [ownerId, setOwnerId] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogin, setKeepLogin] = useState(true);

  const loginApiHandler = async () => {
    const formData = new FormData();
    formData.append('username', ownerId);
    formData.append('password', password);
    await axios
      .post('/api/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          axios.get('/api/currentStore').then((res) => {
            dispatch(login({ id: res.data[0].id }));
            toggleModal();
          });
        }
      });
  };

  return (
    <div className="absolute w-full h-full p-[72px] z-20 flex justify-center items-center">
      <div className="w-full h-full absolute" onClick={toggleModal}></div>
      <div className="w-1/2 h-1/2 bg-white rounded-lg min-w-80 min-h-[500px] max-w-[512px] z-10 p-4 font-bold relative">
        <div className="w-full text-right">
          <button className="material-symbols-outlined cursor-pointer" onClick={toggleModal}>
            close
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginApiHandler();
          }}
        >
          <div className="grid grid-rows-5">
            <div className="flex justify-center items-center">
              <div className="text-lg">오너 로그인</div>
            </div>

            <div>
              <div className="py-2">아이디</div>
              <input
                type="text"
                className="w-full h-10 border-2 rounded-lg outline-none focus:border-rose-500"
                aria-label="아이디"
                value={ownerId}
                onChange={(e) => {
                  setOwnerId(e.target.value);
                }}
              />
            </div>

            <div>
              <div className="py-2">비밀번호</div>
              <input
                type="password"
                className="w-full h-10 border-2 rounded-lg outline-none focus:border-rose-500"
                aria-label="비밀번호"
                value={password}
                autoComplete="false"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="m-auto">
              <div className="flex items-center justify-center py-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 accent-rose-500 cursor-pointer"
                  checked={keepLogin}
                  onChange={(e) => setKeepLogin(e.target.checked)}
                />
                <label htmlFor="default-checkbox" className="ms-2 cursor-pointer">
                  로그인 유지
                </label>
              </div>
              <div className="flex items-center justify-center gap-2 font-normal text-xs w-full">
                <button>아이디찾기</button>
                <button>비밀번호찾기</button>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-full bg-rose-500 rounded-lg h-10 flex justify-center items-center text-white"
              >
                로그인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
