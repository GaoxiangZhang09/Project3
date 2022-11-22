import { useState } from "react";
function HomeMintResultItem(props) {
  // console.log(props.thisHistory)
  const [mouse, setMouse] = useState(false);
  const history = props.thisHistory;
  const deleteMintById = props.deleteMintById;
  const updateMintNameById = props.updateMintNameById;

  //fucntion change div color when hover above
  const handleMouse = (flag) => {
    return () => {
      setMouse(flag);
    };
  };

  return (
    <div
      className="HomeMintResultItem"
      style={{ backgroundColor: mouse ? "pink" : "white" }}
      onMouseLeave={handleMouse(false)}
      onMouseEnter={handleMouse(true)}
    >
      <h3>
        Name: <span>{history.name}</span>
      </h3>
      <h3>
        Number: <span>{history.number}</span>
      </h3>
      <h3>
        MintDate: <span>{history.date}</span>
      </h3>
      <button
        className="btn btn-info"
        onClick={() => updateMintNameById(history._id)}
      >
        Update Name
      </button>
      <button
        className="btn btn-danger"
        onClick={() => deleteMintById(history._id)}
      >
        Delete
      </button>
    </div>
  );
}

HomeMintResultItem.propTypes = {};

export default HomeMintResultItem;
