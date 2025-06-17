import { useEffect, useState } from "react";
import { useGlobalState } from "../../lib/globalState";
import "./partyWindow.css";
import { determineTypeCoverages } from "../../hooks/useDetermineTypeCoverages";
import { determineTypesPresent } from "../../hooks/useDetermineTypesPresent";

const PartyWindow = () => {
  const {
    currentParty,
    setCurrentParty,
    partyList,
    setPartyList,
    setSearchedPokemon,
  } = useGlobalState();

  const [newPartyName, setNewPartyName] = useState("");

  const handleAddParty = () => {
    if (!newPartyName.trim()) {
      alert("The party is missing a name!");
      return;
    }
    const partyExists = partyList.find(
      (party) => party.partyName === newPartyName
    );

    if (!partyExists) {
      const fullParty = {
        partyName: newPartyName,
        party: currentParty.party,
        typesPresent: currentParty.typesPresent || [],
      };

      setPartyList([...partyList, fullParty]);
      setCurrentParty(fullParty);
      setNewPartyName("");
    } else {
      alert("A team with this name already exists.");
    }
  };

  const handleDeleteParty = () => {
    const newPartyList = partyList.filter(
      (party) => party.partyName !== currentParty.partyName
    );
    setPartyList(newPartyList);
    setCurrentParty({ partyName: "", party: [], typesPresent: [] });
    setUnaffectedTypes([]);
    setResistedTypes([]);
    setNeutralTypes([]);
    setSuperEffectedTypes([]);
    setWeaknesses([]);
  };

  const handleSelectParty = (e) => {
    const selectedParty = partyList.find(
      (party) => party.partyName === e.target.value
    );

    if (selectedParty) {
      setCurrentParty(selectedParty);
    }
  };

  const handlePartyReset = () => {
    setCurrentParty({
      partyName: "",
      party: [],
      typesPresent: [],
    });
    setNewPartyName("");
    setUnaffectedTypes([]);
    setResistedTypes([]);
    setNeutralTypes([]);
    setSuperEffectedTypes([]);
    setWeaknesses([]);
  };

  const [unaffectedTypes, setUnaffectedTypes] = useState([]);
  const [resistedTypes, setResistedTypes] = useState([]);
  const [neutralTypes, setNeutralTypes] = useState([]);
  const [superEffectedTypes, setSuperEffectedTypes] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const handleTypeMatchUps = () => {
    currentParty?.typesPresent?.forEach((type) => {
      const [unaffected, resisted, neutral, superEff, weaknesses] =
        determineTypeCoverages(type);

      const unaffectedSet = new Set();
      const resistedSet = new Set();
      const neutralSet = new Set();
      const superEffSet = new Set();
      const weakSet = new Set();

      unaffected.forEach((type) => unaffectedSet.add(type));
      resisted.forEach((type) => resistedSet.add(type));
      neutral.forEach((type) => neutralSet.add(type));
      superEff.forEach((type) => superEffSet.add(type));
      weaknesses.forEach((type) => weakSet.add(type));

      setUnaffectedTypes([...unaffectedSet]);
      setResistedTypes([...resistedSet]);
      setNeutralTypes([...neutralSet]);
      setSuperEffectedTypes([...superEffSet]);
      setWeaknesses([...weakSet]);
    });
  };

  const handleRemoveFromParty = async (index) => {
    if (currentParty.party.length < 2) {
      alert("You cannot have less than 1 Pokemon in a party!");
      return;
    }
    const updatedParty = currentParty.party.filter((_, i) => i !== index);
    const currentTypes = await determineTypesPresent(updatedParty);
    const updated = {
      ...currentParty,
      party: updatedParty,
      typesPresent: currentTypes,
    };
    setCurrentParty(updated);

    setPartyList((prev) =>
      prev.map((p) =>
        p.partyName === currentParty.partyName ? { ...updated } : p
      )
    );
  };

  const handlePartyUpdate = () => {
    const partyIndex = partyList.findIndex(
      (party) => party.partyName === currentParty.partyName
    );

    if (partyIndex !== -1) {
      const updatedParty = {
        ...partyList[partyIndex],
        partyName: newPartyName !== "" ? newPartyName : currentParty.partyName,
        party: currentParty.party,
        typesPresent: currentParty.typesPresent,
      };

      const updatedList = [
        ...partyList.slice(0, partyIndex),
        updatedParty,
        ...partyList.slice(partyIndex + 1),
      ];
      setPartyList(updatedList);
    }
  };

  useEffect(() => {
    handleTypeMatchUps();
    console.log(currentParty);
  }, [currentParty]);
  return (
    <div className="mainPartyWindowContainer">
      <div className="partyDisplay">
        <div className="displayBanner">
          <div className="partyName">
            <input
              type="text"
              value={newPartyName}
              placeholder={
                currentParty.partyName !== ""
                  ? currentParty.partyName
                  : "Enter Party Name"
              }
              onChange={(e) => setNewPartyName(e.target.value)}
            />
            <div className="submitNameIcon">
              {partyList.some((p) => p.partyName === currentParty.partyName) ? (
                <p onClick={handlePartyUpdate}>Update</p>
              ) : (
                <p onClick={handleAddParty}>Save</p>
              )}
            </div>
          </div>
          <div className="partyActions">
            <p onClick={handlePartyReset}>New Party</p>
            <div className="partyMenu">
              <select
                value={currentParty.partyName}
                onChange={handleSelectParty}
              >
                <option value="" disabled hidden>
                  Select Party
                </option>
                {partyList.map((party, index) => (
                  <option key={index} value={party.partyName}>
                    {party.partyName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {currentParty?.party?.map((pokemon, index) => (
          <div key={index} className="party">
            <div className="partyPokemon">
              <p onClick={() => setSearchedPokemon(pokemon)}>{pokemon}</p>
            </div>
            <p onClick={() => handleRemoveFromParty(index)}>Remove</p>
          </div>
        ))}
        <div className="displayFooter">
          <p onClick={handleDeleteParty}>Delete Party</p>
        </div>
      </div>
      <div className="partyAnalysis">
        <p>Party Analysis</p>
        <div className="typingContainer">
          <div className="typesPresent">
            <p>Types Present:</p>
            {currentParty?.typesPresent?.map((type, index) => (
              <p key={index}>{type}</p>
            ))}
          </div>
          <div className="weaknesses coverage">
            <p>Weak To:</p>
            <div className="matchUps">
              {weaknesses.map((type, index) => (
                <p key={index}>{type}</p>
              ))}
            </div>
          </div>
          <div className="noEffect coverage">
            <p>No Effect:</p>
            <div className="matchUps">
              {unaffectedTypes.map((type, index) => (
                <p key={index}>{type}</p>
              ))}
            </div>
          </div>
          <div className="resisted coverage">
            <p>Resisted:</p>
            <div className="matchUps">
              {resistedTypes.map((type, index) => (
                <p key={index}>{type}</p>
              ))}
            </div>
          </div>
          <div className="neutral coverage">
            <p>Neutral:</p>
            <div className="matchUps">
              {neutralTypes.map((type, index) => (
                <p key={index}>{type}</p>
              ))}
            </div>
          </div>
          <div className="superEffective coverage">
            <p>Super Effective On:</p>
            <div className="matchUps">
              {superEffectedTypes.map((type, index) => (
                <p key={index}>{type}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyWindow;
