function renderView(data) {
  const { board, turns, activePlayer, winner } = data;
  const $board = renderBoard(board);
  board.forEach((row, i) => {
    const $row = renderRow();
    $board.appendChild($row);
    row.forEach((sq, j) => {
      const $sq = createSqCtrl(sq, i, j);
      $row.appendChild($sq);
      if (sq) {
        const $checker = createCheckerCtrl(sq);
        $sq.appendChild($checker);
      }
    });
  });
}

function renderBoard(board) {
  let $board;
  if (document.getElementById("board")) {
    $board = document.getElementById("board");
    while ($board.firstChild) {
      $board.removeChild($board.firstChild);
    }
  } else {
    $board = document.createElement("tbody");
    $board.setAttribute("id", "board");
  }

  return $board;
}

function renderRow(row) {
  const $row = document.createElement("tr");
  $row.setAttribute("class", "row");
  return $row;
}

window.onload = function() {
  const board = getBoard();
  const $board = renderBoard(board);
  document.body.appendChild($board);
};
