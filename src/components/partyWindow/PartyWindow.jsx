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
  // const handleTypeMatchUps = () => {
  //   currentParty.typesPresent.forEach((type) => {
  //     determineTypeCoverages(type);
  //   });
  // };
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
          <div className="noEffect">
            <p>No Effect:</p>
          </div>
          <div className="resisted">
            <p>Resisted:</p>
          </div>
          <div className="neutral">
            <p>Neutral:</p>
          </div>
          <div className="superEffective">
            <p>Super Effective:</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyWindow;
