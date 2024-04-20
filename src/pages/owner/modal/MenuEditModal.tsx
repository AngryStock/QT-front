import { useState } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { addMenu } from '@/store/reducers/menusSlice';
import { ServerApi, singleImageUploadApi } from '@/util/functionapi-util';

import { ModalHandler } from '../component/MenuManagement';

interface MenuEditModalProps {
  modalHandler: ModalHandler;
  categoryId: string;
}

function MenuEditModal({ modalHandler, categoryId }: MenuEditModalProps) {
  const dispatch = useAppDispatch();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileName, setImageFileName] = useState('no_image.png');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const fileChangeHandler = (name: string, file: File) => {
    setImageFileName(name);
    setImageFile(file);
  };

  const addMenuApiHandler = async () => {
    if (imageFile) {
      const res = await singleImageUploadApi(imageFile);
      await ServerApi.post('/menu/save', {
        categoryId: categoryId,
        name: name,
        description: description,
        price: price,
        menuImageUrl: res.menuImageFileUrl,
      }).then((res) => {
        dispatch(addMenu(res.data));
        modalHandler('menuEditModalIsOpen', false);
      });
    }
  };

  return (
    <div className="absolute w-full h-full z-20 flex justify-center items-center">
      <div
        className="w-full h-full absolute"
        onClick={() => {
          modalHandler('menuEditModalIsOpen', false);
        }}
      ></div>
      <div className="border border-gray-400 rounded-lg z-10  font-bold fixed bg-white">
        <form className="p-4 w-full h-full flex flex-col gap-2">
          <div className="flex justify-between items-center w-full ">
            <div className="font-bold text-lg">메뉴 추가</div>
            <button
              type="button"
              className="material-symbols-outlined cursor-pointer"
              onClick={() => {
                modalHandler('menuEditModalIsOpen', false);
              }}
            >
              close
            </button>
          </div>
          <div className="flex gap-2">
            <div className="w-[408px] flex flex-col gap-2">
              <div className="flex items-center">
                <div className="w-[58px] flex justify-between items-center ">
                  <div>제</div>
                  <div>품</div>
                  <div>명</div>
                </div>
                <div className="w-[14px] text-center">:</div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="w-[336px] h-[36px] px-2 border-2 border-slate-400 rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <div className="w-[58px] flex justify-between items-center ">
                  <div>제</div>
                  <div>품</div>
                  <div>설</div>
                  <div>명</div>
                </div>
                <div className="w-[14px] text-center">:</div>
                <textarea
                  className="w-[336px] h-[115px] px-2 border-2 border-slate-400 rounded-lg"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center">
                <div className="w-[58px] flex justify-between items-center ">
                  <div>가</div>
                  <div>격</div>
                </div>
                <div className="w-[14px] text-center">:</div>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  className="w-[336px] h-[36px] px-2 border-2 border-slate-400 rounded-lg"
                />
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
                  className="hidden"
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
          <div className="w-full flex justify-center items-center">
            <button
              type="button"
              className="w-full bg-rose-500 rounded-lg h-10 flex justify-center items-center text-white"
              onClick={addMenuApiHandler}
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MenuEditModal;
