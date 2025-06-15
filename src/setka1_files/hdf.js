var byteToHex = [];
for (var i = 0; i < 256; ++i)
  byteToHex.push((i + 256).toString(16).slice(1));
function unsafeStringify(e, t = 0) {
  return (byteToHex[e[t + 0]] + byteToHex[e[t + 1]] + byteToHex[e[t + 2]] + byteToHex[e[t + 3]] + "-" + byteToHex[e[t + 4]] + byteToHex[e[t + 5]] + "-" + byteToHex[e[t + 6]] + byteToHex[e[t + 7]] + "-" + byteToHex[e[t + 8]] + byteToHex[e[t + 9]] + "-" + byteToHex[e[t + 10]] + byteToHex[e[t + 11]] + byteToHex[e[t + 12]] + byteToHex[e[t + 13]] + byteToHex[e[t + 14]] + byteToHex[e[t + 15]]).toLowerCase();
}
var getRandomValues, rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues && (getRandomValues = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !getRandomValues))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return getRandomValues(rnds8);
}
var _seqLow = null, _seqHigh = null, _msecs = 0;
function v7(e, t, d) {
  e = e || {};
  var s = 0, n = new Uint8Array(16), c = e.random || (e.rng || rng)(), f = e.msecs !== void 0 ? e.msecs : Date.now(), r = e.seq !== void 0 ? e.seq : null, o = _seqHigh, a = _seqLow;
  return f > _msecs && e.msecs === void 0 && (_msecs = f, r !== null && (o = null, a = null)), r !== null && (r > 2147483647 && (r = 2147483647), o = r >>> 19 & 4095, a = r & 524287), (o === null || a === null) && (o = c[6] & 127, o = o << 8 | c[7], a = c[8] & 63, a = a << 8 | c[9], a = a << 5 | c[10] >>> 3), f + 1e4 > _msecs && r === null ? ++a > 524287 && (a = 0, ++o > 4095 && (o = 0, _msecs++)) : _msecs = f, _seqHigh = o, _seqLow = a, n[s++] = _msecs / 1099511627776 & 255, n[s++] = _msecs / 4294967296 & 255, n[s++] = _msecs / 16777216 & 255, n[s++] = _msecs / 65536 & 255, n[s++] = _msecs / 256 & 255, n[s++] = _msecs & 255, n[s++] = o >>> 4 & 15 | 112, n[s++] = o & 255, n[s++] = a >>> 13 & 63 | 128, n[s++] = a >>> 5 & 255, n[s++] = a << 3 & 255 | c[10] & 7, n[s++] = c[11], n[s++] = c[12], n[s++] = c[13], n[s++] = c[14], n[s++] = c[15], t || unsafeStringify(n);
}
const baseUrl = "/hd-api/external", HeaderName = {
  traceId: "X-Hd-Trace-Id",
  cookie: "X-Hd-Cookie"
};
function createUrl(e, t = baseUrl) {
  return [t, e].filter(Boolean).join("/");
}
async function fetchScript() {
  const e = await fetch("".concat(createUrl(v7()), ".js"));
  return {
    text: await e.text(),
    headers: e.headers
  };
}
class HDF {
  constructor(config) {
    this.exec = async (props) => {
      try {
        const script = await fetchScript();
        if (!script) return null;
        const headers = {}, traceId = script.headers.get(HeaderName.traceId);
        if (traceId) {
          const e = "x-hd-trace-id";
          let t = document.querySelector('meta[name="'.concat(e, '"]'));
          if (!t) {
            const d = document.createElement("meta");
            d.setAttribute("name", e), t = document.head.appendChild(d);
          }
          t.setAttribute("content", traceId);
        }
        (props == null ? void 0 : props.hdCookie) !== void 0 && (headers[HeaderName.cookie] = Number(props == null ? void 0 : props.hdCookie).toString());
        const t0 = performance.now(), data = await eval(script.text), t1 = performance.now(), request = {
          method: "POST",
          headers,
          body: data
        }, response = await fetch(createUrl("verify"), request).then(
          (e) => e == null ? void 0 : e.json()
        );
        return { ...response != null ? response : {}, data, t: t1 - t0 };
      } catch (e) {
        return null;
      }
    }, Object.assign(this, config != null ? config : {});
  }
  ready(e) {
    const { fns: t } = window.___HDF_cfg || { fns: [] };
    e && t.push(e), t != null && t.length && t.forEach((d) => d.call({}));
  }
}
function init() {
  window.HDF = new HDF();
  const { fns: e } = window.___HDF_cfg || { fns: [] };
  e != null && (e != null && e.length) && (e == null || e.forEach((t) => t.call({})));
}
document.readyState === "complete" ? init() : document.addEventListener("readystatechange", init);
