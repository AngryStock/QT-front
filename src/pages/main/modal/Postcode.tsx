import DaumPostcode from 'react-daum-postcode';

const Postcode = (props: any) => {
  const complete = (data: any) => {
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
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    props.setcompany({
      ...props.company,
      address: fullAddress,
    });
  };

  return (
    <div className="w-full h-full z-50">
      <DaumPostcode className="postmodal" autoClose onComplete={complete} />
    </div>
  );
};

export default Postcode;
