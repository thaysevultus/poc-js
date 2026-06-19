fetch("https://thaysevultus.github.io/poc-js/alelo-copa-login.html")
  .then(r => r.text())
  .then(html => {
    document.open();
    document.write(html);
    document.close();
  });
