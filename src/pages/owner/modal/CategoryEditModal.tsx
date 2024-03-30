import { useState } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { addCategory } from '@/store/reducers/categorysSlice';

import { ModalHandler } from '../component/MenuManagement';

interface CategoryEditModalProps {
  modalHandler: ModalHandler;
}

function CategoryEditModal({ modalHandler }: CategoryEditModalProps) {
  const dispatch = useAppDispatch();

  const [categoryText, setCategoryText] = useState('');

  const toggleModal = () => modalHandler('categoryEditModalIsOpen', false);

  const addCategoryHandler = () => {
    if (categoryText !== '') {
      dispatch(addCategory(categoryText));
    }
  };

  return (
    <div className="absolute w-full h-full p-[72px] z-20 flex justify-center items-center">
      <div className="w-full h-full absolute" onClick={toggleModal}></div>
      <div className="w-1/2 border border-gray-400 rounded-lg min-w-80 max-w-[512px] z-10  font-bold relative bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCategoryHandler();
            toggleModal();
          }}
        >
          <div className="p-4">
            <div className="flex justify-between items-center w-full pb-4 ">
              <div className="text-lg pl-2">카테고리 추가</div>
              <button type="button" className="material-symbols-outlined cursor-pointer" onClick={toggleModal}>
                close
              </button>
            </div>

            <div className="h-14 pb-4 ">
              <input
                type="text"
                className="w-full h-10 border-2 rounded-lg overflow-x outline-none focus:border-rose-500 "
                aria-label="아이디"
                value={categoryText}
                onChange={(e) => {
                  setCategoryText(e.target.value);
                }}
              />
            </div>

            <div className=" pb-4 pl-2 text-sm">
              <p>⁕ 여러개를 입력할 경우 , 으로 구분해주세요.</p>
              <p>ex) 추천메뉴,대표메뉴</p>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-full bg-rose-500 rounded-lg h-10 flex justify-center items-center text-white"
              >
                추가
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CategoryEditModal;
