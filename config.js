/* OUR WEDDING 설정
 * supabaseKey 는 브라우저용 공개 키(publishable)라 사이트에 들어가도 괜찮다.
 *   (가계부 데이터는 데이터베이스 접근 규칙으로 본인·상대방만 읽고 쓸 수 있음)
 * 카카오·구글 로그인 버튼은 Supabase 에서 켜면 저절로 나타난다.
 * 네이버는 Supabase 기본 지원이 없어 별도 함수(naver-login)를 올린 뒤 true 로 바꾼다.
 */
window.OW_CONF = {
  supabaseUrl: "https://bgcvkriygfeclidzvlfc.supabase.co",
  supabaseKey: "sb_publishable_oqAUnDiXPGAafHvB19scWA_6NCFm1pH",
  naver: false
};
