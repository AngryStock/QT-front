import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooks';
import { refuseSignup } from '@/store/reducers/ownersApprovalSlice';
import { approvalSendEmail, refuseSendEmail } from '@/util/email-util';
import { ServerApi, documentDownloadApi } from '@/util/functionapi-util';

interface Owners {
  accountNumber: string;
  approval: string;
  bank: string;
  businessNumber: string;
  businessRegistrationFileUrl: string;
  businessReportCertificateFileUrl: string;
  ceoId: string;
  ceoName: string;
  copyOfBankbookFileUrl: string;
  detailAddress: string;
  email: string;
  loginId: string;
  mainAddress: string;
  mobileNumber: string;
  password: string;
  phoneNumber: string;
  role: string;
  storeId: string;
  storeName: string;
  tableCount: 0;
  createAt: string;
}

function SigninList() {
  const dispatch = useAppDispatch();
  const [owners, setOwners] = useState<Owners[]>([]);
  useEffect(() => {
    ServerApi.get('/admin/joinInfos').then((res) => {
      setOwners(res.data);
    });
  }, []);
  const today = (date: string) => {
    const newDate = new Date(date);
    return `${String(newDate.getFullYear()).slice(-2)}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
  };
  // const today = `${String(date.getFullYear()).slice(-2)}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  const downloadHandler = async (url: string) => {
    documentDownloadApi(url);
  };

  return (
    <div>
      <div className="flex w-full text-lg py-2 items-center">
        <div className=" w-32 text-center">신청일</div>
        <div className=" flex-grow text-center">업체내용</div>
        <div className=" w-32 text-center">서류확인</div>
        <div className=" w-32 text-center">승인여부</div>
      </div>
      <div className="w-full border border-black"></div>
      {owners.map((owner) => {
        return (
          <div key={owner.storeId}>
            <div className="flex w-full items-center py-2">
              <div className=" w-32 text-center">{today(owner.createAt)}</div>
              <div className=" flex-grow ">
                <div>사업자등록번호: {owner.businessNumber}</div>
                <div>상호명: {owner.storeName}</div>
                <div>대표자명: {owner.ceoName}</div>
                <div>대표자 휴대폰번호: {owner.mobileNumber}</div>
                <div>업체 전화번호: {owner.phoneNumber}</div>
                <div>이메일: {owner.email}</div>
                <div>
                  주소: {owner.mainAddress}, {owner.detailAddress}
                </div>
                <div>은행: {owner.bank}</div>
                <div>계좌번호: {owner.accountNumber}</div>
              </div>
              <div className="w-32 text-center flex flex-col gap-2">
                <div className="w-full flex items-center justify-between">
                  <Link to={`/api/image/${owner.businessRegistrationFileUrl}`} target="_blank">
                    사업자등록증
                  </Link>
                  <button
                    className="material-symbols-outlined "
                    onClick={() => {
                      downloadHandler(owner.businessRegistrationFileUrl);
                    }}
                  >
                    download
                  </button>
                </div>
                <div className="w-full flex items-center justify-between">
                  <Link to={`/api/image/${owner.businessReportCertificateFileUrl}`} target="_blank">
                    영업신고증
                  </Link>
                  <button
                    className="material-symbols-outlined"
                    onClick={() => {
                      downloadHandler(owner.businessReportCertificateFileUrl);
                    }}
                  >
                    download
                  </button>
                </div>
                <div className="w-full flex items-center justify-between">
                  <Link to={`/api/image/${owner.copyOfBankbookFileUrl}`} target="_blank">
                    통장사본
                  </Link>
                  <button
                    className="material-symbols-outlined"
                    onClick={() => {
                      downloadHandler(owner.copyOfBankbookFileUrl);
                    }}
                  >
                    download
                  </button>
                </div>
              </div>
              <div className=" w-32 flex items-center justify-around">
                <button
                  className="bg-sky-500 rounded-lg px-2 py-1 text-white"
                  onClick={() => {
                    ServerApi.post(`/admin/approve/${owner.storeId}`).then(() => {
                      approvalSendEmail(owner.email, owner.ceoName);
                      dispatch(refuseSignup(owner.storeId));
                    });
                  }}
                >
                  승인
                </button>
                <button
                  className="bg-rose-500 rounded-lg px-2 py-1 text-white"
                  onClick={() => {
                    refuseSendEmail(owner.email, owner.ceoName);
                    dispatch(refuseSignup(owner.storeId));
                  }}
                >
                  거절
                </button>
              </div>
            </div>
            <div className="w-full border border-gray"></div>
          </div>
        );
      })}
    </div>
  );
}
export default SigninList;
