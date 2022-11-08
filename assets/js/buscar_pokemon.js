function buscarPokemon(filtro, listaPokemons) {

    const listaFiltrada = listaPokemons.filter(
        (valor) => {
            let li = document.getElementById(valor["indice"]);

            if (pokedex.contains(li)) {
                li.remove();
            }

            if (valor["nome"].toString().includes(filtro) || filtro.length === 0) {
                return valor;
            }
        }
    );

    pokeAPI.apresentrarListaPokemon(listaFiltrada);
}