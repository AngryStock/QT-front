import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Category, deleteCategory, setCategory } from '@/store/reducers/categorysSlice';
import { Menus, deleteMenu, setMenu } from '@/store/reducers/menusSlice';
import { ServerApi } from '@/util/functionapi-util';

import ContentsAddModal from '../modal/ContentsAddModal';
import MenuEditModal from '../modal/MenuEditModal';
import OptionEditModal from '../modal/OptionEditModal';

export type ModalHandler = (name: string, value: boolean) => void;

function MenuManagement() {
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState({
    contentsAddModalIsOpen: false,
    signinModalIsOpen: false,
    submittedModalIsOpen: false,
    optionEditModalIsOpen: false,
    menuEditModalIsOpen: false,
  });

  const [additionalType, setAdditionalType] = useState('categroy');

  const [deleteHovering, setDeleteHovering] = useState('');

  const [categoryId, setCategoryId] = useState('');
  const [menuId, setMenuId] = useState('');
  const [optionId, setOptionId] = useState('');
  const [name, setName] = useState('');
  const [categoryIsOpen, setCategoryIsOpen] = useState<string[]>([]);

  const categorys: Category[] = useAppSelector((state) => state.categorys);
  const menus: Menus[] = useAppSelector((state) => state.menus);
  const { id } = useParams();

  useEffect(() => {
    ServerApi.get(`/category/find/storeId/${id}`).then((res1) => {
      dispatch(setCategory(res1.data));
      ServerApi.get(`/menu/find/storeId/${id}`).then((res2) => {
        dispatch(setMenu(res2.data));
      });
    });
  }, [dispatch, id]);

  const modalHandler = (name: string, value: boolean) => {
    setModal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const mouseHoveringHandler = (value: string) => {
    setDeleteHovering(value);
  };

  const categoryIsOpenHandler = (categoryId: string) => {
    const copy = [...categoryIsOpen];
    if (categoryIsOpen.includes(categoryId)) {
      const targetIndex = copy.findIndex((category) => category === categoryId);
      copy.splice(targetIndex, 1);
      setCategoryIsOpen(copy);
    } else {
      copy.push(categoryId);
      setCategoryIsOpen(copy);
    }
  };

  return (
    <div className="w-full h-full relative">
      {modal.contentsAddModalIsOpen && (
        <ContentsAddModal
          modalHandler={modalHandler}
          additionalType={additionalType}
          menuId={menuId}
          optionId={optionId}
        />
      )}
      {modal.menuEditModalIsOpen && <MenuEditModal modalHandler={modalHandler} categoryId={categoryId} />}
      {modal.optionEditModalIsOpen && (
        <OptionEditModal
          modalHandler={modalHandler}
          menuId={menuId}
          name={name}
          setAdditionalType={setAdditionalType}
          setOptionId={setOptionId}
        />
      )}
      <div className="w-full flex justify-end p-2">
        <button
          className=" border border-gray-400 hover:bg-rose-500 px-2 py-1 rounded-lg hover:text-white"
          onClick={() => {
            setAdditionalType('category');
            modalHandler('contentsAddModalIsOpen', true);
          }}
        >
          카테고리 추가
        </button>
      </div>
      <div className="w-full px-2">
        {categorys.map((category) => {
          return (
            <div key={category.id}>
              <button
                className="w-full flex items-center justify-between"
                onMouseOver={() => mouseHoveringHandler(category.id)}
                onMouseLeave={() => mouseHoveringHandler('')}
              >
                <div
                  className="flex items-center"
                  onClick={() => {
                    categoryIsOpenHandler(category.id);
                  }}
                >
                  {categoryIsOpen.includes(category.id) ? (
                    <span className="material-symbols-outlined">arrow_drop_down</span>
                  ) : (
                    <span className="material-symbols-outlined">arrow_right</span>
                  )}

                  <span className="font-bold">{category.name}</span>
                </div>
                {deleteHovering === `${category.id}` && (
                  <div
                    className="material-symbols-outlined"
                    onClick={() => {
                      ServerApi.get(`/category/delete/${category.id}`).then((res) => {
                        if (res.data.statusCode === 200) {
                          dispatch(deleteCategory(category.id));
                        }
                      });
                    }}
                  >
                    delete
                  </div>
                )}
              </button>
              {categoryIsOpen.includes(category.id) && (
                <div className="px-2 flex overflow-x-scroll scrollbar-hide">
                  {menus.map((menu) => {
                    if (menu.categoryId === category.id) {
                      return (
                        <div className="p-2" key={menu.id}>
                          <div
                            className="w-[224px] h-[160px]"
                            onMouseOver={() => mouseHoveringHandler(menu.id)}
                            onMouseLeave={() => mouseHoveringHandler('')}
                          >
                            <img
                              src={`/image/${menu.menuImageUrl}`}
                              className="w-[224px] h-[160px] rounded-lg mb-2 absolute"
                            />
                            {deleteHovering === `${menu.id}` && (
                              <div className=" absolute w-[224px] h-[160px] flex justify-center items-center gap-2">
                                <button
                                  onClick={() => {
                                    setMenuId(menu.id);
                                    setName(menu.name);
                                    modalHandler('optionEditModalIsOpen', true);
                                  }}
                                >
                                  <img src="/images/edit.png" />
                                </button>
                                <button
                                  onClick={() => {
                                    ServerApi.get(`/menu/delete/${menu.id}`).then((res) => {
                                      if (res.data.statusCode === 200) {
                                        dispatch(deleteMenu(menu.id));
                                      }
                                    });
                                  }}
                                >
                                  <img src="/images/delete.png" />
                                </button>
                              </div>
                            )}
                          </div>
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
                      setCategoryId(category.id);
                      modalHandler('menuEditModalIsOpen', true);
                    }}
                  >
                    <img src="/images/add_circle.png" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MenuManagement;
