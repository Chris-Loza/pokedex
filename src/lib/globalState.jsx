import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
  const [searchedPokemon, setSearchedPokemon] = useState("missingNo");
  const [currentParty, setCurrentParty] = useState({
    partyName: "",
    party: [],
    partyNum: 0,
  });
  const [partyList, setPartyList] = useState([]);

  return (
    <GlobalStateContext.Provider
      value={{
        searchedPokemon,
        setSearchedPokemon,
        currentParty,
        setCurrentParty,
        partyList,
        setPartyList,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
