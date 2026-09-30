/* OUR WEDDING 평균 데이터
 * 숫자를 고칠 때는 이 파일만 고치면 된다. 단위는 모두 만원.
 *
 * [소비자원] 한국소비자원 참가격 결혼서비스 통계, 2026년 8월 기준
 *   https://www.price.go.kr/tprice/portal/wedding/areaStatistic.do
 *   - regions: 지역별 결혼서비스 "평균" 계약 금액 (식대·대관료·기본장식·스드메, 옵션 제외)
 *   - zones / options / months: "중간값"
 * [듀오] 듀오 2026 결혼비용 보고서 (최근 2년 내 결혼한 1,000명, 2025.11 조사, 2026.3 발표)
 *   https://www.thepublic.kr/news/articleView.html?idxno=295704
 *   ※ 기사 첫 목록은 신혼여행 763·예단 1,030으로 적혀 있으나, 같은 기사 뒤쪽에
 *     "신혼여행 비용은 1030만 원으로 전년(965만 원) 대비 6.7% 상승"이라고 명시 → 신혼여행 1,030 / 예단 763 으로 씀.
 */
window.OW = {
  asOf: { kca: "2026년 8월", duo: "2026년 발표" },
  sources: {
    kca: { name: "한국소비자원 참가격", url: "https://www.price.go.kr/tprice/portal/wedding/areaStatistic.do" },
    duo: { name: "듀오 2026 결혼비용 보고서", url: "https://www.thepublic.kr/news/articleView.html?idxno=295704" }
  },

  // 지역별 예식장·스드메 평균 계약 금액 [소비자원]. zone = 아래 zones 의 권역, house = 듀오 신혼집 권역
  regions: [
    { id: "all",   name: "전국",        meal: 1358.2, rental: 462.9, deco: 77.1, sdm: 314.6, zone: "all",   house: "all" },
    { id: "gn",    name: "서울 강남",   meal: 2048.3, rental: 757.8, deco: 226.0, sdm: 387.2, zone: "seoul", house: "seoul" },
    { id: "seoul", name: "서울 강남 외", meal: 1775.8, rental: 729.5, deco: 132.6, sdm: 516.3, zone: "seoul", house: "seoul" },
    { id: "gg",    name: "경기",        meal: 1296.7, rental: 411.8, deco: 45.5, sdm: 256.3, zone: "gi",    house: "metro" },
    { id: "ic",    name: "인천",        meal: 1034.8, rental: 248.5, deco: 18.5, sdm: 222.9, zone: "gi",    house: "metro" },
    { id: "bs",    name: "부산",        meal: 761.2, rental: 193.5, deco: 0, sdm: 269.5, zone: "city",  house: "yn" },
    { id: "dg",    name: "대구",        meal: 1061.5, rental: 217.7, deco: 45.1, sdm: 271.6, zone: "city",  house: "yn" },
    { id: "us",    name: "울산",        meal: 1053.3, rental: 375.8, deco: 10.1, sdm: 221.4, zone: "city",  house: "yn" },
    { id: "dj",    name: "대전",        meal: 1061.5, rental: 304.1, deco: 58.7, sdm: 281.4, zone: "city",  house: "cc" },
    { id: "gj",    name: "광주·전남",   meal: 1060.5, rental: 241.0, deco: 1.2, sdm: 323.9, zone: "city",  house: "hn" },
    { id: "gw",    name: "강원",        meal: 1209.6, rental: 329.3, deco: 30.1, sdm: 231.4, zone: "etc",   house: "gw" },
    { id: "cc",    name: "충청",        meal: 1023.3, rental: 370.1, deco: 12.4, sdm: 281.1, zone: "etc",   house: "cc" },
    { id: "jb",    name: "전북",        meal: 1130.0, rental: 323.3, deco: 22.0, sdm: 331.7, zone: "etc",   house: "hn" },
    { id: "gs",    name: "경상",        meal: 820.5, rental: 271.1, deco: 0.5, sdm: 236.9, zone: "etc",   house: "yn" },
    { id: "jj",    name: "제주",        meal: 1430.5, rental: 146.5, deco: 47.5, sdm: 144.2, zone: "etc",   house: "all" }
  ],

  // 예식장 말고 전국 평균만 있는 항목 [듀오]
  national: [
    { id: "honsu",  name: "혼수",     sub: "가전·가구",           v: 1445 },
    { id: "trip",   name: "신혼여행", sub: "",                    v: 1030 },
    { id: "yedan",  name: "예단",     sub: "신랑 쪽 가족에게 보내는 예물·현금", v: 763 },
    { id: "yemul",  name: "예물",     sub: "반지·시계 등",         v: 588 },
    { id: "ibaji",  name: "이바지",   sub: "신부 쪽에서 보내는 음식", v: 155 }
  ],

  // 신혼집 마련 비용 [듀오] 권역별
  house: { all: 32201, seoul: 38464, metro: 32158, yn: 28369, hn: 25418, cc: 29399, gw: 22233 },
  houseName: { all: "전국", seoul: "서울", metro: "수도권", yn: "영남", hn: "호남", cc: "충청", gw: "강원" },

  // 권역별 예식장·스드메 중간값 [소비자원]
  zones: {
    all:   { name: "전국",               rental: 350, meal: 1180, perMeal: 6.0, minGuest: 200, sdm: 298 },
    seoul: { name: "서울",               rental: 630, meal: 1625, perMeal: 8.0, minGuest: 200, sdm: 350 },
    gi:    { name: "경인",               rental: 300, meal: 1122, perMeal: 6.2, minGuest: 200, sdm: 220 },
    city:  { name: "광역시·통합특별시", rental: 250, meal: 900,  perMeal: 5.3, minGuest: 150, sdm: 280 },
    etc:   { name: "그 밖의 지역",       rental: 300, meal: 975,  perMeal: 5.0, minGuest: 200, sdm: 300 }
  },

  // 예식장 선택 품목 중간값 [소비자원] 순서: 전국, 서울, 경인, 광역시, 그 밖
  options: [
    ["생화 꽃장식", 256, 500, 193, 150, 125],
    ["본식 촬영", 76, 85, 70, 66, 65],
    ["본식 원판 사진", 50, 50, 51, 50, 49],
    ["축주비", 40, 43, 40, 30, 30],
    ["웨딩케이크", 38, 44, 20, 30, 20],
    ["포토테이블", 37, 37, 23, 37, 37],
    ["본식 사회자", 30, 33, 26, 30, 30],
    ["본식 도우미", 30, 30, 30, 35, 25],
    ["폐백 음식", 30, 36, 34, 17, 28],
    ["한복 대여", 28, 33, 25, 30, 27],
    ["축가·축하공연", 25, 30, 25, 24, 25],
    ["부케", 25, 29, 25, 19, 24],
    ["주례비", 16, 20, 17, 15, 16],
    ["혼주 헤어·메이크업", 15, 17, 18, 14, 14],
    ["본식 드레스 도우미", 15, 34, 16, 15, 15],
    ["플라워 샤워", 14, 22, 12, 10, 10],
    ["폐백 수모비", 10, 15, 15, 10, 10]
  ],
  zoneOrder: ["all", "seoul", "gi", "city", "etc"],

  // 예식 달별 결혼식장·스드메 계약 중간값 [소비자원] (2026년 8월까지 누적 계약 기준)
  months: [
    ["2026-10", 1520, 294], ["2026-11", 1500, 300], ["2026-12", 1500, 300],
    ["2027-01", 1400, 300], ["2027-02", 1400, 300], ["2027-03", 1580, 300],
    ["2027-04", 1620, 300], ["2027-05", 1575, 300], ["2027-06", 1550, 300],
    ["2027-07", 1418, 300], ["2027-08", 1400, 300], ["2027-09", 1575, 300],
    ["2027-10", 1550, 300], ["2027-11", 1650, 300], ["2027-12", 1650, 300]
  ]
};
