import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
  const [searchedPokemon, setSearchedPokemon] = useState("missingNo");
//   const [searchedPokemon, setSearchedPokemon] = useState("Charizard");

  return (
    <GlobalStateContext.Provider
      value={{
        searchedPokemon,
        setSearchedPokemon,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
