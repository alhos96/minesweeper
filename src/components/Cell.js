import React from "react";

function Cell({ value, onClick, onRightClick }) {
  const className = " cell" + (value.isRevealed ? "" : " box") + (value.isMine ? " is-mine" : "") + (value.isFlagged ? " is-flag" : "");

  console.log(value);
  function getValue() {
    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;
  }

  return (
    <div className={className} onClick={onClick} onContextMenu={onRightClick}>
      {getValue()}
    </div>
  );
}

export default Cell;
