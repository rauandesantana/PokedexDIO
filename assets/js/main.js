const buscar = [
    document.getElementById(""),
    document.getElementById(""),
];
const pokedex = document.getElementById("pokedex-lista");
const pokeAPI = new PokeAPI(pokedex);

pokeAPI.inicializar(1, 898);