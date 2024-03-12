type ModalHandler = (name: string, value: boolean) => void;

interface SubmittedModalProps {
  modalHandler: ModalHandler;
}

function SubmittedModal({ modalHandler }: SubmittedModalProps) {
  const toggleModal = () => modalHandler('submittedModalIsOpen', false);

  return (
    <div className="absolute w-full h-full p-[72px] z-20 flex justify-center items-center">
      <div className="w-full h-full absolute" onClick={toggleModal}></div>
      <div className="w-[320px] bg-white rounded-lg min-w-80  z-10 p-4 font-bold relative">
        <div className="h-full">
          <div className="p-4 text-center">서비스 이용 신청이 완료 되었습니다.</div>
          <div className="p-4 text-center">신청 결과는 영업일 기준 1~3일 내에 입력하신 이메일로 전송됩니다.</div>

          <div className="p-4 flex justify-center items-center">
            <button
              type="submit"
              className="w-full bg-rose-500 rounded-lg h-10 flex justify-center items-center text-white"
              onClick={toggleModal}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmittedModal;
