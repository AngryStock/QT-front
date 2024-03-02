import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import axios from 'axios';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

interface SigninModalProps {
  signinModalIsOpen: boolean;
  setSigninModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

function SigninModal({ setSigninModalIsOpen, signinModalIsOpen }: SigninModalProps) {
  const [isInputBusinessNumber, setIsInputBusinessNumber] = useState(false);
  const [isClickBusinessNemberCertificatation, setIsClickBusinessNemberCertificatation] = useState(false);
  const [businessNumber, setbusinessNumber] = useState('');
  const [businessNumberCertification, setBusinessNumberCertification] = useState(false);
  const [ownerId, setOwnerId] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [representativeCellPhoneNumber, setRepresentativeCellPhoneNumber] = useState('');
  const [storePhoneNumber, setStorePhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [businessNumberCertificateFileName, setBusinessNumberCertificateFileName] = useState('');
  const [businessNumberCertificateFile, setBusinessNumberCertificateFile] = useState<File | null>(null);
  const [businessRegistrationFileName, setBusinessRegistrationFileName] = useState('');
  const [businessRegistrationFile, setBusinessRegistrationFile] = useState<File | null>(null);
  const [copyOfBankbookFileName, setCopyOfBankbookFileName] = useState('');
  const [copyOfbankbookfile, setCopyOfBankbookFile] = useState<File | null>(null);

  const copyOfBankbookChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCopyOfBankbookFile(e.target.files[0]);
      setCopyOfBankbookFileName(e.target.files[0].name);
    }
  };

