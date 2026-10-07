/* 웨딩홀 육각형 — 가계부(app.html)와 웨딩홀 리스트(halls.html)가 같이 씀 */
(function () {
  const AX = ["가격", "홀", "음식", "주차", "교통", "하객 편의"];
  // 가계부 웨딩홀 비교표 40칸 순서 (app.html HALLROWS와 같아야 함)
  const LABELS = ["월", "요일", "시간", "예식 간격", "대관료", "계약금", "식대", "소인 식대", "최소 보증 인원", "카드 결제", "부가세", "현금영수증", "지역 화폐 사용", "꽃장식", "플라워샤워", "예도", "기타 추가금", "단독홀 여부", "홀 분위기", "버진로드 길이", "층고", "예식 전 스냅 촬영", "크기", "화장실", "서브 대기실", "하객 대기 공간", "포토 테이블", "포토 부스", "ATM기 개수", "음식 종류 수", "음료(주류 포함)", "맛(상/중/하)", "시식 인원", "주차 대수", "혼잡도", "무료 주차 시간", "대중교통 접근성", "셔틀 제공 여부", "혼주 가족 주차", "대절 버스 주차장"];
  // 칸마다 묶이는 체크리스트 항목 (월·요일·시간은 점수가 아니라 넣지 않음)
  const ROWS = {
    "가격": ["대관료", "계약금", "식대", "소인 식대", "최소 보증 인원", "카드 결제", "부가세", "현금영수증", "지역 화폐 사용", "꽃장식", "플라워샤워", "예도", "기타 추가금"],
    "홀": ["단독홀 여부", "홀 분위기", "버진로드 길이", "층고", "예식 전 스냅 촬영", "예식 간격"],
    "음식": ["음식 종류 수", "음료(주류 포함)", "맛(상/중/하)", "시식 인원"],
    "주차": ["주차 대수", "혼잡도", "무료 주차 시간", "혼주 가족 주차", "대절 버스 주차장"],
    "교통": ["대중교통 접근성", "셔틀 제공 여부"],
    "하객 편의": ["크기", "화장실", "서브 대기실", "하객 대기 공간", "포토 테이블", "포토 부스", "ATM기 개수"],
  };
  const COL = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4"];
  const LV = { g: [4.5, "좋다는 말 많음"], m: [3, "엇갈림"], b: [1.5, "아쉽다는 말 많음"], n: [0, "자료 부족"] };

  // 홀 하나의 칸 점수: 내용을 적었거나 점수를 바꾼 항목만 평균 (아무것도 없으면 null)
  function score(h, labels) {
    labels = labels || LABELS;
    return AX.map(ax => {
      const xs = [];
      labels.forEach((l, i) => {
        if (!ROWS[ax].includes(l)) return;
        const filled = String((h.v || [])[i] || "").trim() !== "" || +((h.sc || [])[i]) !== 3;
        if (filled) xs.push(+h.sc[i] || 3);
      });
      return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
    });
  }
  const filledCount = vals => vals.filter(v => v != null).length;
  // 우리 우선순위 칸은 2배
  function weighted(vals, prio) {
    let s = 0, w = 0;
    vals.forEach((v, i) => { if (v == null) return; const k = prio && prio.includes(AX[i]) ? 2 : 1; s += v * k; w += k; });
    return w ? s / w : null;
  }
  function plain(vals) { const xs = vals.filter(v => v != null); return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null; }

  // SVG 육각형 (viewBox 0 0 440 400)
  const CX = 220, CY = 205, R = 150;
  const pt = (i, v) => { const a = -Math.PI / 2 + i * Math.PI / 3, r = R * ((v || 0) / 5); return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; };
  const poly = vs => vs.map((v, i) => pt(i, v).map(x => x.toFixed(1)).join(",")).join(" ");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // list: [{name, vals, color, dash, fill, tips}]  opt: {labels, prio, rings, ringLabels, miss, under, sw, dots}
  function svg(list, opt) {
    opt = opt || {};
    let g = "";
    const rings = opt.rings || [1, 2, 3, 4, 5];
    rings.forEach((k, j) => g += `<polygon points="${poly(AX.map(() => k))}" fill="none" stroke="#E4E4E0" stroke-width="${j === rings.length - 1 ? 1.5 : 1}"/>`);
    AX.forEach((a, i) => {
      const [x, y] = pt(i, 5), miss = opt.miss && opt.miss[i];
      g += `<line x1="${CX}" y1="${CY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${miss ? "#B8BCC4" : "#E4E4E0"}" ${miss ? 'stroke-dasharray="4 4"' : ""}/>`;
      if (opt.labels !== false) {
        const [lx, ly] = pt(i, 5.8), p = opt.prio && opt.prio.includes(a);
        g += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="${opt.fs || 15}" font-weight="${p ? 800 : 600}" fill="${miss ? "#8B909B" : "#1C1F26"}">${p ? "★ " : ""}${a}</text>`;
      }
    });
    if (opt.ringLabels) opt.ringLabels.forEach(([k, t]) => { const [x, y] = pt(0, k); g += `<text x="${(x + 6).toFixed(1)}" y="${y.toFixed(1)}" font-size="11" fill="#8B909B" dominant-baseline="middle">${t}</text>`; });
    else if (opt.labels !== false) [1, 3, 5].forEach(k => { const [x, y] = pt(0, k); g += `<text x="${(x + 6).toFixed(1)}" y="${y.toFixed(1)}" font-size="10" fill="#8B909B" dominant-baseline="middle">${k}</text>`; });
    if (opt.under) g += opt.under;
    list.forEach(s => {
      g += `<polygon points="${poly(s.vals)}" fill="${s.color}" fill-opacity="${s.fill ?? .12}" stroke="${s.color}" stroke-width="${opt.sw || 2}" stroke-linejoin="round" ${s.dash ? 'stroke-dasharray="6 5"' : ""}/>`;
      if (opt.dots !== false) s.vals.forEach((v, i) => {
        if (!v) return; const [x, y] = pt(i, v);
        g += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="${s.color}" stroke="#fff" stroke-width="2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="transparent"><title>${esc(s.name)} · ${AX[i]} ${s.tips ? s.tips[i] : v.toFixed(1) + "점"}</title></circle>`;
      });
    });
    return g;
  }
  const avgPoly = vals => `<polygon points="${poly(vals)}" fill="none" stroke="#9AA0A8" stroke-width="2" stroke-dasharray="6 5"/>`;
  window.HEX = { AX, LABELS, ROWS, COL, LV, score, weighted, plain, filledCount, svg, avgPoly };
})();
