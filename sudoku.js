const puzzle = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

const solution = [
  [5,3,4,6,7,8,9,1,2],
  [6,7,2,1,9,5,3,4,8],
  [1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],
  [4,2,6,8,5,3,7,9,1],
  [7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],
  [2,8,7,4,1,9,6,3,5],
  [3,4,5,2,8,6,1,7,9]
];

const board = document.getElementById("sudoku-board");

function clearHighlights() {
  document
    .querySelectorAll(".sudoku-cell")
    .forEach(cell => cell.classList.remove("active"));
}

function highlight(row, col) {

  clearHighlights();

  document
    .querySelectorAll(".sudoku-cell")
    .forEach(cell => {

      if (
        cell.dataset.row == row ||
        cell.dataset.col == col
      ) {
        cell.classList.add("active");
      }

    });
}

function validateCell(cell) {

  if (cell.readOnly) return;

  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);

  if (cell.value === "") {
    cell.classList.remove("correct");
    cell.classList.remove("wrong");
    return;
  }

  if (Number(cell.value) === solution[row][col]) {
    cell.classList.add("correct");
    cell.classList.remove("wrong");
  } else {
    cell.classList.add("wrong");
    cell.classList.remove("correct");
  }
}

function renderBoard() {

  board.innerHTML = "";

  for (let r = 0; r < 9; r++) {

    for (let c = 0; c < 9; c++) {

      const input = document.createElement("input");

      input.type = "text";
      input.maxLength = 1;

      input.className = "sudoku-cell";

      input.dataset.row = r;
      input.dataset.col = c;

      if (c === 2 || c === 5) {
  input.classList.add("box-right");
}

if (r === 2 || r === 5) {
  input.classList.add("box-bottom");
}
      if (puzzle[r][c] !== 0) {

        input.value = puzzle[r][c];
        input.readOnly = true;

        input.classList.add("given");

      } else {

        input.addEventListener("input", () => {

          input.value = input.value.replace(/[^1-9]/g, "");

          validateCell(input);

        });

        input.addEventListener("focus", () => {
          highlight(r, c);
        });

      }

      board.appendChild(input);

    }
  }
}

renderBoard();

const newGame = document.getElementById("new-game");

if (newGame) {

  newGame.addEventListener("click", e => {

    e.preventDefault();

    location.reload();

  });

}