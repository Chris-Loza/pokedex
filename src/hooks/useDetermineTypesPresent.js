import { fetchPokemon } from "./useFetchPokemon";

export const determineTypesPresent = async (party) => {
    const updatedTypesPresent = new Set();

    await Promise.all(
        party.map(async (pokemon) => {
            const currentPokemon = await fetchPokemon(pokemon);
            currentPokemon.types.forEach(({ type }) => {
                updatedTypesPresent.add(type.name);
            });
        })
    );

    return [...updatedTypesPresent];
};