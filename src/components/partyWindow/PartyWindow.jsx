import { useEffect, useState } from "react";
import { useGlobalState } from "../../lib/globalState";
import "./partyWindow.css";
import { determineTypeCoverages } from "../../hooks/useDetermineTypeCoverages";

const PartyWindow = () => {
  const { currentParty, setCurrentParty, partyList, setPartyList } =
    useGlobalState();

  const [newPartyName, setNewPartyName] = useState("");

  const handleAddParty = () => {
    if (!newPartyName.trim()) return;

    const fullParty = {
      partyName: newPartyName,
      party: currentParty.party,
    };

    setPartyList([...partyList, fullParty]);
    setCurrentParty(fullParty);
    setNewPartyName("");
  };

  const handleDeleteParty = () => {
    const newPartyList = partyList.filter(
      (party) => party.partyName !== currentParty.partyName
    );
    setPartyList(newPartyList);
    setCurrentParty({ partyName: "", party: [] });
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
    });
    setNewPartyName("");
  };

  const [unaffectedTypes, setUnaffectedTypes] = useState([]);
  const [resistedTypes, setResistedTypes] = useState([]);
  const [neutralTypes, setNeutralTypes] = useState([]);
  const [superEffectedTypes, setSuperEffectedTypes] = useState([]);
  const handleTypeMatchUps = () => {
    currentParty.typesPresent.forEach((type) => {
      const [unaffected, resisted, neutral, superEff] =
        determineTypeCoverages(type);

      const unaffectedSet = new Set();
      const resistedSet = new Set();
      const neutralSet = new Set();
      const superEffSet = new Set();

      unaffected.forEach((type) => unaffectedSet.add(type));
      resisted.forEach((type) => resistedSet.add(type));
      neutral.forEach((type) => neutralSet.add(type));
      superEff.forEach((type) => superEffSet.add(type));

      setUnaffectedTypes([...unaffectedSet]);
      setResistedTypes([...resistedSet]);
      setNeutralTypes([...neutralSet]);
      setSuperEffectedTypes([...superEffSet]);
    });
  };

  useEffect(() => {
    handleTypeMatchUps();
    console.log("Unaffected Types: ", unaffectedTypes);
    console.log("Resisted Types: ", resistedTypes);
    console.log("Neutral Types: ", neutralTypes);
    console.log("Super Effected Types: ", superEffectedTypes);
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
            <div className="submitNameIcon" onClick={handleAddParty}>
              Save
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
          <p key={index}>{pokemon}</p>
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
            {currentParty.typesPresent.map((type, index) => (
              <p key={index}>{type}</p>
            ))}
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
