// public/gtm.js
export const injectGTM = (gtmId) => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gtmId);
};
  