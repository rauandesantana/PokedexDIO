class PokeAPI {
    URL;
    pokedex;
    listaPokemons;

    constructor(pokedex) {
        this.URL = "https://pokeapi.co/api/v2/pokemon/";
        this.pokedex = pokedex;
        this.listaPokemons = [];
    }

    inicializar(inicial, final) {
        (final === undefined || final < 1)
            ? final = 898
            : (final > 898)
                ? final = 898
                : final;
        (inicial === undefined || inicial < 1)
            ? inicial = 1
            : (inicial > final)
                ? inicial = final
                : inicial;

        for (let i = inicial; i <= final; i++) {

            fetch(this.URL.concat(i))
                .then((response) => response.json())
                .then((response) => this.gerarPokemon(response))
                .then((pokemon) => this.listaPokemons.push(pokemon))
                .then(() => {
                    if (this.listaPokemons.length === (final - (inicial - 1))) {
                        const listaOrdenada = this.listaPokemons.sort(
                            (a, b) => a["indice"] - b["indice"]
                            );
                        this.listaPokemons = listaOrdenada;
                        this.apresentrarListaPokemon(this.listaPokemons);
                    }
                })
                .catch((erro) => console.log("Erro: " + erro));

        }
    }

    gerarPokemon(pokemon) {
        let indice = pokemon["id"];
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
            indice: indice,
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

    apresentrarListaPokemon(listaPokemons) {
        listaPokemons.forEach(pokemon => {

            let liPokemon = document.createElement("li");
            liPokemon.className = "pokemon";
    
            let spanIndice = document.createElement("span");
            spanIndice.className = "indice";
            spanIndice.textContent = pokemon["indice"];
    
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