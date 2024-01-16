import { useState } from 'react';
import CustomerInquiry from './component/CustomerInquiry';
import SigninList from './component/SigninList';

function Admin() {
  const [isSigninOpen, setIsSigninOpen] = useState(true);
  const [isCustomerInquiryOpen, setIsCustomerInquiryOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <header className="w-full flex items-center text-center bg-sky-500">
        <div
          className="w-1/2 text-white p-2 rounded-lg cursor-pointer hover:text-sky-300"
          onClick={() => {
            setIsSigninOpen(true);
            setIsCustomerInquiryOpen(false);
          }}
        >
          업체등록관리
        </div>
        <div
          className="w-1/2 text-white p-2 rounded-lg cursor-pointer hover:text-sky-300"
          onClick={() => {
            setIsCustomerInquiryOpen(true);
            setIsSigninOpen(false);
          }}
        >
          고객문의
        </div>
      </header>
      {isSigninOpen && <SigninList />}
      {isCustomerInquiryOpen && <CustomerInquiry />}
    </div>
  );
}

export default Admin;
