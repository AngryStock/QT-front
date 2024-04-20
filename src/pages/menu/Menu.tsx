import { useEffect, useRef, useState } from 'react';

import * as StompJs from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

import { Cart, addCart, deleteAllCart, deleteCart, setCart, setCartAmount } from '@/store/reducers/cartSlice';
import { Category, setCategory } from '@/store/reducers/categorysSlice';
import { Menus, setMenu } from '@/store/reducers/menusSlice';
import { ServerApi } from '@/util/functionapi-util';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

import CartModal from './modal/CartModal';
import OptionModal from './modal/OptionModal';
import OrderCompleteModal from './modal/OrderCompleteModal';

function Menu() {
  const dispatch = useAppDispatch();
  const { id, table } = useParams();
  const categorys: Category[] = useAppSelector((state) => state.categorys);
  const menus: Menus[] = useAppSelector((state) => state.menus);
  const [selectCategory, setSelectCategory] = useState('');
  const [menuId, setMenuId] = useState('');
  const client = useRef<StompJs.Client | null>(null);
  const [owner, setOwner] = useState({ name: '가게명' });
  const cart = useAppSelector((state) => state.cart);
  const [orderText, setOrderText] = useState('');

  useEffect(() => {
    ServerApi.get(`/category/find/storeId/${id}`).then((res1) => {
      dispatch(setCategory(res1.data));
      ServerApi.get(`/menu/find/storeId/${id}`).then((res2) => {
        dispatch(setMenu(res2.data));
      });
    });
    ServerApi.get(`/cart/find/storeId/${id}/table/${table}`).then((res) => {
      dispatch(setCart(res.data));
    });

    ServerApi.get(`/store/find/${id}`).then((res) => {
      setOwner(res.data);
    });
  }, [dispatch, id, table]);

  useEffect(() => {
    ServerApi.get(`/cart/find/storeId/${id}/table/${table}`).then((res) => {
      dispatch(setCart(res.data));
    });
  }, [dispatch, id, table]);

  const [modal, setModal] = useState({
    optionModalIsOpen: false,
    cartModalIsOpen: false,
    orderCompleteModalIsOpen: false,
  });

  useEffect(() => {
    connect();

    return () => {
      if (client.current) {
        disconnect();
      }
    };
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `ws://localhost:8080/ws-stomp/websocket`, // 웹소켓 서버로 직접 접속
      reconnectDelay: 5000,
      // webSocketFactory: () => new SockJS('/ws-stomp'), // proxy를 통한 접속
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    if (client.current) {
      client.current.deactivate();
    }
  };

  const subscribe = () => {
    if (client.current) {
      client.current.subscribe(`/sub/cart/table/${id}/${table}`, (message) => {
        const newMessage = JSON.parse(message.body);
        if (newMessage.type === 'add') {
          dispatch(addCart(newMessage.cartDTO));
        } else if (newMessage.type === 'set') {
          dispatch(setCartAmount({ id: newMessage.cartId, amount: newMessage.amount }));
        } else if (newMessage.type === 'del') {
          dispatch(deleteCart(newMessage.cartId));
        } else if (newMessage.type === 'allDel') {
          dispatch(deleteAllCart());
        } else if (newMessage.type === 'order' && newMessage.status === 'ACCEPT') {
          setOrderText('주문이 수락 되었습니다');
        } else if (newMessage.type === 'order' && newMessage.status === 'DONE') {
          setOrderText('준비가 완료 되었습니다');
        }
      });
    }
  };

  const publish = (text: string) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: `/pub/cart/table/${id}/${table}`,
        body: text,
      });
    }
  };
  const order = (text: string) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: `/pub/order/message`,
        body: text,
      });
    }
  };

  const modalHandler = (name: string, value: boolean) => {
    setModal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function scrollToElement(a: string) {
    const element = document.getElementById(a);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const totalAmount = cart.reduce((totalAmount: number, cart: Cart) => totalAmount + cart.amount, 0);

  return (
    <div className="w-full h-full">
      {modal.optionModalIsOpen && (
        <OptionModal menuId={menuId} modalHandler={modalHandler} table={table} publish={publish} storeId={id} />
      )}
      {modal.cartModalIsOpen && (
        <CartModal
          modalHandler={modalHandler}
          businessName={owner.name}
          table={table}
          publish={publish}
          order={order}
          storeId={id}
          setOrderText={setOrderText}
        />
      )}
      {modal.orderCompleteModalIsOpen && (
        <OrderCompleteModal modalHandler={modalHandler} table={table} orderText={orderText} />
      )}
      <header className="w-full flex items-center h-12 justify-center text-center">
        <div className="w-1/5 material-symbols-outlined cursor-pointer">search</div>
        <div className="w-3/5 font-bold ">{owner.name}</div>
        <div
          className="w-1/5 relative flex justify-center items-center cursor-pointer"
          onClick={() => {
            modalHandler('cartModalIsOpen', true);
          }}
        >
          <div className=" material-symbols-outlined relative ">shopping_cart</div>
          {totalAmount !== 0 && (
            <div className="w-5 h-5 bg-rose-500 absolute top-1/2 left-1/2 rounded-full text-sm text-white ">
              {totalAmount}
            </div>
          )}
        </div>
      </header>
      <div className="flex py-2  overflow-x-scroll overflow-hidden border-y scrollbar-hide">
        {/* <button
          className={`${
            topExposure === selectCategory ? 'bg-rose-500 text-white' : ''
          } whitespace-nowrap rounded-full py-1 px-2 ml-2 text-sm`}
          onClick={() => {
            setSelectCategory(topExposure);
            scrollToElement(topExposure);
          }}
        >
          {topExposure}
        </button> */}
        {categorys.map((category) => {
          return (
            <button
              className={`${
                category.id === selectCategory ? 'bg-rose-500 text-white' : ''
              } whitespace-nowrap rounded-full py-1 px-2 ml-2 text-sm`}
              onClick={() => {
                setSelectCategory(category.id);
                scrollToElement(category.id);
              }}
              key={category.id}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <div className=" overflow-y-scroll overflow-hidden" style={{ height: `calc(100% - 96px)` }}>
        {/* <div className="p-4  bg-gray-300">
          <div className="font-bold" id={topExposure}>
            {topExposure}
          </div>
          <div className="flex gap-2  overflow-x-scroll pt-4 border-t scrollbar-hide">
            {topExporsureMenus.map((menu: Menus, i: number) => {
              return (
                <div
                  className="w-[128px] whitespace-nowrap rounded-lg bg-white p-2"
                  key={i}
                  onClick={() => {
                    setMenuId(menu.id);
                    modalHandler('optionModalIsOpen', true);
                  }}
                >
                  <img
                    src={`/images/${menu.menuImageUrl}`}
                    alt={menu.name}
                    width={112}
                    height={80}
                    className=" rounded-lg"
                  />
                  <div className="text-sm font-bold overflow-hidden text-ellipsis mt-2">{menu.name}</div>
                  <div className="text-sm">
                    <span>{menu.price.toLocaleString()}</span>
                    <span>원</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}
        {categorys.map((category) => {
          return (
            <div className="pt-4 px-4 border-b-8" key={category.id}>
              <div className="font-bold" id={category.id}>
                {category.name}
              </div>
              {menus
                .filter((menu) => menu.categoryId === category.id)
                .map((menu) => {
                  return (
                    <div
                      className="w-full flex justify-center items-center py-4 border-t cursor-pointer"
                      key={menu.id}
                      onClick={() => {
                        setMenuId(menu.id);
                        modalHandler('optionModalIsOpen', true);
                      }}
                    >
                      <div className="w-full mr-2">
                        <div>{menu.name}</div>
                        <div className="text-xs text-gray-500">{menu.description}</div>
                        <div className="text-sm">
                          <span className="font-bold">{menu.price.toLocaleString()}</span>
                          <span>원</span>
                        </div>
                      </div>
                      <img
                        src={`/image/${menu.menuImageUrl}`}
                        alt={menu.name}
                        className=" rounded-lg border h-[80px] w-[112px] bg-cover"
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
