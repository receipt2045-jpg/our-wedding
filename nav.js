/* OUR WEDDING 공통 메뉴 — 모든 페이지 같은 탭 5개 (PC는 위, 폰은 아래)
 * 쓰는 법: <div id="ownav" data-tab="home"></div><script src="nav.js"></script>  (data-me="1"이면 로그인 버튼 자리)
 * 같이 하는 일: 최근 본 것·저장한 것 기록 (이 브라우저에만) → mine.html 에서 모아 봄
 */
(function () {
  const I = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
    won: '<circle cx="12" cy="12" r="9"/><path d="M7.5 9l1.6 6 2.9-6 2.9 6 1.6-6"/><path d="M6.5 11.3h11"/>',
    check: '<rect x="4" y="3.5" width="16" height="17"/><path d="m8 9 1.6 1.6L13 7.2"/><path d="M8 15h8"/>',
    hall: '<path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9.5 21v-5.5a2.5 2.5 0 0 1 5 0V21"/>',
    book: '<path d="M4 4.5h6a2 2 0 0 1 2 2V20a1.6 1.6 0 0 0-1.6-1.6H4z"/><path d="M20 4.5h-6a2 2 0 0 0-2 2V20a1.6 1.6 0 0 1 1.6-1.6H20z"/>',
    wallet: '<rect x="3" y="6" width="18" height="14"/><path d="M3 10h18"/><path d="M16 14.5h2"/><path d="M6 6V4h12v2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    heart: '<path d="M12 20.5s-7.5-4.6-9.4-9.2C1.2 7.9 3.3 4.5 6.8 4.5c2 0 3.5 1.1 4.2 2.4h2c.7-1.3 2.2-2.4 4.2-2.4 3.5 0 5.6 3.4 4.2 6.8-1.9 4.6-9.4 9.2-9.4 9.2z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    right: '<path d="m9 6 6 6-6 6"/>', left: '<path d="m15 6-6 6 6 6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.4 3.4-5 6.5-5s5.5 1.6 6.5 5"/><circle cx="17" cy="9" r="2.8"/><path d="M17.5 14.5c2.2.3 3.6 1.8 4.2 4.5"/>',
    utensils: '<path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3"/><path d="M7 11v10"/><path d="M17 3c-2 1-3 3.5-3 6.5V13h3v8"/>',
    alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4"/><path d="M12 17.2v.3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    calc: '<rect x="5" y="3" width="14" height="18"/><path d="M8 7h8"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>',
    ring: '<circle cx="12" cy="14" r="6"/><path d="m9 6 3-3 3 3-3 2z"/>',
    gift: '<rect x="3.5" y="8" width="17" height="4"/><path d="M5 12v9h14v-9"/><path d="M12 8v13"/><path d="M12 8c-1.5-3-5-3.5-5-1.5S10 8 12 8zM12 8c1.5-3 5-3.5 5-1.5S14 8 12 8z"/>',
    sofa: '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M3 11h18v6H3z"/><path d="M5 17v2M19 17v2"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13.5" r="3.5"/>',
    mic: '<rect x="9" y="3" width="6" height="11"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21"/>',
    hanbok: '<path d="M8 3h8l3 6-4 2v10H9V11L5 9z"/>',
    start: '<path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/>',
    mail: '<rect x="3" y="5" width="18" height="14"/><path d="m3 6 9 7 9-7"/>',
    chat: '<path d="M4 4h16v12H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    plane: '<path d="M2.5 13.5 21 6l-4.5 14-4-6.5z"/><path d="m12.5 13.5 4-4"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 14h10l1-14"/>',
  };
  const ic = (n, cls) => `<svg class="owi ${cls || ""}" viewBox="0 0 24 24" aria-hidden="true">${I[n] || I.book}</svg>`;
  const TABS = [["home", "홈", "./"], ["won", "결혼 비용", "cost.html"], ["hall", "웨딩홀", "halls.html"], ["book", "가이드", "board.html"], ["user", "내 것", "mine.html"]];
  const KEY = { home: "home", cost: "won", halls: "hall", guide: "book", mine: "user" };

  const css = `
.owi{fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.ownav{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid #EEEEEE}
.ownav .in{max-width:1160px;margin:0 auto;padding:0 16px;height:58px;display:flex;align-items:center;gap:18px}
.ownav .lg{display:flex;align-items:center;gap:8px;font-weight:900;font-size:16px;letter-spacing:.05em;text-decoration:none;color:#1C1F26;white-space:nowrap}
.ownav .lg i{width:20px;height:20px;background:#FFF0A6;border:1px solid #F1DC6E;display:inline-block}
.ownav .tb{display:flex;height:100%;flex:1}
.ownav .tb a{position:relative;display:flex;align-items:center;gap:7px;padding:0 13px;font-size:15px;font-weight:700;color:#8B909B;text-decoration:none;white-space:nowrap}
.ownav .tb a svg{width:20px;height:20px}
.ownav .tb a:hover{color:#1C1F26}
.ownav .tb a.on{color:#1C1F26}
.ownav .tb a.on::after{content:"";position:absolute;left:10px;right:10px;bottom:-1px;height:3px;background:#D9B300}
.ownav form{display:flex;align-items:center;gap:7px;border:1px solid #EEEEEE;padding:0 10px;height:38px;width:210px;color:#8B909B}
.ownav form svg{width:17px;height:17px;flex:0 0 auto}
.ownav form input{border:0;outline:0;font:inherit;font-size:14px;width:100%;background:none;color:#1C1F26}
.ownav .rt{display:flex;align-items:center;gap:6px;margin-left:auto}
.ownav .rt>button,.ownav .rt>span>button{font:inherit;font-size:13px;color:#4F5563;border:1px solid #EEEEEE;background:#fff;padding:7px 10px;white-space:nowrap;cursor:pointer}
.ownav .cta{background:#FFF0A6;border:1px solid #D9B300;color:#3A3200;font-weight:800;font-size:14px;padding:8px 13px;text-decoration:none;white-space:nowrap;display:flex;align-items:center;gap:6px}
.ownav .cta svg{width:17px;height:17px}
.owbar{display:none}
@media (max-width:1080px){.ownav form{display:none}}
@media (max-width:860px){
  .ownav .tb{display:none}
  .ownav .in{height:54px}
  .owbar{display:grid;grid-template-columns:repeat(5,1fr);position:fixed;left:0;right:0;bottom:0;z-index:30;background:#fff;border-top:1px solid #E6E6E6;height:calc(60px + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom)}
  .owbar a{position:relative;display:grid;justify-items:center;align-content:center;gap:3px;font-size:11px;color:#8B909B;text-decoration:none}
  .owbar a svg{width:23px;height:23px}
  .owbar a.on{color:#1C1F26;font-weight:800}
  .owbar a.on::before{content:"";position:absolute;top:0;left:50%;transform:translateX(-50%);width:28px;height:3px;background:#D9B300}
  body{padding-bottom:calc(64px + env(safe-area-inset-bottom))}
}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const slot = document.getElementById("ownav");
  const tab = (slot && slot.dataset.tab) || "";
  const on = KEY[tab] || "";
  const links = TABS.map(([k, l, h]) => `<a href="${h}" class="${k === on ? "on" : ""}"${k === on ? ' aria-current="page"' : ""}>${ic(k)}${l}</a>`).join("");
  const html = `<div class="ownav"><div class="in">
    <a class="lg" href="./"><i></i>OUR WEDDING</a>
    <nav class="tb" aria-label="메뉴">${links}</nav>
    <div class="rt"><form action="board.html" role="search">${ic("search")}<input name="q" placeholder="궁금한 말 찾기" aria-label="가이드에서 찾기"></form>${slot && slot.dataset.me ? '<span id="me"></span>' : ""}<a class="cta" href="app.html">${ic("wallet")}내 가계부</a></div>
  </div></div><nav class="owbar" aria-label="메뉴">${links}</nav>`;
  if (slot) slot.outerHTML = html;

  // ---- 최근 본 것·저장한 것 (이 브라우저에만) ----
  const get = k => { try { return JSON.parse(localStorage.getItem(k) || "[]"); } catch (e) { return []; } };
  const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  window.OWNAV = {
    ic, I,
    // item: {k:"guide:12"|"hall:id"|"page:cost", t:제목, s:설명, u:주소, i:아이콘}
    track(item) { if (!item || !item.k) return; const L = get("ow-recent").filter(x => x.k !== item.k); L.unshift({ ...item, at: Date.now() }); put("ow-recent", L.slice(0, 40)); },
    recent() { return get("ow-recent"); },
    saved(kind) { return get("ow-saved").filter(x => !kind || x.k.startsWith(kind + ":")); },
    isSaved(k) { return get("ow-saved").some(x => x.k === k); },
    toggleSave(item) { let L = get("ow-saved"); const had = L.some(x => x.k === item.k); L = had ? L.filter(x => x.k !== item.k) : [{ ...item, at: Date.now() }, ...L]; put("ow-saved", L); return !had; },
    clear(which) { put(which === "recent" ? "ow-recent" : "ow-saved", []); },
    ago(ms) { const s = (Date.now() - ms) / 1000; if (s < 60) return "방금"; if (s < 3600) return Math.floor(s / 60) + "분 전"; if (s < 86400) return Math.floor(s / 3600) + "시간 전"; if (s < 86400 * 2) return "어제"; if (s < 86400 * 7) return Math.floor(s / 86400) + "일 전"; const d = new Date(ms); return (d.getMonth() + 1) + "월 " + d.getDate() + "일"; },
  };
})();
