import { useState } from 'react';
function Menu() {
  let topExposure = '대표메뉴';
  let topExporsureMenus = [
    {
      category: '샌드위치15cm 세트',
      name: '스파이시 이탈리안 (15cm세트)',
      description: '페퍼로니 & 살라미가 입안 가득, 페퍼로니의 부드러운 매콤함을 만나보세요.',
      price: 9500,
      img: './images/spicy_italian_15cm_set.png',
    },
    {
      category: '샌드위치15cm 세트',
      name: '치킨 베이컨 아보카도 (15cm세트)',
      description: '담백한 닭가슴살로 만든 치킨 슬라이스와 베이컨, 부드러운 아보카도의 만남',
      price: 10500,
      img: './images/chinken_bacon_avocado_15cm_set.png',
    },
    {
      category: '샌드위치15cm 단품',
      name: '이탈리안 비엠티 (15cm단품)',
      description: '',
      price: 6700,
      img: './images/italian_bmt_15cm.png',
    },
  ];
  let categorys = ['샌드위치15cm 세트', '샌드위치15cm 단품', '샌드위치30cm 세트', '샌드위치30cm 단품'];
  let menus = [
    {
      category: '샌드위치15cm 세트',
      name: '스파이시 이탈리안 (15cm세트)',
      description: '페퍼로니 & 살라미가 입안 가득, 페퍼로니의 부드러운 매콤함을 만나보세요.',
      price: 9500,
      img: './images/spicy_italian_15cm_set.png',
    },
    {
      category: '샌드위치15cm 세트',
      name: '치킨 베이컨 아보카도 (15cm세트)',
      description: '담백한 닭가슴살로 만든 치킨 슬라이스와 베이컨, 부드러운 아보카도의 만남',
      price: 10500,
      img: './images/chinken_bacon_avocado_15cm_set.png',
    },
    {
      category: '샌드위치15cm 단품',
      name: '이탈리안 비엠티 (15cm단품)',
      description: '',
      price: 6700,
      img: './images/italian_bmt_15cm.png',
    },
    {
      category: '샌드위치15cm 단품',
      name: '스테이크 & 치즈 (15cm단품)',
      description: '',
      price: 7900,
      img: './images/steak_&_cheese_15cm.png',
    },
    {
      category: '샌드위치15cm 단품',
      name: 'K-바비큐 (15cm단품)',
      description: '한국적인 바비큐의 맛으로 마늘, 간장 그리고 은은한 불맛까지 즐겨보세요',
      price: 7300,
      img: './images/k-barbecue_15cm.png',
    },
    {
      category: '샌드위치30cm 세트',
      name: '쉬림프 (30cm세트)',
      description: '탱글한 쉬림프 5마리가 그대로, 신선하고 담백한 쉬림프의 맛 그대로 즐겨보세요!',
      price: 16700,
      img: './images/shrimp_30cm_set.png',
    },
    {
      category: '샌드위치30cm 세트',
      name: '햄 (30cm세트)',
      description: '풍부한 햄이 만들어내는 담백함을 입 안 가득 즐겨보세요!',
      price: 13500,
      img: './images/ham_30cm_set.png',
    },
    {
      category: '샌드위치30cm 세트',
      name: '로스트 치킨 (30cm세트)',
      description: '오븐에 구워 담백한 닭 가슴살 치킨 패티로 맛과 영양 모두를 만족시키는 메뉴!',
      price: 16100,
      img: './images/roasted_chiken_30cm_set.png',
    },
    {
      category: '샌드위치30cm 단품',
      name: '치킨 데리야끼 (30cm단품)',
      description: '',
      price: 12900,
      img: './images/chicken_teriyaki_30cm.png',
    },
    {
      category: '샌드위치30cm 단품',
      name: '참치 (30cm단품)',
      description: '',
      price: 10900,
      img: './images/tuna_30cm.png',
    },
  ];
  const [selectCategory, setSelectCategory] = useState('대표메뉴');

  function scrollToElement(a: string) {
    let element = document.getElementById(a);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="w-full h-full">
      <header className="w-full flex items-center h-12 justify-center text-center">
        <div className="w-1/5 material-symbols-outlined ">search</div>
        <div className="w-3/5 font-bold ">서브웨이-고덕역점</div>
        <div className="w-1/5 material-symbols-outlined ">shopping_cart</div>
      </header>
      <div className="flex py-2  overflow-x-scroll overflow-hidden border-y scrollbar-hide">
        <button
          className={`${
            topExposure === selectCategory ? 'bg-rose-500 text-white' : ''
          } whitespace-nowrap rounded-full py-1 px-2 ml-2 text-sm`}
          onClick={() => {
            setSelectCategory(topExposure);
            scrollToElement(topExposure);
          }}
        >
          {topExposure}
        </button>
        {categorys.map((category, i) => {
          return (
            <button
              className={`${
                category === selectCategory ? 'bg-rose-500 text-white' : ''
              } whitespace-nowrap rounded-full py-1 px-2 ml-2 text-sm`}
              onClick={() => {
                setSelectCategory(category);
                scrollToElement(category);
              }}
              key={i}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div className=" overflow-y-scroll overflow-hidden" style={{ height: `calc(100% - 96px)` }}>
        <div className="p-4  bg-gray-300">
          <div className="font-bold" id={topExposure}>
            {topExposure}
          </div>
          <div className="flex gap-2  overflow-x-scroll pt-4 border-t scrollbar-hide">
            {topExporsureMenus.map((menu, i) => {
              return (
                <div className="w-[128px] whitespace-nowrap rounded-lg bg-white p-2">
                  <div
                    style={{
                      backgroundImage: `url(${menu.img})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                    }}
                    className="w-[112px] h-[80px] rounded-lg"
                  ></div>
                  <div className="text-sm font-bold overflow-hidden text-ellipsis mt-2">{menu.name}</div>
                  <div className="text-sm">
                    <span>{menu.price.toLocaleString()}</span>
                    <span>원</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {categorys.map((category, i) => {
          return (
            <div className="pt-4 px-4 border-b-8" key={i}>
              <div className="font-bold" id={category}>
                {category}
              </div>
              {menus
                .filter((menu) => menu.category === category)
                .map((menu, i) => {
                  return (
                    <div className="w-full flex justify-center items-center py-4 border-t" key={i}>
                      <div className="w-full mr-2">
                        <div>{menu.name}</div>
                        <div className="text-xs text-gray-500">{menu.description}</div>
                        <div className="text-sm">
                          <span className="font-bold">{menu.price.toLocaleString()}</span>
                          <span>원</span>
                        </div>
                      </div>
                      <div className=" whitespace-nowrap">
                        <div
                          style={{
                            backgroundImage: `url(${menu.img})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                          }}
                          className="w-[112px] h-[80px] rounded-lg border"
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
