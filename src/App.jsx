import { useEffect, useState } from "react";
import "./App.css";
import { fetchPokemon } from "./hooks/useFetchPokemon";

function App() {
  const getPokemon = async () => {
    const currentPokemon = await fetchPokemon("charmAnder");
    console.log(currentPokemon);
  };

  getPokemon();

  return (
    <>
      <div>Hello</div>
    </>
  );
}

export default App;
