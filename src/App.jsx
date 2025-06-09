import "./App.css";
import { fetchPokemon } from "./hooks/useFetchPokemon";
import Banner from "./components/banner/Banner";
import DescWindow from "./components/descriptionWindow/DescWindow";
import PartyWindow from "./components/partyWindow/PartyWindow";
import { useEffect, useState } from "react";
import { useGlobalState } from "./lib/globalState";
import { fetchPokemonSpecies } from "./hooks/useFetchPokemonSpecies";
import { fetchPokemonEvolutionChain } from "./hooks/useFetchPokemonEvolutionChain";

function App() {
  const { searchedPokemon, setSearchedPokemon } = useGlobalState();
  // const [searchInput, setSearchInput] = useState("bulbasaur");
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [currentPokemonSpecies, setCurrentPokemonSpecies] = useState(null);
  const [currentEvoChain, setCurrentEvoChain] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      const currPokemon = await fetchPokemon(searchedPokemon);
      const currPokemonSpecies = await fetchPokemonSpecies(searchedPokemon);
      console.log(currPokemon);
      console.log(currPokemonSpecies);
      setCurrentPokemon(currPokemon);
      setCurrentPokemonSpecies(currPokemonSpecies);

      if (currPokemonSpecies !== null) {
        const evoChainUrl = currPokemonSpecies.evolution_chain.url;
        const currEvoChain = await fetchPokemonEvolutionChain(evoChainUrl);
        setCurrentEvoChain(currEvoChain);
        console.log(currEvoChain);
      }
    };
    getPokemon();
  }, [searchedPokemon]);

  return (
    <div className="appContainer">
      <div className="bannerContainer compContainer">
        <Banner />
      </div>
      <div className="descWindowContainer compContainer">
        <DescWindow
          currentPokemon={currentPokemon}
          currentEvoChain={currentEvoChain}
        />
      </div>
      <div className="partyWindowContainer compContainer">
        <PartyWindow />
      </div>
    </div>
  );
}

export default App;
