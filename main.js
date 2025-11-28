// Variabel untuk melacak waktu gerakan terakhir
let lastPacmanMove = 0;
let lastGhostMove = 0;

// Fungsi game loop utama
function gameLoop(timestamp) {
    if (!gameState.isRunning) return; // Hentikan jika game tidak berjalan
    
    requestAnimationFrame(gameLoop); // Request frame berikutnya
    
    // Gerakkan Pacman jika sudah waktunya
    if (timestamp - lastPacmanMove > config.pacmanSpeed) {
        movePacman();
        lastPacmanMove = timestamp;
    }
    
    // Gerakkan hantu jika sudah waktunya
    if (timestamp - lastGhostMove > config.ghostSpeed) {
        moveGhosts();
        lastGhostMove = timestamp;
    }
}

// Event listener untuk tombol mulai
startBtn.addEventListener('click', () => {
    if (!gameState.isRunning) {
        gameState.isRunning = true; // Set status game berjalan
        
        // Mainkan suara background
        backgroundSound.play().catch(e => console.log("Error playing background sound: ", e));
        
        gameLoop(); // Mulai game loop
    }
});

// Event listener untuk tombol reset
resetBtn.addEventListener('click', resetGame);

// Event listener untuk tombol restart
restartBtn.addEventListener('click', resetGame);

// Event listener untuk tombol main lagi
playAgainBtn.addEventListener('click', resetGame);

// Event listener untuk keyboard
document.addEventListener('keydown', (e) => {
    if (!gameState.isRunning) return; // Abaikan jika game tidak berjalan
    
    // Set arah berikutnya berdasarkan tombol panah
    switch (e.key) {
        case 'ArrowUp':
            pacman.nextDirection = 'up';
            break;
        case 'ArrowDown':
            pacman.nextDirection = 'down';
            break;
        case 'ArrowLeft':
            pacman.nextDirection = 'left';
            break;
        case 'ArrowRight':
            pacman.nextDirection = 'right';
            break;
    }
});

// Fungsi inisialisasi game
function init() {
    createBoard(); // Buat papan game
    drawPacman(); // Gambar Pacman
    drawGhosts(); // Gambar hantu
    updateScore(); // Perbarui skor
    updateLives(); // Perbarui nyawa
    
    // Set volume default untuk semua suara
    eatSound.volume = 0.7;
    backgroundSound.volume = 0.5;
    gameoverSound.volume = 0.7;
    victorySound.volume = 0.7;
}

// Jalankan inisialisasi saat halaman dimuat
init();