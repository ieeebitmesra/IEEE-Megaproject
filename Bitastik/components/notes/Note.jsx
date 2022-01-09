import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h3 style={{color:"#222024"}} className="hii">{props.title}</h3>
      <p>{props.note}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
