// public/scripts/analytics-init.js

(function () {
  // Google Analytics
  const gtagScript = document.createElement('script');
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
  gtagScript.async = true;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX'); // reemplazÃ¡ con tu ID real de GA

  // Hotjar
  (function(h,o,t,j,a,r){
    h.hj = h.hj || function(){ (h.hj.q = h.hj.q || []).push(arguments); };
    h._hjSettings = { hjid: 1234567, hjsv: 6 }; // reemplazÃ¡ por tu ID
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script'); r.async = 1;
    r.src = 'https://static.hotjar.com/c/hotjar-' + h._hjSettings.hjid + '.js?sv=' + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document);
})();