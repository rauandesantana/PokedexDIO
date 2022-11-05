
requisicaoAPI(1, 50);

function requisicaoAPI(apos, limite) {
    let listaPokemons = [];

    (limite > 898)
        ? limite = 898
        : limite;
    (apos > limite)
        ? apos = limite
        : apos;

    for (i = apos; i <= limite; i++) {

        fetch(("https://pokeapi.co/api/v2/pokemon/").concat(i))
            .then((response) => response.json())
            .then((pokemon) => exibirPokemons(listarPokemon(pokemon)))
            .catch((erro) => console.log("Erro: " + erro));

    }

}

function listarPokemon(pokemon) {
    let id = pokemon["id"];
    let nome = pokemon["name"];
    let imagem = pokemon["sprites"]["front_default"];
    let tipos = [];
    let vida;
    let ataque;
    let defesa;
    let ataqueEspecial;
    let defesaEspecial;
    let velocidade;

    if (pokemon["types"] !== undefined) {
        pokemon["types"].forEach(tipo => {
            tipos.push(tipo["type"]["name"]);
        });
    }

    if (pokemon["stats"] !== undefined) {
        pokemon["stats"].forEach(estatistica => {
            switch (estatistica["stat"]["name"]) {
                case "hp":
                    vida = [estatistica["base_stat"], estatistica["effort"]];
                    break;
                case "attack":
                    ataque = [estatistica["base_stat"], estatistica["effort"]];
                    break;
                case "defense":
                    defesa = [estatistica["base_stat"], estatistica["effort"]];
                    break;
                case "special-attack":
                    ataqueEspecial = [estatistica["base_stat"], estatistica["effort"]];
                    break;
                case "special-defense":
                    defesaEspecial = [estatistica["base_stat"], estatistica["effort"]];
                    break;
                case "speed":
                    velocidade = [estatistica["base_stat"], estatistica["effort"]];
                    break;
            }
        });
    }

    let objeto = {
        id: id,
        nome: nome,
        imagem: imagem,
        tipos: tipos,
        vida: vida,
        ataque: ataque,
        defesa: defesa,
        ataqueEspecial: ataqueEspecial,
        defesaEspecial: defesaEspecial,
        velocidade: velocidade,
    };

    return objeto;
}

function exibirPokemons(listaPokemons) {
    let pokedex = document.getElementById("pokedex-lista");


    let liPokemon = document.createElement("li");
    liPokemon.className = "pokemon";

    let spanIndice = document.createElement("span");
    spanIndice.className = "indice";
    spanIndice.textContent = listaPokemons["id"];

    let spanNome = document.createElement("span");
    spanNome.className = "nome";
    spanNome.textContent = listaPokemons["nome"];

    let divDetalhes = document.createElement("div");
    divDetalhes.className = "detalhes";

    let olTipos = document.createElement("ol");
    olTipos.className = "tipos";

    listaPokemons["tipos"].forEach(tipo => {

        let liTipo = document.createElement("li");
        liTipo.className = "slot-tipos";

        let spanTipo = document.createElement("span");
        spanTipo.textContent = tipo;

        liTipo.appendChild(spanTipo);
        olTipos.appendChild(liTipo);

    });

    let imagem = document.createElement("img");
    imagem.src = listaPokemons["imagem"];
    imagem.alt = "Imagem do Pokemon";

    divDetalhes.appendChild(olTipos);
    divDetalhes.appendChild(imagem);

    liPokemon.appendChild(spanIndice);
    liPokemon.appendChild(spanNome);
    liPokemon.appendChild(divDetalhes);

    pokedex.appendChild(liPokemon);

}