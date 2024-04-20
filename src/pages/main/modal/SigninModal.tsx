import { useState } from 'react';

import axios from 'axios';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

import { signupApi } from '@/util/api-util';
import { regenerateAddress } from '@/util/stringHelpers';

type ModalHandler = (name: string, value: boolean) => void;

interface SigninModalProps {
  modalHandler: ModalHandler;
}

export interface Files {
  businessReportCertificateFileName: string;
  businessRegistrationFileName: string;
  copyOfBankbookFileName: string;
  businessReportCertificateFile: File | null;
  businessRegistrationFile: File | null;
  copyOfBankbookFile: File | null;
}

export interface IsUserInform {
  isInputBusinessNumber: boolean;
  isClickBusinessNemberCertificatation: boolean;
  businessNumberCertification: boolean;
  isPassword: boolean;
  isPasswordCheck: boolean;
  isOwnerId: string;
}

function SigninModal({ modalHandler }: SigninModalProps) {
  const [files, setFiles] = useState<Files>({
    businessReportCertificateFileName: '',
    businessRegistrationFileName: '',
    copyOfBankbookFileName: '',
    businessReportCertificateFile: null,
    businessRegistrationFile: null,
    copyOfBankbookFile: null,
  });

  const [isUserInform, setIsUserInform] = useState({
    isInputBusinessNumber: false,
    isClickBusinessNemberCertificatation: false,
    businessNumberCertification: false,
    isPassword: false,
    isPasswordCheck: false,
    isOwnerId: 'disavailable',
  });

  const [userInform, setUserInform] = useState({
    businessNumber: '',
    ownerId: '',
    password: '',
    passwordCheck: '',
    businessName: '',
    representativeName: '',
    representativeCellPhoneNumber: '',
    storePhoneNumber: '',
    email: '',
    address: '',
    detailedAddress: '',
    bank: '',
    accountNumber: '',
  });

  const toggleModal = () => modalHandler('signinModalIsOpen', false);

  const signupApiHnadler = async () => {
    const res = await signupApi(userInform, isUserInform, files);
    if (res.status === 404) {
      alert('모든 양식을 입력해주세요');
      return;
    }

    await axios
      .post('/api/signup', {
        ceo: {
          name: userInform.representativeName,
          mobileNumber: userInform.representativeCellPhoneNumber,
          loginId: userInform.ownerId,
          password: userInform.password,
          bank: userInform.bank,
          accountNumber: userInform.accountNumber,
          email: userInform.email,
          businessReportCertificateFileUrl: res.businessReportCertificateFileUrl,
          businessRegistrationFileUrl: res.businessRegistrationFileUrl,
          copyOfBankbookFileUrl: res.copyOfBankbookFileUrl,
        },
        store: {
          name: userInform.businessName,
          phoneNumber: userInform.storePhoneNumber,
          mainAddress: userInform.address,
          detailAddress: userInform.detailedAddress,
          businessNumber: userInform.businessNumber,
        },
      })
      .then(() => {
        toggleModal();
        modalHandler('submittedModalIsOpen', true);
      })
      .catch(() => {
        alert('이미 등록된 사업자 등록번호 입니다.');
      });
  };

  const isOwnerIdAvailable = async () => {
    await axios.post('/api/available/ownerId', { ownerId: userInform.ownerId }).then((res) => {
      if (res.data === '이미 존재하는 아이디입니다.') {
        userIsInformChangeHandler(['isOwnerId'], ['already']);
      } else {
        userIsInformChangeHandler(['isOwnerId'], ['available']);
      }
    });
  };

  const fileChangeHandler = (files: { name: string; value: File | string }[]) => {
    files.map(({ name, value }) => {
      setFiles((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    });
  };
  const userIsInformChangeHandler = (names: string[], values: boolean[] | string[]) => {
    names.map((name, i) => {
      setIsUserInform((prevState) => ({
        ...prevState,
        [name]: values[i],
      }));
    });
  };

  const userInformChangeHandler = (names: string[], values: string[]) => {
    names.map((name, i) => {
      setUserInform((prevState) => ({
        ...prevState,
        [name]: values[i],
      }));
    });
  };

  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
  const handleComplete = async (data: Address) => {
    const res = regenerateAddress(data);
    userInformChangeHandler(['address'], [res]);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handlePassword = (value: string) => {
    if (userInform.passwordCheck === value || userInform.password === value) {
      userIsInformChangeHandler(['isPasswordCheck'], [true]);
    } else {
      userIsInformChangeHandler(['isPasswordCheck'], [false]);
    }
  };
  const passwordHandler = (value: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    userInformChangeHandler(['password'], [value]);
    userIsInformChangeHandler(['isPassword'], [regex.test(value)]);
    handlePassword(value);
  };
  const passwordCheckHandler = (value: string) => {
    userInformChangeHandler(['passwordCheck'], [value]);
    handlePassword(value);
  };
  const businessnumberCertifactionHandler = async () => {
    const res = await axios.post(
      'https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=8MJVXZ2lsT1rIlmXy46ALToKu1C%2Fh6wE4OTpvs1x42lWE03elodgLCCSYY%2B%2Fr61YAPhrF%2FmyPMqvEiaVlBwC%2FA%3D%3D',
      { b_no: [userInform.businessNumber] },
    );
    if (res.data.data[0].b_stt_cd === '01') {
      userIsInformChangeHandler(['businessNumberCertification'], [true]);
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
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2 outline-none focus:border-rose-500"
              placeholder="사업자등록번호"
              maxLength={10}
              value={userInform.businessNumber}
              onChange={(e) => {
                if (!isUserInform.isInputBusinessNumber) userIsInformChangeHandler(['isInputBusinessNumber'], [true]);
                if (isUserInform.isClickBusinessNemberCertificatation) {
                  userIsInformChangeHandler(['isClickBusinessNemberCertificatation'], [false]);
                }
                userInformChangeHandler(['businessNumber'], [e.target.value]);
              }}
              readOnly={isUserInform.businessNumberCertification}
            />
            <button
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-500 hover:border-rose-500 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                if (isUserInform.businessNumberCertification) {
                  userInformChangeHandler(['businessNumber'], ['']);
                  userIsInformChangeHandler(
                    ['isInputBusinessNumber', 'isClickBusinessNemberCertificatation', 'businessNumberCertification'],
                    [false, false, false],
                  );
                } else {
                  userIsInformChangeHandler(
                    ['isClickBusinessNemberCertificatation', 'isInputBusinessNumber'],
                    [true, false],
                  );
                  businessnumberCertifactionHandler();
                }
              }}
            >
              {isUserInform.businessNumberCertification ? '초기화' : '인증'}
            </button>
          </div>
          {isUserInform.isClickBusinessNemberCertificatation &&
            (isUserInform.businessNumberCertification ? (
              <div className=" text-xs text-blue-500 mt-1">사업자등록번호 인증이 완료되었습니다.</div>
            ) : (
              <div className="text-xs text-red-500 mt-1">유효하지 않은 사업자등록번호입니다.</div>
            ))}
          {isUserInform.isInputBusinessNumber &&
            (userInform.businessNumber.length > 0 && userInform.businessNumber.length < 10 ? (
              <div className="text-xs text-red-500 mt-1">형식에 맞게 입력해주세요.</div>
            ) : userInform.businessNumber.length === 0 ? (
              <div className="text-xs text-red-500 mt-1">필수 입력사항입니다.</div>
            ) : (
              ''
            ))}
          <div className="mt-2">아이디</div>
          <div className=" flex justify-center items-center">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2 outline-none focus:border-rose-500"
              placeholder="아이디"
              maxLength={10}
              value={userInform.ownerId}
              onChange={(e) => {
                userIsInformChangeHandler(['isOwnerId'], ['disavailable']);
                userInformChangeHandler(['ownerId'], [e.target.value]);
              }}
            />
            <button
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-500 hover:border-rose-500 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                isOwnerIdAvailable();
              }}
            >
              중복확인
            </button>
          </div>
          {isUserInform.isOwnerId === 'available' && (
            <div className="text-xs text-blue-500 mt-1">사용 가능한 아이디 입니다.</div>
          )}
          {isUserInform.isOwnerId === 'already' && (
            <div className="text-xs text-red-500 mt-1">이미 사용중인 아이디 입니다.</div>
          )}
          {isUserInform.isOwnerId === 'disavailable' && userInform.ownerId.length > 0 && (
            <div className="text-xs text-red-500 mt-1">중복확인을 해주세요.</div>
          )}
          <div className="mt-2">비밀번호</div>
          <input
            type="password"
            className="w-full border-2 rounded-lg h-10 px-2 outline-none focus:border-rose-500"
            placeholder="비밀번호"
            maxLength={16}
            autoComplete="false"
            value={userInform.password}
            onChange={(e) => passwordHandler(e.target.value)}
          />
          {!isUserInform.isPassword && userInform.password.length > 0 && (
            <div className="text-xs text-red-500 mt-1">
              비밀번호는 8자 이상, 16자 이하의 영문, 숫자 및 특수문자를 조합하여 사용해야 합니다.
            </div>
          )}
          <div className="mt-2">비밀번호 확인</div>
          <input
            type="password"
            className="w-full border-2 rounded-lg h-10 px-2 outline-none focus:border-rose-500"
            maxLength={16}
            autoComplete="false"
            placeholder="비밀번호 확인"
            value={userInform.passwordCheck}
            onChange={(e) => passwordCheckHandler(e.target.value)}
          />
          {!isUserInform.isPasswordCheck && userInform.passwordCheck.length > 0 && (
            <div className="text-xs text-red-500 mt-1">비밀번호가 일치하지 않습니다.</div>
          )}

          <div className=" font-bold mt-2">상호명</div>
          <input
            type="text"
            className="w-full border-2 rounded-lg h-10 px-2 outline-none focus:border-rose-500"
            placeholder="상호명"
            value={userInform.businessName}
            onChange={(e) => userInformChangeHandler(['businessName'], [e.target.value])}
          />
          <div className=" font-bold mt-2">대표자명</div>
          <input
            type="text"
            className="w-full border-2 rounded-lg h-10 px-2 outline-none  focus:border-rose-500"
            placeholder="대표자명"
            value={userInform.representativeName}
            onChange={(e) => userInformChangeHandler(['representativeName'], [e.target.value])}
          />
          <div className=" font-bold mt-2">대표자 휴대폰번호</div>
          <input
            type="number"
            className="w-full border-2 rounded-lg h-10 px-2 outline-none focus:border-rose-500"
            placeholder="대표자 휴대폰번호"
            value={userInform.representativeCellPhoneNumber}
            onChange={(e) => userInformChangeHandler(['representativeCellPhoneNumber'], [e.target.value])}
          />
          <div className=" font-bold mt-2">업체 전화번호</div>
          <input
            type="number"
            className="w-full border-2 rounded-lg h-10 px-2 outline-none focus:border-rose-500"
            placeholder="업체 전화번호"
            value={userInform.storePhoneNumber}
            onChange={(e) => userInformChangeHandler(['storePhoneNumber'], [e.target.value])}
          />
          <div className=" font-bold mt-2">이메일</div>
          <input
            type="email"
            className="w-full border-2 rounded-lg h-10 px-2 outline-none focus:border-rose-500"
            placeholder="이메일"
            value={userInform.email}
            onChange={(e) => userInformChangeHandler(['email'], [e.target.value])}
          />
          <div className=" font-bold mt-2">주소</div>
          <div className=" flex justify-center items-center ">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2 outline-none focus:border-rose-500"
              readOnly
              placeholder="주소검색 버튼을 누르세요"
              value={userInform.address}
            />
            <button
              type="button"
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-500 hover:border-rose-500 hover:text-white"
              onClick={handleClick}
            >
              주소검색
            </button>
          </div>
          <div className=" font-bold mt-2">상세주소</div>
          <input
            type="text"
            className="w-full border-2 rounded-lg h-10 px-2 outline-none focus:border-rose-500"
            placeholder="상세주소"
            value={userInform.detailedAddress}
            onChange={(e) => userInformChangeHandler(['detailedAddress'], [e.target.value])}
          />
          <div className="font-bold mt-2 w-full flex justify-center items-center">
            <div className="w-2/5 pr-4">
              <div>은행</div>
              <input
                type="text"
                className="w-full border-2 rounded-lg h-10 px-2 outline-none focus:border-rose-500"
                placeholder="은행"
                value={userInform.bank}
                onChange={(e) => userInformChangeHandler(['bank'], [e.target.value])}
              />
            </div>
            <div className="w-3/5">
              <div>계좌번호</div>
              <input
                type="number"
                className="w-full border-2 rounded-lg h-10 mr-2 px-2 outline-none focus:border-rose-500"
                value={userInform.accountNumber}
                onChange={(e) => userInformChangeHandler(['accountNumber'], [e.target.value])}
                placeholder="계좌번호"
              />
            </div>
          </div>
          <div className=" font-bold mt-2">사업자등록증</div>
          <div className=" flex justify-center items-center ">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2 outline-none focus:border-rose-500"
              readOnly
              placeholder="파일을 선택해주세요"
              value={files.businessRegistrationFileName}
            />
            <input
              type="file"
              accept=".pdf, .jpg, .png, image/*"
              className=" hidden"
              placeholder="파일을 선택해주세요"
              onChange={(e) => {
                if (e.target.files) {
                  fileChangeHandler([
                    { name: 'businessRegistrationFileName', value: e.target.files[0].name },
                    { name: 'businessRegistrationFile', value: e.target.files[0] },
                  ]);
                }
              }}
              id="businessRegistrationFile"
            />
            <label
              htmlFor="businessRegistrationFile"
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-500 hover:border-rose-500 hover:text-white flex justify-center items-center cursor-pointer"
            >
              파일선택
            </label>
          </div>
          <div className=" font-bold mt-2">영업신고증</div>
          <div className=" flex justify-center items-center ">
            <input
              type="text"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2 outline-none focus:border-rose-500"
              readOnly
              placeholder="파일을 선택해주세요"
              value={files.businessReportCertificateFileName}
            />
            <input
              type="file"
              accept=".pdf, .jpg, .png, image/*"
              className=" hidden"
              placeholder="파일을 선택해주세요"
              onChange={(e) => {
                if (e.target.files) {
                  fileChangeHandler([
                    { name: 'businessReportCertificateFileName', value: e.target.files[0].name },
                    { name: 'businessReportCertificateFile', value: e.target.files[0] },
                  ]);
                }
              }}
              id="businessReportCertificateFile"
            />
            <label
              htmlFor="businessReportCertificateFile"
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-500 hover:border-rose-500 hover:text-white flex justify-center items-center cursor-pointer"
            >
              파일선택
            </label>
          </div>
          <div className=" font-bold mt-2">통장사본</div>
          <div className=" flex justify-center items-center ">
            <input
              type="text"
              accept=".pdf, .jpg, .png, image/*"
              className="w-4/5 border-2 rounded-lg h-10 mr-2 px-2 outline-none focus:border-rose-500"
              readOnly
              placeholder="파일을 선택해주세요"
              value={files.copyOfBankbookFileName}
            />
            <input
              type="file"
              className=" hidden"
              placeholder="파일을 선택해주세요"
              onChange={(e) => {
                if (e.target.files) {
                  fileChangeHandler([
                    { name: 'copyOfBankbookFileName', value: e.target.files[0].name },
                    { name: 'copyOfBankbookFile', value: e.target.files[0] },
                  ]);
                }
              }}
              id="copyOfBankbookFile"
            />
            <label
              htmlFor="copyOfBankbookFile"
              className="w-1/5 border-2 rounded-lg h-10 hover:bg-rose-500 hover:border-rose-500 hover:text-white flex justify-center items-center cursor-pointer"
            >
              파일선택
            </label>
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              type="submit"
              className="w-full bg-rose-500 rounded-lg h-10 flex justify-center items-center text-white"
              onClick={(e) => {
                e.preventDefault();
                signupApiHnadler();
              }}
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
