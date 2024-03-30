import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Category, deleteCategory } from '@/store/reducers/categorysSlice';
import { Menus } from '@/store/reducers/menusSlice';

import CategoryEditModal from '../modal/CategoryEditModal';
import MenuEditModal from '../modal/MenuEditModal';

export type ModalHandler = (name: string, value: boolean) => void;

function MenuManagement() {
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState({
    categoryEditModalIsOpen: false,
    signinModalIsOpen: false,
    submittedModalIsOpen: false,
    menuEditModalIsOpen: false,
  });

  const [deleteHovering, setDeleteHovering] = useState('');

  const categorys: Category[] = useAppSelector((state) => state.categorys);
  const menus: Menus[] = useAppSelector((state) => state.menus);

  const modalHandler = (name: string, value: boolean) => {
    setModal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const mouseHoveringHandler = (value: string) => {
    setDeleteHovering(value);
  };

  return (
    <div className="w-full h-full relative">
      {modal.categoryEditModalIsOpen && <CategoryEditModal modalHandler={modalHandler} />}
      {modal.menuEditModalIsOpen && <MenuEditModal modalHandler={modalHandler} />}
      <div className="w-full flex justify-end p-2">
        <button
          className=" border border-gray-400 hover:bg-rose-500 px-2 py-1 rounded-lg hover:text-white"
          onClick={() => {
            modalHandler('categoryEditModalIsOpen', true);
          }}
        >
          카테고리 추가
        </button>
      </div>
      <div className="w-full px-2">
        {categorys.map((category) => {
          return (
            <>
              <button
                key={category.id}
                className="w-full flex items-center justify-between"
                onMouseOver={() => mouseHoveringHandler(category.id)}
                onMouseLeave={() => mouseHoveringHandler('')}
              >
                <div className="flex items-center">
                  <span className="material-symbols-outlined">arrow_drop_down</span>
                  <span className="font-bold">{category.name}</span>
                </div>
                {deleteHovering === `${category.id}` && (
                  <div
                    className="material-symbols-outlined"
                    onClick={() => {
                      dispatch(deleteCategory(category.id));
                    }}
                  >
                    delete
                  </div>
                )}
              </button>
              <div className="px-2 flex">
                {menus.map((menu) => {
                  if (menu.categoryId === category.id) {
                    return (
                      <div className="p-2">
                        <img src={menu.img} className="w-[224px] h-[160px] rounded-lg mb-2" />
                        <div className="w-[224px]">
                          <div className="font-bold">{menu.name}</div>
                          <div>{menu.price.toLocaleString()}원</div>
                        </div>
                      </div>
                    );
                  }
                })}
                <button
                  className="p-2 flex justify-center items-center"
                  onClick={() => {
                    modalHandler('menuEditModalIsOpen', true);
                  }}
                >
                  <img src="/images/add_circle.png" />
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
export default MenuManagement;
