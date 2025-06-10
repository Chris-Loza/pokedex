import { useGlobalState } from "../../lib/globalState";
import "./partyWindow.css";

const PartyWindow = () => {
  const { currentParty, setCurrentParty } = useGlobalState();
  return (
    <div className="mainPartyWindowContainer">
      <div className="partyDisplay">
        <div className="displayBanner">
          <p>Party Name</p>
          <p>Select Party</p>
        </div>
        {currentParty.map((pokemon, index) => (
          <p key={index}>{pokemon}</p>
        ))}
        <div className="displayFooter">
          <p>Save Party</p>
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
