var limite = 100;
var atual = 1;
const url = "https://pokeapi.co/api/v2/pokemon/";

requisicaoAPI(url, limite, atual);


function requisicaoAPI(url, limite, atual) {




    fetch( url.concat( atual ) ).then(
        function (response) {
            console.log(response.status);
        }
    ).catch(
        function (erro){
            console.log(erro);
        }
    );





}