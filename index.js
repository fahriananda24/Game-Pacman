const board = document.getElementById("game-board");
const scoreEl = document.getElementById("score");
const nyawaEl = document.getElementById("nyawa");

const kalahBox = document.getElementById("kalah");
const menangBox = document.getElementById("menang");

const skorKalah = document.getElementById("skor-kalah");
const skorMenang = document.getElementById("skor-menang");

const ulangBtn = document.getElementById("ulang-meneh");
const menangBtn = document.getElementById("dolanan-meneh");

const startBtn = document.getElementById("start-button");
const resetBtn = document.getElementById("reset-button");

let score = 0;
let nyawa = 3;
let pacmanPos = 17;
let ghostPos = 200;

let cells = [];
let intervalGhost;
let gameStarted = false;

const boardMap = [
    // 16x16 grid
    "################",
    "#..............#",
    "#.####.####.###.#",
    "#..............#",
    "####.######.#####",
    "#...............#",
    "#.###.######.###.#",
    "#..............#",
    "#.######.#######.#",
    "#...............#",
    "#####.######.#####",
    "#...............#",
    "#.###.######.###.#",
    "#..............#",
    "#..............#",
    "################",
];

function setupBoard() {
    board.innerHTML = "";
    cells = [];

    boardMap.forEach(row => {
        row.split("").forEach(c => {
            const div = document.createElement("div");
            div.classList.add("cell");

            if (c === "#") div.classList.add("wall");
            if (c === ".") div.classList.add("coin");

            board.appendChild(div);
            cells.push(div);
        });
    });

    pacmanPos = 17;
    ghostPos = 200;

    renderPacman();
    renderGhost();
}

function renderPacman() {
    cells.forEach(c => c.classList.remove("pacman"));
    cells[pacmanPos].classList.add("pacman");
}

function renderGhost() {
    cells.forEach(c => c.classList.remove("ghost"));
    cells[ghostPos].classList.add("ghost");
}

function movePacman(dir) {
    if (!gameStarted) return;

    let nextPos = pacmanPos + dir;

    if (cells[nextPos].classList.contains("wall")) return;

    pacmanPos = nextPos;

    if (cells[pacmanPos].classList.contains("coin")) {
        score++;
        scoreEl.textContent = score;
        cells[pacmanPos].classList.remove("coin");

        if (document.querySelectorAll(".coin").length === 0) {
            menang();
        }
    }

    if (pacmanPos === ghostPos) {
        nyawa--;
        nyawaEl.textContent = nyawa;
        if (nyawa <= 0) kalah();
    }

    renderPacman();
}

function moveGhost() {
    const arah = [1, -1, 16, -16];
    const dir = arah[Math.floor(Math.random() * arah.length)];
    let nextPos = ghostPos + dir;

    if (!cells[nextPos].classList.contains("wall")) {
        ghostPos = nextPos;
    }

    renderGhost();

    if (ghostPos === pacmanPos) {
        nyawa--;
        nyawaEl.textContent = nyawa;
        if (nyawa <= 0) kalah();
    }
}

function startGame() {
    if (gameStarted) return;

    gameStarted = true;
    intervalGhost = setInterval(moveGhost, 400);
}

function resetGame() {
    clearInterval(intervalGhost);
    score = 0;
    nyawa = 3;

    scoreEl.textContent = 0;
    nyawaEl.textContent = 3;

    kalahBox.classList.add("hidden");
    menangBox.classList.add("hidden");

    gameStarted = false;

    setupBoard();
}

function kalah() {
    clearInterval(intervalGhost);
    gameStarted = false;

    skorKalah.textContent = score;
    kalahBox.classList.remove("hidden");
}

function menang() {
    clearInterval(intervalGhost);
    gameStarted = false;

    skorMenang.textContent = score;
    menangBox.classList.remove("hidden");
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") movePacman(-1);
    if (e.key === "ArrowRight") movePacman(1);
    if (e.key === "ArrowUp") movePacman(-16);
    if (e.key === "ArrowDown") movePacman(16);
});

startBtn.onclick = startGame;
resetBtn.onclick = resetGame;
ulangBtn.onclick = resetGame;
menangBtn.onclick = resetGame;

setupBoard();
