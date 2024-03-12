import emailjs from 'emailjs-com';

export const approvalSendEmail = (to_email: string, to_name: string) => {
  const templateParams = {
    to_email,
    to_name,
    subject_message: 'QT 서비스 사용에 승인되었습니다.',
    message: 'QT 서비스 사용에 승인되었습니다.',
  };

  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )
    .then(
      (res) => {
        console.log('success', res);
      },
      (err) => {
        console.error('error', err);
      },
    );
};
export const refuseSendEmail = (to_email: string, to_name: string) => {
  const templateParams = {
    to_email,
    to_name,
    subject_message: 'QT 서비스 사용에 거부되었습니다.',
    message: 'QT 서비스 사용에 거부되었습니다.',
  };

  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )
    .then(
      (res) => {
        console.log('success', res);
      },
      (err) => {
        console.error('error', err);
      },
    );
};
