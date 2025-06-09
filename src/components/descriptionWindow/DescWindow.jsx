import { useEffect, useState } from "react";
import "./descWindow.css";

const DescWindow = ({ currentPokemon }) => {
  const [realPokemon, setRealPokemon] = useState(true);
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

  return (
    <div className="mainContainer">
      <div className="evoLineContainer descWindowMainContainer">Evolutions</div>
      <div className="spriteContainer descWindowMainContainer">
        <div className="pokemonName">
          <p>{pokemonName}</p>
        </div>
        <div className="pokemonSprite">
          <img
            className={realPokemon ? "" : "missingNo"}
            src={
              realPokemon
                ? currentPokemon?.sprites?.front_default
                : "../../../../images/MissingNO.webp"
            }
            alt="Pokémon Sprite"
          />
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
        <p>Toggle Shiny</p>
      </div>
      <div className="statContainer descWindowMainContainer">Stats</div>
    </div>
  );
};

export default DescWindow;
