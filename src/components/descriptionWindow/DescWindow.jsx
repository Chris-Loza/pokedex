import { useEffect, useState } from "react";
import "./descWindow.css";
import { useGlobalState } from "../../lib/globalState";

const DescWindow = ({ currentPokemon, currentEvoChain }) => {
  const [realPokemon, setRealPokemon] = useState(true);
  const { currentParty, setCurrentParty, searchedPokemon, setSearchedPokemon } =
    useGlobalState();
  const [toggleShiny, setToggleShiny] = useState(false);

  useEffect(() => {
    if (currentPokemon === null) {
      setRealPokemon(false);
    } else {
      setRealPokemon(true);
    }
  }, [currentPokemon]);
  const pokemonName = currentPokemon
    ? currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)
    : "MissingNo";

  const handleAddToParty = () => {
    if (currentParty.length > 5) {
      return;
    }
    const updatedParty = [...currentParty, pokemonName];
    setCurrentParty(updatedParty);
  };

  console.log(currentParty);
  return (
    <div className="mainContainer">
      <div className="evoLineContainer descWindowMainContainer">
        <p>Evolution Chain</p>
        <p
          onClick={() =>
            setSearchedPokemon(currentEvoChain?.chain?.species.name)
          }
        >
          {currentEvoChain?.chain?.species.name}
        </p>
        <p
          onClick={() =>
            setSearchedPokemon(
              currentEvoChain?.chain?.evolves_to[0]?.species.name
            )
          }
        >
          {currentEvoChain?.chain?.evolves_to[0]?.species.name}
        </p>
        <p
          onClick={() =>
            setSearchedPokemon(
              currentEvoChain?.chain?.evolves_to[0]?.evolves_to[0]?.species.name
            )
          }
        >
          {currentEvoChain?.chain?.evolves_to[0]?.evolves_to[0]?.species.name}
        </p>
      </div>
      <div className="spriteContainer descWindowMainContainer">
        <div className="pokemonName">
          <p>{pokemonName}</p>
        </div>
        <div className="pokemonSprite">
          <img
            className={realPokemon ? "" : "missingNo"}
            src={
              realPokemon
                ? toggleShiny
                  ? currentPokemon?.sprites?.front_shiny
                  : currentPokemon?.sprites?.front_default
                : "../../../../images/MissingNO.webp"
            }
            alt="Pokémon Sprite"
          />
        </div>
        <div className="addToParty">
          <p onClick={handleAddToParty}>Add to Party</p>
        </div>
      </div>
      <div className="descContainer descWindowMainContainer">
        <div className="typesContainer">
          <p>Type:</p>
          {currentPokemon?.types?.map((type, index) => (
            <p key={index}>
              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
            </p>
          ))}
        </div>
        <div className="abilitiesContainer">
          <p>Abilities:</p>
          {currentPokemon?.abilities?.map((ability, index) => (
            <p key={index}>
              {ability.ability.name.charAt(0).toUpperCase() +
                ability.ability.name.slice(1)}
            </p>
          ))}
        </div>
        <p onClick={() => setToggleShiny(!toggleShiny)}>Toggle Shiny</p>
      </div>
      <div className="statContainer descWindowMainContainer">
        <p>Base Stats</p>
        {currentPokemon?.stats?.map((stat, index) => (
          <p key={index}>
            {stat.stat.name} {stat.base_stat}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DescWindow;
