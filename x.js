window.PWNED = true;

console.log("MODULE EXECUTED");

document.body.insertAdjacentHTML(
  "afterbegin",
  "<div style='position:fixed;top:0;left:0;width:100%;background:red;color:white;padding:20px;z-index:999999'>POC EXECUTED</div>"
);
