import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooks';
import { addCategory } from '@/store/reducers/categorysSlice';
import { addCategoryOfOptions, addOptionLists } from '@/store/reducers/optionsSlice';
import { ServerApi } from '@/util/functionapi-util';

import { ModalHandler } from '../component/MenuManagement';

interface ContentsAddModalProps {
  modalHandler: ModalHandler;
  additionalType: string;
  menuId: string;
  optionId: string;
}

function ContentsAddModal({ modalHandler, additionalType, menuId, optionId }: ContentsAddModalProps) {
  const dispatch = useAppDispatch();

  const [categoryText, setCategoryText] = useState('');

  const { id } = useParams();

  const toggleModal = () => modalHandler('contentsAddModalIsOpen', false);

  const addCategoryHandler = async () => {
    if (categoryText !== '') {
      if (additionalType === 'category') {
        const categroyNames = categoryText.split(',');
        await ServerApi.post('/category/add', { storeId: id, value: categroyNames }).then((res) => {
          dispatch(addCategory(res.data));
        });
      } else if (additionalType === 'category of options') {
        const optionCategoryNames = categoryText.split(',');
        await ServerApi.post('/optionCategory/add', { menuId: menuId, value: optionCategoryNames }).then((res) => {
          dispatch(addCategoryOfOptions(res.data));
        });
        // dispatch(addCategoryOfOptions({ optionCategoryNames: categoryText, menuId: menuId }));
      } else if (additionalType === 'option') {
        const optionNames = categoryText.split(',');
        await ServerApi.post('/menuOption/add', { optionCategoryId: optionId, value: optionNames }).then((res) => {
          dispatch(addOptionLists({ optionId: optionId, value: res.data }));
        });
      }
    }
  };

  return (
    <div className="absolute w-full h-full p-[72px] z-30 flex justify-center items-center">
      <div className="w-full h-full absolute" onClick={toggleModal}></div>
      <div className="w-1/2 border border-gray-400 rounded-lg min-w-80 max-w-[512px] z-10  font-bold fixed bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCategoryHandler();
            toggleModal();
          }}
        >
          <div className="p-4">
            <div className="flex justify-between items-center w-full pb-4 ">
              {additionalType === 'category' && <div className="text-lg pl-2">카테고리 추가</div>}
              {additionalType === 'category of options' && <div className="text-lg pl-2">옵션 카테고리 추가</div>}
              {additionalType === 'option' && <div className="text-lg pl-2">옵션 추가</div>}
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
              {additionalType === 'category' && <p>ex) 추천메뉴,대표메뉴</p>}
              {additionalType === 'category of options' && <p>ex) 빵선택,치즈선택</p>}
              {additionalType === 'option' && <p>ex) 화이트,파마산오레가노,위트</p>}
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
export default ContentsAddModal;
