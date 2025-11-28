// Konfigurasi game
const config = {
    boardWidth: 31, // Lebar papan game (kolom)
    boardHeight: 21, // Tinggi papan game (baris)
    cellSize: 20, // Ukuran setiap sel dalam pixel
    pacmanSpeed: 150, // Kecepatan Pacman (ms)
    ghostSpeed: 200, // Kecepatan hantu (ms)
    scaredTime: 10000 // Waktu mode takut (ms)
};

// Status game
let gameState = {
    score: 0, // Skor pemain
    lives: 3, // Jumlah nyawa
    dots: 0, // Jumlah titik yang tersisa
    isRunning: false, // Status apakah game sedang berjalan
    isScared: false, // Status apakah hantu dalam mode takut
    scaredTimer: null // Timer untuk mode takut
};

// Posisi dan arah Pacman
let pacman = {
    x: 15, // Posisi X awal Pacman
    y: 15, // Posisi Y awal Pacman
    direction: 'right', // Arah awal Pacman
    nextDirection: 'right' // Arah berikutnya yang diminta
};

// Array untuk hantu
let ghosts = [
    { name: 'blinky', x: 15, y: 7, direction: 'left', color: 'red' }, // Hantu Blinky
    { name: 'pinky', x: 15, y: 9, direction: 'up', color: 'pink' }, // Hantu Pinky
    { name: 'inky', x: 14, y: 9, direction: 'down', color: 'cyan' }, // Hantu Inky
    { name: 'clyde', x: 16, y: 9, direction: 'right', color: 'orange' } // Hantu Clyde
];

// Peta game - 1: dinding, 0: titik biasa, 2: power pellet
const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,0,1],
    [1,2,1,1,0,1,1,1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,2,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1],
    [0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1],
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1],
    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1],
    [1,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2,1],
    [1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Mendapatkan elemen DOM
const gameBoard = document.getElementById('game-board'); // Elemen papan game
const scoreElement = document.getElementById('score'); // Elemen skor
const livesElement = document.getElementById('lives'); // Elemen nyawa
const startBtn = document.getElementById('start-btn'); // Tombol mulai
const resetBtn = document.getElementById('reset-btn'); // Tombol reset
const restartBtn = document.getElementById('restart-btn'); // Tombol restart
const playAgainBtn = document.getElementById('play-again-btn'); // Tombol main lagi
const gameOverScreen = document.getElementById('game-over'); // Layar game over
const gameWonScreen = document.getElementById('game-won'); // Layar menang
const finalScoreElement = document.getElementById('final-score'); // Elemen skor akhir
const winScoreElement = document.getElementById('win-score'); // Elemen skor menang

// Mendapatkan elemen audio
const eatSound = document.getElementById('eat-sound'); // Suara saat makan titik
const backgroundSound = document.getElementById('background-sound'); // Suara background
const gameoverSound = document.getElementById('gameover-sound'); // Suara game over
const victorySound = document.getElementById('victory-sound'); // Suara kemenangan