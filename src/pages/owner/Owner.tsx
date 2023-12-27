import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Sales from './Sales';
import Order from './component/Order'
import OwnerMainMenu from './OwnerMainMenu';

export default function OwnerMain() {
    let [orderIsOpen, setOrderIsOpen] = useState(false);
    let [salesIsOpen, setSalesIsOpen] = useState(false);

    const changeOrderOpen = () => {
        setOrderIsOpen(!orderIsOpen)
        setSalesIsOpen(false)
    }

    const changeSaleIsOpen = () => {
        setSalesIsOpen(!salesIsOpen)
        setOrderIsOpen(false)
    }

    const [nav, setNav] = useState(false);

    const showNav = () => {
        setNav(true)
    }

    const hideNav = () => {
        setNav(false)
    }

    return (
        <div className=" border-gray-700">
            <header className='bg-rose-400  flex justify-center items-center' onMouseEnter={showNav} onMouseLeave={hideNav}>
                <button className='text-white ml-4 w-1/4' onClick={changeOrderOpen}>
                    주문내역
                </button>
                <button className='text-white ml-4 w-1/4' onClick={changeSaleIsOpen}>
                    매출내역
                </button>
                <button className="text-white ml-4 w-1/4">
                    상품관리
                    <div className={`${nav ? "visible" : "invisible"}  bg-gray-200`}>
                        <div>상품분류관리</div>
                        <div>상품등록</div>
                    </div>
                </button>
                <button className='text-white ml-4 w-1/4'>
                    QR발급
                </button>


            </header>
            {salesIsOpen && <Sales />}
            {orderIsOpen && <Order />}
            <OwnerMainMenu />
            test3
            <main>

            </main>
        </div>
    );
}


