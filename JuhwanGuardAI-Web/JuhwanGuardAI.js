/* ======== textarea 자동 높이 조절 ======== */
    const textarea = document.querySelector("#messageInput");
    function resize() {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
    textarea.addEventListener("input", resize);
    resize();

    /* ======== 스팸/사기 분석 함수 ======== */
    function analyzeText(text) {
      let score = 0;

      const urgentWords = ["급해", "빨리", "지금", "위급"];
      urgentWords.forEach(w => { if (text.includes(w)) score += 20; });

      const scamWords = ["송금", "계좌", "이체", "입금", "보내줘"];
      scamWords.forEach(w => { if (text.includes(w)) score += 40; });

      return score;
    }

    function analyzeURL(text) {
      let score = 0;
      const suspiciousPatterns = ["paypa1", "facebo0k", "kaka0"];

      suspiciousPatterns.forEach(s => {
        if (text.includes(s)) score += 40;
      });

      return score;
    }

    function checkMessage(msg) {
      let total = analyzeText(msg) + analyzeURL(msg);

      if (total >= 80) return { level: "위험", color: "red", score: total };
      if (total >= 40) return { level: "주의", color: "orange", score: total };
      return { level: "안전", color: "green", score: total };
    }

    /* ======== 검사 버튼 이벤트 ======== */
    document.getElementById("checkBtn").addEventListener("click", () => {
      const msg = textarea.value.trim();
      const result = checkMessage(msg);

      const box = document.getElementById("resultBox");
      const text = document.getElementById("resultText");

      box.style.borderLeft = `8px solid ${result.color}`;
      text.innerHTML = `결과: <strong>${result.level}</strong> (점수: ${result.score})`;
    });
