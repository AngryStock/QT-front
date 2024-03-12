import axios from 'axios';

import { Files, IsUserInform } from '@/pages/main/modal/SigninModal';
import { Owner } from '@/store/reducers/ownersSlice';

export const signupApi = async (userInform: Owner, isUserInform: IsUserInform, files: Files) => {
  const {
    isInputBusinessNumber,
    isClickBusinessNemberCertificatation,
    businessNumberCertification,
    isPassword,
    isPasswordCheck,
    isOwnerId,
  } = isUserInform;
  const { businessReportCertificateFile, businessRegistrationFile, copyOfBankbookFile } = files;
  const {
    businessNumber,
    ownerId,
    password,
    passwordCheck,
    businessName,
    representativeName,
    representativeCellPhoneNumber,
    storePhoneNumber,
    email,
    address,
    detailedAddress,
    bank,
    accountNumber,
  } = userInform;

  if (
    isInputBusinessNumber ||
    !isClickBusinessNemberCertificatation ||
    !businessNumberCertification ||
    !isPassword ||
    !isPasswordCheck ||
    isOwnerId !== 'available' ||
    !businessReportCertificateFile ||
    !businessRegistrationFile ||
    !copyOfBankbookFile ||
    businessNumber === '' ||
    ownerId === '' ||
    password === '' ||
    passwordCheck === '' ||
    businessName === '' ||
    representativeName === '' ||
    representativeCellPhoneNumber === '' ||
    storePhoneNumber === '' ||
    email === '' ||
    address === '' ||
    detailedAddress === '' ||
    bank === '' ||
    accountNumber === ''
  ) {
    return { status: 404 };
  }
  const formData = new FormData();
  formData.append('businessNumberCertificateFile', businessReportCertificateFile);
  formData.append('businessRegistrationFile', businessRegistrationFile);
  formData.append('copyOfBankbookFile', copyOfBankbookFile);
  const res = await axios.post('/api/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const documentDownloadApi = async (url: string) => {
  try {
    const response = await axios({
      url: `/api/image/${url}`, // 파일 URL
      method: 'GET',
      responseType: 'blob', // 서버로부터 받은 데이터가 Blob 형태임을 명시
    });

    // Blob 데이터로부터 다운로드 가능한 URL 생성
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', url); // 파일명 지정 (확장자 포함)
    document.body.appendChild(link);
    link.click();

    // 생성한 URL과 링크 요소 정리
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download error:', error);
  }
};
