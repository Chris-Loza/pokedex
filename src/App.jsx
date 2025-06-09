import "./App.css";
import { fetchPokemon } from "./hooks/useFetchPokemon";
import Banner from "./components/banner/Banner";
import DescWindow from "./components/descriptionWindow/DescWindow";
import PartyWindow from "./components/partyWindow/PartyWindow";
import { useEffect, useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("bulbasaur");
  const [currentPokemon, setCurrentPokemon] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      const currPokemon = await fetchPokemon(searchInput);
      console.log(currPokemon);
      setCurrentPokemon(currPokemon);
    };
    getPokemon();
    console.log(currentPokemon);
  }, [searchInput]);

  return (
    <div className="appContainer">
      <div className="bannerContainer compContainer">
        <Banner />
      </div>
      <div className="descWindowContainer compContainer">
        <DescWindow currentPokemon={currentPokemon} />
      </div>
      <div className="partyWindowContainer compContainer">
        <PartyWindow />
      </div>
    </div>
  );
}

export default App;
