<button onclick="testarXHR()">Testar XHR</button>

<script>
function testarXHR() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log("Status:", xhr.status);
            console.log("Resposta:", xhr.responseText);

            if (xhr.status === 200) {
                alert("XHR funcionando!");
            } else {
                alert("Erro: " + xhr.status);
            }
        }
    };

    xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
    xhr.send();
}
</script>
