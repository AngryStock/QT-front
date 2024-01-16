function SigninList() {
  let date = new Date();
  let today = `${String(date.getFullYear()).slice(-2)}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  return (
    <div>
      <div className="flex w-full text-lg py-2 items-center">
        <div className=" w-32 text-center">신청일</div>
        <div className=" flex-grow text-center">업체내용</div>
        <div className=" w-32 text-center">서류확인</div>
        <div className=" w-32 text-center">승인여부</div>
      </div>
      <div className="w-full border border-black"></div>
      {[1, 2, 3].map((a) => {
        return (
          <div>
            <div className="flex w-full items-center py-2">
              <div className=" w-32 text-center">{today}</div>
              <div className=" flex-grow ">
                <div>사업자등록번호:</div>
                <div>상호명:</div>
                <div>대표자명:</div>
                <div>대표자 휴대폰번호:</div>
                <div>업체 전화번호:</div>
                <div>이메일:</div>
                <div>주소:</div>
                <div>은행:</div>
                <div>계좌번호:</div>
              </div>
              <div className="w-32 text-center">
                <div>사업자등록증</div>
                <div>영업신고증</div>
                <div>통장사본</div>
              </div>
              <div className=" w-32 flex items-center justify-around">
                <button className="bg-sky-500 rounded-lg px-2 py-1 text-white">승인</button>
                <button className="bg-rose-500 rounded-lg px-2 py-1 text-white">거절</button>
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
