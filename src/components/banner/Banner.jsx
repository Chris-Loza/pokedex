import { useGlobalState } from "../../lib/globalState";
import "./banner.css";

const Banner = () => {
  const { searchedPokemon, setSearchedPokemon } = useGlobalState();
  const handlePokemonSearch = () => {
    setSearchedPokemon(document.getElementById("pokemonSearch").value);
  };
  return (
    <div className="searchContainer">
      <input type="text" id="pokemonSearch" />
      <button onClick={handlePokemonSearch}>Search</button>
    </div>
  );
};

export default Banner;
