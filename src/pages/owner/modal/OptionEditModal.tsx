import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import axios from 'axios';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Options,
  changePrice,
  checkHnadler,
  deleteCategoryOfOptions,
  deleteOptionList,
  setOption,
} from '@/store/reducers/optionsSlice';

import { ModalHandler } from '../component/MenuManagement';

interface OptionEditModalProps {
  modalHandler: ModalHandler;
  menuId: string;
  name: string;
  setAdditionalType: Dispatch<SetStateAction<string>>;
  setOptionId: Dispatch<SetStateAction<string>>;
}

function OptionEditModal({ modalHandler, menuId, name, setAdditionalType, setOptionId }: OptionEditModalProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get(`/api/menuOption/find/menuId/CategoryAndOption/${menuId}`).then((res1) => {
      dispatch(setOption(res1.data));
    });

    // setOptionIsOpen(options.map((option) => option.categoryId));
  }, [dispatch, menuId]);

  const options: Options[] = useAppSelector((state) => state.options).filter(
    (option: Options) => option.menuId === menuId,
  );
  const [optionIsOpen, setOptionIsOpen] = useState<string[]>([]);

  const setCategories = options.map((option) => ({
    id: option.categoryId,
    essential: option.essential,
    only: option.only,
  }));
  const setMenuOptions = options.flatMap((option) =>
    option.optionLists.map((item) => ({ id: item.id, price: item.price })),
  );

  const optionIsOpenHandler = (optionId: string) => {
    const copy = [...optionIsOpen];
    if (optionIsOpen.includes(optionId)) {
      const targetIndex = copy.findIndex((option) => option === optionId);
      copy.splice(targetIndex, 1);
      setOptionIsOpen(copy);
    } else {
      copy.push(optionId);
      setOptionIsOpen(copy);
    }
  };
  return (
    <div className="absolute w-full h-full p-10 z-20 flex justify-center items-center">
      <div
        className="w-full h-full absolute"
        onClick={() => {
          modalHandler('optionEditModalIsOpen', false);
        }}
      ></div>
      <div className="border h-[712px] w-[672px] border-slate-400 rounded-lg z-10  font-bold  bg-white fixed ">
        <div className="px-4 pt-4 w-full absolute flex flex-col gap-2">
          <div className="flex justify-between items-center w-full font-bold text-lg">
            <div>옵션 설정</div>
            <div>{name}</div>
            <button
              type="button"
              className="material-symbols-outlined cursor-pointer"
              onClick={() => {
                modalHandler('optionEditModalIsOpen', false);
              }}
            >
              close
            </button>
          </div>
          <div className="flex justify-end items-center">
            <button
              className="border-2 rounded-lg py-1 px-2"
              onClick={() => {
                setAdditionalType('category of options');
                modalHandler('contentsAddModalIsOpen', true);
              }}
            >
              옵션 카테고리 추가
            </button>
          </div>
        </div>
        <div className="flex flex-col px-4 py-2 mt-[88px] mb-[64px] h-[560px] overflow-y-scroll scrollbar-hcategoryIde">
          {options.map((option) => {
            return (
              <div key={option.categoryId}>
                <button type="button" className="w-full flex items-center justify-between">
                  <div
                    className="flex items-center"
                    onClick={() => {
                      optionIsOpenHandler(option.categoryId);
                    }}
                  >
                    {optionIsOpen.includes(option.categoryId) ? (
                      <span className="material-symbols-outlined">arrow_drop_down</span>
                    ) : (
                      <span className="material-symbols-outlined">arrow_right</span>
                    )}
                    <span className="font-bold">{option.title}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <label htmlFor={'only' + option.categoryId} className="ms-2 cursor-pointer">
                      복수 선택 여부
                    </label>
                    <input
                      id={'only' + option.categoryId}
                      type="checkbox"
                      className="w-4 h-4 accent-rose-500 cursor-pointer"
                      checked={!option.only}
                      onChange={(e) => {
                        dispatch(
                          checkHnadler({
                            optionId: option.categoryId,
                            checked: 'only',
                            value: !e.target.checked,
                          }),
                        );
                      }}
                    />
                    <label htmlFor={'essential' + option.categoryId} className="ms-2 cursor-pointer">
                      필수 선택 여부
                    </label>
                    <input
                      id={'essential' + option.categoryId}
                      type="checkbox"
                      className="w-4 h-4 accent-rose-500 cursor-pointer"
                      checked={option.essential}
                      onChange={(e) => {
                        dispatch(
                          checkHnadler({
                            optionId: option.categoryId,
                            checked: 'essential',
                            value: e.target.checked,
                          }),
                        );
                      }}
                    />
                    <div
                      className="border rounded-lg border-slate-400 px-2 flex justify-center items-center"
                      onClick={() => {
                        setAdditionalType('option');
                        setOptionId(option.categoryId);
                        modalHandler('contentsAddModalIsOpen', true);
                      }}
                    >
                      옵션추가
                    </div>
                    <div
                      className="material-symbols-outlined"
                      onClick={() => {
                        axios.get(`/api/optionCategory/delete/${option.categoryId}`).then((res) => {
                          if (res.data.statusCode === 200) {
                            dispatch(deleteCategoryOfOptions(option.categoryId));
                          }
                        });
                      }}
                    >
                      delete
                    </div>
                  </div>
                </button>
                <div className="px-10 py-1">
                  {optionIsOpen.includes(option.categoryId) &&
                    option.optionLists.map((optionList, i) => {
                      return (
                        <div key={i} className="flex justify-between items-center py-1">
                          <div>{optionList.name}</div>
                          <div className="flex justify-center items-center gap-2">
                            <div className="flex justify-center items-center gap-2">
                              <div>추가금액:</div>
                              <input
                                type="number"
                                className="w-[112px] border rounded-lg text-right px-2"
                                value={optionList.price}
                                onChange={(e) => {
                                  dispatch(
                                    changePrice({
                                      optionId: option.categoryId,
                                      index: i,
                                      price: Number(e.target.value),
                                    }),
                                  );
                                }}
                              />
                            </div>
                            <div
                              className="material-symbols-outlined cursor-pointer"
                              onClick={() => {
                                axios.get(`/api/menuOption/delete/${optionList.id}`).then((res) => {
                                  if (res.data.statusCode === 200) {
                                    dispatch(deleteOptionList({ optionId: option.categoryId, index: i }));
                                  }
                                });
                              }}
                            >
                              delete
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center w-full absolute px-4 pb-4 pt-2 bottom-0 ">
          <button
            type="button"
            className="w-full bg-rose-500 rounded-lg h-10 flex justify-center items-center text-white"
            onClick={() => {
              axios
                .post(`/api/menuOption/update/CategoryAndOptions`, {
                  categories: setCategories,
                  menuOptions: setMenuOptions,
                })
                .then((res) => {
                  if (res.data.statusCode === 200) {
                    modalHandler('optionEditModalIsOpen', false);
                  }
                });
            }}
          >
            설정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default OptionEditModal;