  const businessRegistrationChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);
      setBusinessRegistrationFile(e.target.files[0]);
      setBusinessRegistrationFileName(e.target.files[0].name);
    }
  };

  const businessReportCertificateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);
      setBusinessNumberCertificateFile(e.target.files[0]);
      setBusinessNumberCertificateFileName(e.target.files[0].name);
    }
  };
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(fullAddress);
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handlePassword = (value: string) => {
    if (passwordCheck === value || password === value) {
      setIsPasswordCheck(true);
    } else {
      setIsPasswordCheck(false);
    }
  };
  const passwordHandler = (value: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    setPassword(value);
    setIsPassword(regex.test(value));
    handlePassword(value);
  };
  const passwordCheckHandler = (value: string) => {
    setPasswordCheck(value);
    handlePassword(value);
  };
  const toggleModal = () => setSigninModalIsOpen(!signinModalIsOpen);
  const businessnumberCertifactionHandler = async () => {
    const res = await axios.post(
      'https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=8MJVXZ2lsT1rIlmXy46ALToKu1C%2Fh6wE4OTpvs1x42lWE03elodgLCCSYY%2B%2Fr61YAPhrF%2FmyPMqvEiaVlBwC%2FA%3D%3D',
      { b_no: [businessNumber] },
    );
    if (res.data.data[0].b_stt_cd === '01') {
      setBusinessNumberCertification(true);
    }
  };

  return (
    <div className="absolute w-full h-full p-[72px] z-20 flex justify-center items-center">
      <div className="w-full h-full absolute" onClick={toggleModal}></div>
      <div className="w-1/2 h-full overflow-y-scroll scrollbar-hide bg-white rounded-lg min-w-80 min-h-[500px] max-w-[512px] z-10 p-4 font-bold relative">
        <div className="w-full text-right">
          <button className="material-symbols-outlined cursor-pointer" onClick={toggleModal}>
            close
          </button>
        </div>
        <div className=" font-bold mt-2 text-center">업체등록</div>
        <form>
          <div className="mt-2">사업자등록번호</div>
          <div className=" flex justify-center items-center">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2"
              placeholder="사업자등록번호"
              maxLength={10}
              value={businessNumber}
              onChange={(e) => {
                if (!isInputBusinessNumber) setIsInputBusinessNumber(true);
                if (isClickBusinessNemberCertificatation) setIsClickBusinessNemberCertificatation(false);
                setbusinessNumber(e.target.value);
              }}
              readOnly={businessNumberCertification}
            />
            <button
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-300 hover:border-rose-300 hover:text-white"
              onClick={() => {
                if (businessNumberCertification) {
                  setIsInputBusinessNumber(false);
                  setIsClickBusinessNemberCertificatation(false);
                  setbusinessNumber('');
                  setBusinessNumberCertification(false);
                } else {
                  setIsClickBusinessNemberCertificatation(true);
                  setIsInputBusinessNumber(false);
                  businessnumberCertifactionHandler();
                }
              }}
            >
              {businessNumberCertification ? '초기화' : '인증'}
            </button>
          </div>
          {isClickBusinessNemberCertificatation &&
            (businessNumberCertification ? (
              <div className=" text-xs text-blue-500 mt-1">사업자등록번호 인증이 완료되었습니다.</div>
            ) : (
              <div className="text-xs text-red-500 mt-1">유효하지 않은 사업자등록번호입니다.</div>
            ))}
          {isInputBusinessNumber &&
            (businessNumber.length > 0 && businessNumber.length < 10 ? (
              <div className="text-xs text-red-500 mt-1">형식에 맞게 입력해주세요.</div>
            ) : businessNumber.length === 0 ? (
              <div className="text-xs text-red-500 mt-1">필수 입력사항입니다.</div>
            ) : (
              ''
            ))}
          <div className="mt-2">아이디</div>
          <div className=" flex justify-center items-center">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2"
              placeholder="아이디"
              maxLength={10}
              value={ownerId}
              onChange={(e) => {
                setOwnerId(e.target.value);
              }}
              readOnly={businessNumberCertification}
            />
            <button
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-300 hover:border-rose-300 hover:text-white"
              onClick={() => {}}
            >
              중복확인
            </button>
          </div>
          <div className="mt-2">비밀번호</div>
          <input
            type="password"
            className="w-full border-2 rounded-lg h-10 px-2"
            placeholder="비밀번호"
            maxLength={16}
            autoComplete="false"
            value={password}
            onChange={(e) => passwordHandler(e.target.value)}
          />
          {!isPassword && password.length > 0 && (
            <div className="text-xs text-red-500 mt-1">
              비밀번호는 8자 이상, 16자 이하의 영문, 숫자 및 특수문자를 조합하여 사용해야 합니다.
            </div>
          )}
          <div className="mt-2">비밀번호 확인</div>
          <input
            type="password"
            className="w-full border-2 rounded-lg h-10 px-2"
            maxLength={16}
            autoComplete="false"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => passwordCheckHandler(e.target.value)}
          />
          {!isPasswordCheck && passwordCheck.length > 0 && (
            <div className="text-xs text-red-500 mt-1">비밀번호가 일치하지 않습니다.</div>
          )}

          <div className=" font-bold mt-2">상호명</div>
          <input
            type="text"
            className="w-full border-2 rounded-lg h-10 px-2"
            placeholder="상호명"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <div className=" font-bold mt-2">대표자명</div>
          <input
            type="text"
            className="w-full border-2 rounded-lg h-10 px-2"
            placeholder="대표자명"
            value={representativeName}
            onChange={(e) => setRepresentativeName(e.target.value)}
          />
          <div className=" font-bold mt-2">대표자 휴대폰번호</div>
          <input
            type="number"
            className="w-full border-2 rounded-lg h-10 px-2"
            placeholder="대표자 휴대폰번호"
            value={representativeCellPhoneNumber}
            onChange={(e) => setRepresentativeCellPhoneNumber(e.target.value)}
          />
          <div className=" font-bold mt-2">업체 전화번호</div>
          <input
            type="number"
            className="w-full border-2 rounded-lg h-10 px-2"
            placeholder="업체 전화번호"
            value={storePhoneNumber}
            onChange={(e) => setStorePhoneNumber(e.target.value)}
          />
          <div className=" font-bold mt-2">이메일</div>
          <input
            type="email"
            className="w-full border-2 rounded-lg h-10 px-2"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className=" font-bold mt-2">주소</div>
          <div className=" flex justify-center items-center ">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2"
              readOnly
              placeholder="주소검색 버튼을 누르세요"
              value={address}
            />
            <button
              type="button"
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-300 hover:border-rose-300 hover:text-white"
              onClick={handleClick}
            >
              주소검색
            </button>
          </div>
          <div className=" font-bold mt-2">상세주소</div>
          <input
            type="text"
            className="w-full border-2 rounded-lg h-10 px-2"
            placeholder="상세주소"
            value={detailedAddress}
            onChange={(e) => setDetailedAddress(e.target.value)}
          />
          <div className="font-bold mt-2 w-full flex justify-center items-center">
            <div className="w-2/5 pr-4">
              <div>은행</div>
              <input
                type="text"
                className="w-full border-2 rounded-lg h-10 px-2"
                placeholder="은행"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
              />
            </div>
            <div className="w-3/5">
              <div>계좌번호</div>
              <input
                type="number"
                className="w-full border-2 rounded-lg h-10 mr-2 px-2"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="계좌번호"
              />
            </div>
          </div>
          <div className=" font-bold mt-2">사업자등록증</div>
          <div className=" flex justify-center items-center ">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2"
              readOnly
              placeholder="파일을 선택해주세요"
              value={businessRegistrationFileName}
            />
            <input
              type="file"
              className=" hidden"
              placeholder="파일을 선택해주세요"
              onChange={businessRegistrationChangeHandler}
              id="businessRegistrationFile"
            />
            <label
              htmlFor="businessRegistrationFile"
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-300 hover:border-rose-300 hover:text-white flex justify-center items-center cursor-pointer"
            >
              파일선택
            </label>
          </div>
          <div className=" font-bold mt-2">영업신고증</div>
          <div className=" flex justify-center items-center ">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2"
              readOnly
              placeholder="파일을 선택해주세요"
              value={businessNumberCertificateFileName}
            />
            <input
              type="file"
              className=" hidden"
              placeholder="파일을 선택해주세요"
              onChange={businessReportCertificateChangeHandler}
              id="businessReportCertificateFile"
            />
            <label
              htmlFor="businessReportCertificateFile"
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-300 hover:border-rose-300 hover:text-white flex justify-center items-center cursor-pointer"
            >
              파일선택
            </label>
          </div>
          <div className=" font-bold mt-2">통장사본</div>
          <div className=" flex justify-center items-center ">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2"
              readOnly
              placeholder="파일을 선택해주세요"
              value={copyOfBankbookFileName}
            />
            <input
              type="file"
              className=" hidden"
              placeholder="파일을 선택해주세요"
              onChange={copyOfBankbookChangeHandler}
              id="copyOfBankbookFile"
            />
            <label
              htmlFor="copyOfBankbookFile"
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-300 hover:border-rose-300 hover:text-white flex justify-center items-center cursor-pointer"
            >
              파일선택
            </label>
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              type="submit"
              className="w-full bg-rose-500 rounded-lg h-10 flex justify-center items-center text-white"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninModal;
