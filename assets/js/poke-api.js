class PokeAPI {
    URL;
    pokedex;
    listaPokemons;

    constructor(pokedex) {
        this.URL = "https://pokeapi.co/api/v2/pokemon/";
        this.pokedex = pokedex;
        this.listaPokemons = [];
    }

    inicializar(inicial, limite) {
        (limite === undefined || limite < 1)
            ? limite = 999999
            : limite;

        (inicial === undefined || inicial < 0 || inicial > limite)
            ? inicial = 0
            : inicial;

        fetch(this.URL.concat("?offset=" + inicial + "&limit=" + limite + ""))
            .then((response) => response.json())
            .then((responseJson) => responseJson["results"])
            .then((resoltado) => resoltado.map(this.listarRequisicoes))
            .then((listaRequisicao) => Promise.all(listaRequisicao))
            .then((resultados) => resultados.map(this.instanciarPokemon))
            .then((listaObjetos) => {
                this.listaPokemons = listaObjetos;
                this.apresentrarListaPokemon(listaObjetos);
            })
            .catch((erro) => console.log("(Estagio 1) Erro: " + erro));
    }

    async listarRequisicoes(item) {
        try {
            const response = await fetch(item["url"]);
            return await response.json();
        } catch (erro) {
            return console.log("(Estagio 2) Erro: " + erro);
        }
    }

    instanciarPokemon(pokemon) {
        let indice, nome, imagem;
        let tipos, altura, peso;
        let vida, ataque, defesa;
        let ataqueEspecial, defesaEspecial, velocidade;

        // Indice
        (pokemon["id"] === undefined || pokemon["id"] === null)
            ? indice = "Null"
            : indice = pokemon["id"];

        // Nome
        (pokemon["name"] === undefined || pokemon["name"] === null)
            ? nome = "Null"
            : nome = pokemon["name"];

        // Imagem
        (pokemon["sprites"]["front_default"] === undefined || pokemon["sprites"]["front_default"] === null)
            ? imagem = "./assets/imagens/pokeball.png"
            : imagem = pokemon["sprites"]["front_default"];

        // Tipos
        if (pokemon["types"] !== undefined || pokemon["types"] === null) {
            tipos = [];
            pokemon["types"].forEach(tipo => {
                let valorTipo;

                (tipo["type"]["name"] === undefined || tipo["type"]["name"] === null)
                    ? valorTipo = "Null"
                    : valorTipo = tipo["type"]["name"];

                tipos.push(valorTipo);
            });
        } else {
            tipos = ["Null"];
        }

        // Altura
        (pokemon["height"] === undefined || pokemon["height"] === null)
            ? altura = "Null"
            : altura = (pokemon["height"] / 10);

        // Peso
        (pokemon["weight"] === undefined || pokemon["weight"] === null)
            ? peso = "Null"
            : peso = pokemon["weight"];

        // Estatisticas
        if (pokemon["stats"] !== undefined || pokemon["stats"] === null) {
            pokemon["stats"].forEach(estatistica => {
                let nomeAtributo = estatistica["stat"]["name"];
                let valorBase;
                let valorAdd;

                (estatistica["base_stat"] === undefined || pokemon["base_stat"] === null)
                    ? valorBase = "Null"
                    : valorBase = estatistica["base_stat"];

                (estatistica["effort"] === undefined || pokemon["effort"] === null)
                    ? valorAdd = "Null"
                    : valorAdd = estatistica["effort"];

                switch (nomeAtributo) {
                    case "hp":
                        vida = [valorBase, valorAdd];
                        break;
                    case "attack":
                        ataque = [valorBase, valorAdd];
                        break;
                    case "defense":
                        defesa = [valorBase, valorAdd];
                        break;
                    case "special-attack":
                        ataqueEspecial = [valorBase, valorAdd];
                        break;
                    case "special-defense":
                        defesaEspecial = [valorBase, valorAdd];
                        break;
                    case "speed":
                        velocidade = [valorBase, valorAdd];
                        break;
                }
            });
        }

        (vida === undefined)
            ? vida = ["Null", "Null"]
            : vida;

        (ataque === undefined)
            ? ataque = ["Null", "Null"]
            : ataque;

        (defesa === undefined)
            ? defesa = ["Null", "Null"]
            : defesa;

        (ataqueEspecial === undefined)
            ? ataqueEspecial = ["Null", "Null"]
            : ataqueEspecial;

        (defesaEspecial === undefined)
            ? defesaEspecial = ["Null", "Null"]
            : defesaEspecial;

        (velocidade === undefined)
            ? velocidade = ["Null", "Null"]
            : velocidade;

        // Atribuir Objeto
        let objeto = {
            indice: indice,
            nome: nome,
            imagem: imagem,
            tipos: tipos,
            altura: altura,
            peso: peso,
            vida: vida,
            ataque: ataque,
            defesa: defesa,
            ataqueEspecial: ataqueEspecial,
            defesaEspecial: defesaEspecial,
            velocidade: velocidade,
        };

        return objeto;
    }

    apresentrarListaPokemon(listaPokemons) {
        listaPokemons.forEach(pokemon => {
            let liPokemon = document.createElement("li");
            liPokemon.className = "pokemon";

            let spanIndice = document.createElement("span");
            spanIndice.className = "indice";
            spanIndice.textContent = "#" + pokemon["indice"];

            let spanNome = document.createElement("span");
            spanNome.className = "nome";
            spanNome.textContent = pokemon["nome"];

            let divDetalhes = document.createElement("div");
            divDetalhes.className = "detalhes";

            let olTipos = document.createElement("ol");
            olTipos.className = "tipos";

            pokemon["tipos"].forEach(tipo => {

                let liTipo = document.createElement("li");
                liTipo.className = "slot-tipos";

                let spanTipo = document.createElement("span");
                spanTipo.textContent = tipo;

                liTipo.appendChild(spanTipo);
                olTipos.appendChild(liTipo);

            });

            let imagem = document.createElement("img");
            imagem.src = pokemon["imagem"];
            imagem.alt = "Imagem do Pokemon";

            divDetalhes.appendChild(olTipos);
            divDetalhes.appendChild(imagem);

            liPokemon.appendChild(spanIndice);
            liPokemon.appendChild(spanNome);
            liPokemon.appendChild(divDetalhes);

            this.pokedex.appendChild(liPokemon);
        });
    }
}