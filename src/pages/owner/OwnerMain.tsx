import React, { useEffect, useRef, useState } from 'react';

import * as StompJs from '@stomp/stompjs';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/reducers/loginStateSlice';
import { addOrder, setOrder } from '@/store/reducers/orderSlice';
import { ServerApi } from '@/util/functionapi-util';

import MenuManagement from './component/MenuManagement';
import Order from './component/Order';
import Sales from './component/Sales';

export default function OwnerMain() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const subjects = ['주문내역', '매출내역', '상품관리', 'QR발급'];
  const [isOpen, setIsOpen] = useState([true, false, false, false]);
  const client = useRef<StompJs.Client | null>(null);
  const { id } = useParams();

  const subjectToggle = (i: number) => {
    const updateIsOpen = new Array(4).fill(false);
    updateIsOpen[i] = !updateIsOpen[i];
    setIsOpen(updateIsOpen);
  };

  useEffect(() => {
    ServerApi.get(`/order/find/storeId/${id}`).then((res) => {
      dispatch(
        setOrder(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          res.data.map((order: any) => ({
            id: order.orderId,
            table: order.table,
            storeId: order.storeId,
            price: order.price,
            menus: order.menus,
            status: order.status,
            date: order.orderDate,
          })),
        ),
      );
    });
  }, [dispatch, id]);

  const logout = () => {
    dispatch(login(null));
    navigate('/');
  };

  useEffect(() => {
    connect();

    return () => {
      if (client.current) {
        disconnect();
      }
    };
  }, [id]); // id를 의존성 배열에 추가

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
      client.current.subscribe(`/sub/order/getOrder/storeId/${id}`, (message) => {
        const newMessage = JSON.parse(message.body);
        if (newMessage.type === 'order') {
          dispatch(
            addOrder({
              id: newMessage.orderId,
              table: newMessage.table,
              storeId: newMessage.storeId,
              status: newMessage.status,
              price: newMessage.price,
              menus: newMessage.menus,
              date: newMessage.orderDate,
            }),
          );
        }
      });
    }
  };

  const publish = (text: string) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: `/pub/order/storeMessage`,
        body: text,
      });
    }
  };

  return (
    <div className="w-full h-full border-gray-700">
      <header className="bg-rose-400  flex justify-center items-center">
        {subjects.map((subject, i) => {
          return (
            <button
              key={i}
              className={`${isOpen[i] ? 'bg-rose-500' : ''} text-white p-4 w-1/5 hover:bg-rose-500`}
              onClick={() => {
                subjectToggle(i);
              }}
            >
              {subject}
            </button>
          );
        })}
        <button
          className="text-white p-4 w-1/5 hover:bg-rose-500"
          onClick={() => {
            logout();
          }}
        >
          로그아웃
        </button>
      </header>
      <div className="w-full" style={{ height: 'calc(100% - 56px)' }}>
        {isOpen[0] && <Order publish={publish} />}
        {isOpen[1] && <Sales />}
        {isOpen[2] && <MenuManagement />}
      </div>
    </div>
  );
}
