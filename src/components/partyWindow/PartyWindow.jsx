import { useState } from "react";
import { useGlobalState } from "../../lib/globalState";
import "./partyWindow.css";

const PartyWindow = () => {
  const { currentParty, setCurrentParty, partyList, setPartyList } =
    useGlobalState();

  const [newParty, setNewParty] = useState({
    partyName: "",
    party: [],
    partyNum: 0,
  });

  const handleAddParty = () => {
    setNewParty({
      ...newParty,
      party: currentParty.party,
      partyNum: partyList.length,
    });
    const newPartyList = [...partyList, newParty];
    setPartyList(newPartyList);
  };

  const handleDeleteParty = () => {};
  console.log(currentParty.party);
  console.log(newParty.partyName);
  console.log(partyList);
  return (
    <div className="mainPartyWindowContainer">
      <div className="partyDisplay">
        <div className="displayBanner">
          <div className="partyName">
            <input
              type="text"
              id="partyName"
              placeholder="Enter Party Name"
              onChange={(e) =>
                setNewParty({ ...newParty, partyName: e.target.value })
              }
            />
          </div>
          <div className="partyActions">
            <p>New Party</p>
            <div className="partyMenu">
              <select defaultValue="">
                <option value="" disabled hidden>
                  Select Party
                </option>
                <option value="">Party 1</option>
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
