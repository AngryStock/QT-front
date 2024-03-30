import { useState } from 'react';

import { ModalHandler } from '../component/MenuManagement';

interface MenuEditModalProps {
  modalHandler: ModalHandler;
}

function MenuEditModal({ modalHandler }: MenuEditModalProps) {
  const toggleModal = () => modalHandler('menuEditModalIsOpen', false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileName, setImageFileName] = useState('no_image.png');

  const fileChangeHandler = (name: string, file: File) => {
    setImageFileName(name);
    setImageFile(file);
  };

  return (
    <div className="absolute w-full h-full z-20 flex justify-center items-center">
      <div className="w-full h-full absolute" onClick={toggleModal}></div>
      <div className="w-[672px] h-full border border-gray-400 rounded-lg z-10  font-bold relative bg-white">
        <form className="p-4 w-full h-full flex flex-col gap-2">
          <div className="flex justify-between items-center w-full ">
            <div className="font-bold">메뉴 추가</div>
            <button type="button" className="material-symbols-outlined cursor-pointer" onClick={toggleModal}>
              close
            </button>
          </div>
          <div className="flex gap-2">
            <div className="w-[408px] flex flex-col gap-2">
              <div className="flex items-center">
                <div className="w-[72px] flex justify-between items-center pr-2">
                  <div>제</div>
                  <div>품</div>
                  <div>명</div>
                  <div>:</div>
                </div>
                <input type="text" className="w-[336px] h-[36px] px-2 border-2 border-slate-400 rounded-lg" />
              </div>
              <div className="flex items-center">
                <div className="w-[72px] flex justify-between items-center pr-2">
                  <div>제</div>
                  <div>품</div>
                  <div>설</div>
                  <div>명</div>
                  <div>:</div>
                </div>
                <textarea className="w-[336px] h-[115px] px-2 border-2 border-slate-400 rounded-lg" />
              </div>
              <div className="flex items-center">
                <div className="w-[72px] flex justify-between items-center pr-2">
                  <div>가</div>
                  <div>격</div>
                  <div>:</div>
                </div>
                <input type="text" className="w-[336px] h-[36px] px-2 border-2 border-slate-400 rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[224px]">
              <img src={imageFile ? URL.createObjectURL(imageFile) : `/images/no_image.png`} className=" rounded-lg" />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="w-3/5 border-2 border-slate-400 rounded-lg overflow-x-scroll p-1 "
                  readOnly
                  placeholder="파일을 선택해주세요"
                  value={imageFileName}
                />
                <input
                  type="file"
                  accept=".pdf, .jpg, .png, image/*"
                  className=" hidden"
                  placeholder="파일을 선택해주세요"
                  onChange={(e) => {
                    if (e.target.files) {
                      fileChangeHandler(e.target.files[0].name, e.target.files[0]);
                    }
                  }}
                  id="imageFile"
                />
                <label
                  htmlFor="imageFile"
                  className="w-2/5 h-[36px] flex justify-center items-center border-2 border-slate-400 rounded-lg cursor-pointer"
                >
                  파일첨부
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MenuEditModal;
