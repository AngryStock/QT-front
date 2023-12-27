import { Dispatch, SetStateAction } from 'react';

interface SigninModalProps {
  signinModalIsOpen: boolean;
  setSigninModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

function SigninModal({ setSigninModalIsOpen, signinModalIsOpen }: SigninModalProps) {
  const toggleModal = () => setSigninModalIsOpen(!signinModalIsOpen);

  return (
    <div className="absolute w-full h-full z-20 flex justify-center items-center">
      <div className="w-full h-full absolute" onClick={toggleModal}></div>
      <div className="w-1/2 h-1/2 bg-white min-w-[320px] max-w-[512px] rounded-lg"></div>
    </div>
  );
}

export default SigninModal;
