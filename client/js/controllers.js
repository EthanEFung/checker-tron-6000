//todo
let currentMove = null;

function createSqCtrl(sq, i, j) {
  const $sq = document.createElement("td");

  $sq.setAttribute("id", `${i}-${j}`);
  $sq.setAttribute("class", `square ${colorSq(i, j)}`);

  $sq.addEventListener("dragstart", e => {
    currentMove = moveFrom(`${i}-${j}`);
  });
  $sq.addEventListener("dragover", e => {
    e.preventDefault();
  });
  $sq.addEventListener("drop", e => {
    currentMove.to(`${i}-${j}`);
  });
  return $sq;
}

function colorSq(i, j) {
  if ((i + j) % 2 === 1) return "dark";
  return "light";
}

function createCheckerCtrl(checker, i, j) {
  const $checker = document.createElement("span");
  $checker.setAttribute("class", `checker ${colorChecker(checker)}`);
  $checker.setAttribute("draggable", true);
  return $checker;
}

function colorChecker(checker) {
  return checker.side;
}

function getBoard() {
  fetch("/start")
    .then(res => res.json())
    .then(data => {
      renderView(data);
    })
    .then(() => {})
    .catch(err => {
      throw err;
    });
}

function moveFrom(currSq) {
  const payload = { currSq: currSq };
  const data = new FormData();
  return {
    to: targetSq => {
      payload.targetSq = targetSq;
      const json = JSON.stringify(payload);
      const myInit = {
        method: "POST",
        mode: "cors",
        cache: "default",
        body: json
      };

      data.append("json", json);

      fetch(`/move/`, myInit)
        .then(res => res.json())
        .then(data => {
          renderView(data);
          currentMove = null;
        })
        .catch(err => {
          throw err;
        });
    }
  };
}
