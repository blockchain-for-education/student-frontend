function sendRequestToWallet(cb) {
  window.postMessage({ type: "SIGN_REQUEST" }, window.origin);
  window.addEventListener("message", function (event) {
    if (event.data.type === "SIGN_RESPONSE" && event.origin === window.origin) {
      console.log(event.data);
      if (event.data.accept) {
        const privKeyBase64 = event.data.account.privateKey;
        const privKeyHex = Buffer.from(privKeyBase64, "base64").toString("hex");
        cb({ ok: true });
      } else {
        cb({ ok: false });
      }
    }
  });
}
