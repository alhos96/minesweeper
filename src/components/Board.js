import React, { useState } from "react";
import Game from "./Game";

function Board() {
  const [mineCount, setMineCount] = useState(10);
  return (
    <div className="box board-wrapp">
      <div className="box-reverse score">{mineCount < 10 ? `0${mineCount}` : mineCount}</div>
      <Game mineCount={mineCount} setMineCount={setMineCount}></Game>
    </div>
  );
}

export default Board;
