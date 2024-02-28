function CustomerInquiry() {
  const date = new Date();
  const today = `${String(date.getFullYear()).slice(-2)}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  return (
    <div>
      <div className="flex w-full text-lg py-2 items-center">
        <div className=" w-32 text-center">문의일</div>
        <div className="  flex-grow text-center">내용</div>
        <div className="  w-32 text-center">이름</div>
        <div className="  w-32 text-center">번호</div>
      </div>
      <div className="w-full border border-black"></div>
      {[1, 2, 3].map(() => {
        return (
          <div>
            <div className="flex w-full py-2 items-center">
              <div className=" w-32 text-center">{today}</div>
              <div className="  flex-grow text-center">제품의 사진을 변경하고 싶습니다.</div>
              <div className="  w-32 text-center">양희일</div>
              <div className="  w-32 text-center">01012341234</div>
            </div>
            <div className="w-full border border-gray"></div>
          </div>
        );
      })}
    </div>
  );
}

export default CustomerInquiry;
