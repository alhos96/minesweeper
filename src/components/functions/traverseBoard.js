export function traverseBoard(x, y, data) {
  const el = [];

  //up
  if (x > 0) {
    el.push(data[x - 1][y]);
  }

  //down
  if (x < 8 - 1) {
    el.push(data[x + 1][y]);
  }

  //left
  if (y > 0) {
    el.push(data[x][y - 1]);
  }

  //right
  if (y < 8 - 1) {
    el.push(data[x][y + 1]);
  }

  // top left
  if (x > 0 && y > 0) {
    el.push(data[x - 1][y - 1]);
  }

  // top right
  if (x > 0 && y < 8 - 1) {
    el.push(data[x - 1][y + 1]);
  }

  // bottom right
  if (x < 8 - 1 && y < 8 - 1) {
    el.push(data[x + 1][y + 1]);
  }

  // bottom left
  if (x < 8 - 1 && y > 0) {
    el.push(data[x + 1][y - 1]);
  }

  return el;
}
