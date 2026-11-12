/* Registers the service worker so the course works offline and can be
   installed on a phone or desktop. Does nothing on file:// (service workers
   require http or https, including localhost). */

(function () {
  "use strict";
  if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").then(function () {
      return navigator.serviceWorker.ready;
    }).then(function () {
      var seen = false;
      try { seen = localStorage.getItem("secplus_offline_ready") === "1"; localStorage.setItem("secplus_offline_ready", "1"); } catch (e) { /* storage unavailable */ }
      if (!seen && window.SECAPP) SECAPP.toast("Saved for offline use. You can also install this as an app.");
    }).catch(function () { /* offline support is optional */ });
  });
})();
