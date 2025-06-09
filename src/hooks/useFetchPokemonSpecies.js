export const fetchPokemonSpecies = async (pokemon) => {
    const pokemonName = String(pokemon).toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Pokemon not found.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};