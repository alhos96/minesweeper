import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import traverseBoard from "./functions";

function Game({ mineCount, setMineCount }) {
  const [boardData, setBoardData] = useState(initBoard(8, 8));
  const [gameWon, setGameWon] = useState(false);
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(false);
  const [victory, setVictory] = useState(false);

  function renderBoard(data) {
    return data.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <div key={Math.random()}>
            <Cell
              onClick={() => handleClick(dataitem.x, dataitem.y)}
              onRightClick={(e) => handleRightClick(e, dataitem.x, dataitem.y)}
              value={dataitem}
            ></Cell>
            {/* {datarow[datarow.length - 1] === dataitem ? <div className="clear"></div> : "ss"} */}
          </div>
        );
      });
    });
  }

  function initBoard(height, width) {
    let data = [];

    for (let i = 0; i < height; i++) {
      data.push([]);

      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    plantMines(data);
    getNeighbours(data);
    return data;
  }

  function getFlags(data) {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (dataitem.isFlagged) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  function revealBoard() {
    let updatedData = boardData;
    updatedData.map((datarow) => {
      datarow.map((dataitem) => {
        dataitem.isRevealed = true;
      });
    });
    setBoardData(updatedData);
  }

  function revealEmpty(x, y, data) {
    let area = traverseBoard(x, y, data);
    area.map((value) => {
      if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          revealEmpty(value.x, value.y, data);
        }
      }
    });
    return data;
  }

  function getHidden(data) {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (!dataitem.isRevealed) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  function getMines(data) {
    let mineArray = [];

    data.map((datarow) => {
      datarow.map((dataitem) => {
        if (dataitem.isMine) {
          mineArray.push(dataitem);
        }
      });
    });

    return mineArray;
  }

  function handleClick(x, y) {
    let win = false;

    console.log(boardData.isRevealed);

    if (boardData[x][y].isRevealed) return null;

    if (boardData[x][y].isMine) {
      revealBoard();
      setVisible(true);
      setVictory(true);
    }

    let updatedData = boardData;
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = revealEmpty(x, y, updatedData);
    }

    if (getHidden(updatedData).length === 10) {
      win = true;
      revealBoard();
      setVisible(true);
    }

    setBoardData(updatedData);
    setMineCount(10 - getFlags(updatedData).length);
    setGameWon(win);
    setCounter((e) => e + 1);
  }

  function handleRightClick(e, x, y) {
    e.preventDefault();
    let updatedData = boardData;
    let mines = mineCount;
    let win = false;

    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      updatedData[x][y].isFlagged = true;
      if (mineCount > 0) {
        mines--;
      }
    }

    if (mines === 0) {
      const mineArray = getMines(updatedData);
      const flagArray = getFlags(updatedData);

      win = JSON.stringify(mineArray) === JSON.stringify(flagArray);
      if (win) {
        revealBoard();
        setVisible(true);
      }
    }
    setBoardData(updatedData);
    setMineCount(mines);
    setGameWon(win);
  }

  function plantMines(data) {
    let randomX = 0;
    let randomY = 0;
    let minesPlanted = 0;

    while (minesPlanted < 10) {
      randomX = Math.floor(Math.random() * 1000 + 1) % 8;
      randomY = Math.floor(Math.random() * 1000 + 1) % 8;
      if (!data[randomX][randomY].isMine) {
        data[randomX][randomY].isMine = true;
        minesPlanted++;
      }
    }
    return data;
  }

  function getNeighbours(data) {
    let updatedData = data;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map((value) => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].neighbour = mine;
        }
      }
    }
    return updatedData;
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const showButton = visible ? "play-again-button" : "hidden";
  return (
    <div className="board box-reverse">
      <button className={showButton} onClick={refreshPage}>
        {" "}
        {victory ? "You lost!" : "Well done!"} <br></br>
        Play again?
      </button>
      {renderBoard(boardData)}
    </div>
  );
}

export default Game;
