/* OUR WEDDING 혜택 — 가계부(app.html)·혜택(perks.html)·웨딩홀 리스트(halls.html)가 같이 씀
 * 혜택은 Supabase perks 표에서 읽음 (운영자가 admin.html에서 올린 것 중 status=live·마감 안 지난 것만 보임)
 * 광고 표시는 공정위 추천·보증 심사지침에 따라 카드마다 '광고' 글씨를 붙임
 */
(function () {
  const C = window.OW_CONF || {};
  const CATS = ["웨딩홀", "스드메", "예물", "혼수", "신혼여행", "청첩장", "한복", "스냅", "기타"];
  // 준비 단계(가계부 할일 단계) → 그때 필요한 혜택 분류
  const STAGE_CATS = {
    "가장 먼저": ["웨딩홀", "스드메"], "D-365": ["웨딩홀", "스드메"],
    "5~6개월 전": ["스드메", "예물", "혼수", "신혼여행"], "4개월 전": ["예물", "혼수", "한복", "신혼여행"],
    "2~3개월 전": ["청첩장", "한복", "스냅", "혼수"], "D-30": ["청첩장", "스냅", "신혼여행"],
    "D-7": ["신혼여행", "스냅"], "D-1": ["신혼여행"], "본식 후": ["혼수", "기타"], "입주 전": ["혼수", "기타"]
  };
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const today = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const dday = until => { if (!until) return "상시"; const n = Math.round((new Date(until) - new Date(today())) / 864e5); return n === 0 ? "오늘 마감" : n > 0 ? "D-" + n : "마감"; };
  let list = null, waiting = [];

  async function load() {
    if (list) return list;
    try {
      const k = sessionStorage.getItem("ow-perks");
      if (k) { const o = JSON.parse(k); if (Date.now() - o.t < 5 * 60e3) { list = o.v; return list; } }
    } catch (e) { }
    try {
      const r = await fetch(C.supabaseUrl + "/rest/v1/perks?select=*&order=sort.desc,created_at.desc", { headers: { apikey: C.supabaseKey } });
      list = r.ok ? await r.json() : [];
    } catch (e) { list = []; }
    list = list.filter(p => p.status === "live" && (!p.until || p.until >= today()));
    try { sessionStorage.setItem("ow-perks", JSON.stringify({ t: Date.now(), v: list })); } catch (e) { }
    return list;
  }
  // 누가 눌렀는지는 남기지 않고 혜택·위치·시각만
  function click(id, place) {
    try { fetch(C.supabaseUrl + "/rest/v1/perk_clicks", { method: "POST", keepalive: true, headers: { apikey: C.supabaseKey, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ perk_id: String(id).slice(0, 40), place: String(place || "").slice(0, 20) }) }); } catch (e) { }
  }
  const howBox = p => p.how === "code" && p.code ? `<button class="pkcode" data-pkcopy="${esc(p.code)}" data-pkid="${p.id}"><span>쿠폰 코드 <b>${esc(p.code)}</b></span><span class="pkm">눌러서 복사</span></button>`
    : p.how === "say" ? `<div class="pkcode"><span>상담 때 <b>"OUR WEDDING 보고 왔어요"</b>라고 말하기</span></div>`
    : p.how === "phone" && p.phone ? `<div class="pkcode"><span>전화 상담 <b>${esc(p.phone)}</b></span></div>` : "";
  const goBtn = (p, place) => p.url ? `<a class="pkgo" href="${esc(p.url)}" target="_blank" rel="noopener sponsored" data-pkid="${p.id}" data-pkplace="${place}">${p.how === "link" ? "혜택 받으러 가기" : "업체 보러 가기"}</a>`
    : p.how === "phone" && p.phone ? `<a class="pkgo" href="tel:${esc(p.phone.replace(/[^0-9+]/g, ""))}" data-pkid="${p.id}" data-pkplace="${place}">전화하기</a>` : "";
  function card(p, place, extra) {
    return `<article class="pk" id="pk-${p.id}"><div class="pkim${p.img ? "" : " noimg"}">${p.img ? `<img src="${esc(p.img)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">` : ""}<span class="pkad">광고</span><span class="pkdd">${dday(p.until)}</span></div>
      <div class="pkbd"><div class="pkcat">${esc(p.cat)}${p.region ? " · " + esc(p.region) : ""}</div><div class="pknm">${esc(p.name)}</div><div class="pkof">${esc(p.offer)}</div>
      ${p.cond ? `<div class="pkcd">${esc(p.cond)}</div>` : ""}${p.until ? `<div class="pkcd">~ ${p.until.replace(/-/g, ".")}까지</div>` : ""}${howBox(p)}
      <div class="pkact">${goBtn(p, place)}${extra || ""}</div></div></article>`;
  }
  const chip = (p, place) => `<a class="pkchip" href="${place === "halls" ? "perks.html" : "#"}#pk-${p.id}" data-pkchip="${p.id}" data-pkplace="${place}" title="${esc(p.name)} · ${esc(p.offer)} (광고)">혜택 · ${esc(p.offer)}</a>`;
  const forItem = (n) => (list || []).filter(p => (p.items || []).includes(n));
  const forTodo = (n) => (list || []).filter(p => (p.todos || []).includes(n));
  const forHall = (n) => { const k = String(n).replace(/\s/g, ""); return (list || []).filter(p => (p.halls || []).some(h => h.replace(/\s/g, "") === k)); };
  const forVendor = (n) => { const k = String(n).replace(/\s|\(.*?\)/g, ""); return (list || []).filter(p => (p.vendors || []).some(h => h.replace(/\s|\(.*?\)/g, "") === k)); };
  const forStage = (st) => { const cs = STAGE_CATS[st] || CATS; return (list || []).filter(p => cs.includes(p.cat)); };
  // 쿠폰 복사·바로가기 클릭 기록 (어느 페이지든)
  document.addEventListener("click", e => {
    const c = e.target.closest("[data-pkcopy]");
    if (c) { const code = c.dataset.pkcopy; try { navigator.clipboard.writeText(code); } catch (er) { } const m = c.querySelector(".pkm"); if (m) m.textContent = "복사했어요"; click(c.dataset.pkid, "copy"); return; }
    const g = e.target.closest(".pkgo[data-pkid]"); if (g) click(g.dataset.pkid, g.dataset.pkplace || "card");
    const h = e.target.closest("[data-pkchip]"); if (h) click(h.dataset.pkchip, "chip-" + (h.dataset.pkplace || ""));
  });
  const CSS = `.pkad{display:inline-block;font-size:11px;font-weight:700;color:#4F5563;border:1px solid #D5D7DC;padding:0 5px;background:#fff;white-space:nowrap}
.pkgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:12px}
.pk{border:1px solid #EEEEEE;display:flex;flex-direction:column;background:#fff}
.pkim{aspect-ratio:2.2/1;background:linear-gradient(135deg,#FFFCEC,#FFF0A6);position:relative;overflow:hidden}
.pkim img{width:100%;height:100%;object-fit:cover;display:block}
.pkim.noimg{aspect-ratio:auto;height:34px;background:#FFFCEC;border-bottom:1px solid #F1DC6E}
.pkim.noimg .pkad,.pkim.noimg .pkdd{top:7px}
.pkim .pkad{position:absolute;left:8px;top:8px}
.pkdd{position:absolute;right:8px;top:8px;background:#1C1F26;color:#fff;font-size:11px;font-weight:700;padding:1px 6px}
.pkbd{padding:14px;display:flex;flex-direction:column;flex:1}
.pkcat{font-size:12px;color:#8B909B}.pknm{font-weight:700;margin-top:2px}
.pkof{font-size:19px;font-weight:800;margin:6px 0 4px;letter-spacing:-.3px;line-height:1.35}
.pkcd{font-size:12px;color:#4F5563;line-height:1.6}
.pkcode{display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%;border:1px dashed #D9B300;background:#FFFCEC;padding:7px 10px;margin-top:8px;font-size:13px;font-family:inherit;color:#1C1F26;text-align:left;cursor:pointer}
.pkcode .pkm{color:#8B909B;font-size:12px;white-space:nowrap}
.pkact{display:flex;gap:6px;margin-top:auto;padding-top:12px}
.pkact>*{flex:1;border:1px solid #EEEEEE;background:#fff;padding:9px 6px;font-size:14px;text-align:center;text-decoration:none;color:#1C1F26;cursor:pointer;font-family:inherit}
.pkact .pkgo{background:#FFF0A6;border-color:#F1DC6E;font-weight:700;color:#3A3200}
.pkchip{display:inline-flex;align-items:center;font-size:12px;border:1px solid #F1DC6E;background:#FFFCEC;color:#3A3200;padding:1px 7px;font-weight:700;white-space:nowrap;text-decoration:none;cursor:pointer;max-width:220px;overflow:hidden;text-overflow:ellipsis}
.pkchip:hover{background:#FFF0A6}
.pknote{display:flex;gap:10px;align-items:flex-start;background:#FAFAF7;border-left:3px solid #D9B300;padding:10px 12px;font-size:13px;color:#4F5563;margin-bottom:12px}
.pkempty{border:1px dashed #D5D7DC;padding:22px;text-align:center;color:#4F5563;background:#fff}
.pkempty a{display:inline-block;margin-top:10px;background:#FFF0A6;padding:9px 16px;font-weight:700;text-decoration:none;color:#3A3200}
.pk.flash{outline:3px solid #D9B300}`;
  const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
  const NOTE = `<div class="pknote"><span class="pkad">광고</span><span>여기 혜택은 OUR WEDDING이 업체에서 <b>광고비나 수수료를 받고</b> 소개하는 거예요. 계약 전에 조건을 꼭 직접 확인하세요.</span></div>`;
  const EMPTY = `<div class="pkempty">아직 준비 중인 혜택이에요. 예비부부에게 혜택을 주고 싶은 업체라면 신청해 주세요.<br><a href="partner.html">광고·제휴 신청하기</a><div style="font-size:12px;color:#8B909B;margin-top:8px">웨딩홀 · 스드메 · 예물 · 혼수 가전·가구 · 신혼여행 · 청첩장 · 한복 · 스냅</div></div>`;
  window.PERKS = { CATS, STAGE_CATS, load, click, card, chip, forItem, forTodo, forHall, forVendor, forStage, NOTE, EMPTY, dday, list: () => list || [] };
})();
