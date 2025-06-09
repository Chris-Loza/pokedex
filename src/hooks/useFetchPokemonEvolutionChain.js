export const fetchPokemonEvolutionChain = async (url) => {
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