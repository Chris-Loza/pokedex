import { useState } from "react";
import { useGlobalState } from "../../lib/globalState";
import "./partyWindow.css";

const PartyWindow = () => {
  const { currentParty, setCurrentParty, partyList, setPartyList } =
    useGlobalState();

  // const [newParty, setNewParty] = useState({
  //   partyName: "",
  //   party: [],
  // });

  const handleAddParty = () => {
    const partyToBeAdded = {
      partyName: "",
      party: currentParty,
    };
    const newPartyList = [...partyList, partyToBeAdded];
    setPartyList(newPartyList);
  };

  console.log(partyList);
  return (
    <div className="mainPartyWindowContainer">
      <div className="partyDisplay">
        <div className="displayBanner">
          <p>Party Name</p>
          <div className="partyActions">
            <p>New Party</p>
            <div className="partyMenu">
              <select defaultValue="">
                <option value="" disabled hidden>
                  Select Party
                </option>
                <option value="">Party 1</option>
                {partyList.map((party, index) => (
                  <option key={index} value={party.partyName}>{party.partyName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {currentParty.map((pokemon, index) => (
          <p key={index}>{pokemon}</p>
        ))}
        <div className="displayFooter">
          <p onClick={handleAddParty}>Save Party</p>
          <p>Delete Party</p>
        </div>
      </div>
      <div className="partyAnalysis">
        <p>Party Analysis</p>
        <p>Type Coverage</p>
        <p>Type Weaknesses</p>
      </div>
    </div>
  );
};

export default PartyWindow;
