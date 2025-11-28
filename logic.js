
// Fungsi untuk memeriksa tabrakan dengan titik
function checkDotCollision() {
    const cell = document.getElementById(`cell-${pacman.x}-${pacman.y}`);
    
    // Cek apakah ada titik
    const dot = cell.querySelector('.dot');
    if (dot) {
        dot.remove(); // Hapus titik
        gameState.score += 10; // Tambah skor
        gameState.dots--; // Kurangi jumlah titik
        updateScore(); // Perbarui tampilan skor
        
        // Mainkan suara makan
        playEatSound();
    }
    
    // Cek apakah ada power pellet
    const powerPellet = cell.querySelector('.power-pellet');
    if (powerPellet) {
        powerPellet.remove(); // Hapus power pellet
        gameState.score += 50; // Tambah skor lebih banyak
        gameState.dots--; // Kurangi jumlah titik
        updateScore(); // Perbarui tampilan skor
        
        // Mainkan suara makan
        playEatSound();
        
        // Aktifkan mode scared
        activateScaredMode();
    }
    
    // Cek apakah semua titik telah dimakan
    if (gameState.dots === 0) {
        winGame(); // Panggil fungsi menang
    }
}

// Fungsi untuk memeriksa tabrakan dengan hantu
function checkGhostCollision() {
    for (const ghost of ghosts) {
        if (pacman.x === ghost.x && pacman.y === ghost.y) {
            if (gameState.isScared) {
                // Hantu dimakan
                resetGhost(ghost);
                gameState.score += 200; // Tambah skor besar
                updateScore(); // Perbarui tampilan skor
                
                // Mainkan suara makan
                playEatSound();
            } else {
                // Pacman dimakan
                loseLife(); // Kurangi nyawa
            }
            break;
        }
    }
}

// Fungsi untuk reset posisi hantu
function resetGhost(ghost) {
    ghost.x = 15; // Kembalikan ke posisi awal X
    ghost.y = 9; // Kembalikan ke posisi awal Y
}

// Fungsi untuk kehilangan nyawa
function loseLife() {
    gameState.lives--; // Kurangi nyawa
    updateLives(); // Perbarui tampilan nyawa
    
    if (gameState.lives <= 0) {
        gameOver(); // Jika nyawa habis, game over
    } else {
        // Reset posisi Pacman dan hantu
        resetPositions();
    }
}

// Fungsi untuk reset posisi semua karakter
function resetPositions() {
    // Reset posisi Pacman
    pacman.x = 15;
    pacman.y = 15;
    pacman.direction = 'right';
    pacman.nextDirection = 'right';
    
    // Reset posisi hantu
    ghosts[0] = { name: 'blinky', x: 15, y: 7, direction: 'left', color: 'red' };
    ghosts[1] = { name: 'pinky', x: 15, y: 9, direction: 'up', color: 'pink' };
    ghosts[2] = { name: 'inky', x: 14, y: 9, direction: 'down', color: 'cyan' };
    ghosts[3] = { name: 'clyde', x: 16, y: 9, direction: 'right', color: 'orange' };
    
    drawPacman(); // Gambar Pacman
    drawGhosts(); // Gambar hantu
}

// Fungsi untuk game over
function gameOver() {
    gameState.isRunning = false; // Hentikan game
    finalScoreElement.textContent = gameState.score; // Tampilkan skor akhir
    gameOverScreen.style.display = 'block'; // Tampilkan layar game over
    
    // Hentikan suara background
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
    
    // Mainkan suara game over
    gameoverSound.play().catch(e => console.log("Error playing gameover sound: ", e));
}

// Fungsi untuk menang
function winGame() {
    gameState.isRunning = false; // Hentikan game
    winScoreElement.textContent = gameState.score; // Tampilkan skor menang
    gameWonScreen.style.display = 'block'; // Tampilkan layar menang
    
    // Hentikan suara background
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
    
    // Mainkan suara kemenangan
    victorySound.play().catch(e => console.log("Error playing victory sound: ", e));
}

// Fungsi untuk reset game
function resetGame() {
    // Reset status game
    gameState.score = 0;
    gameState.lives = 3;
    gameState.isRunning = false;
    gameState.isScared = false;
    
    // Hapus timer scared jika ada
    if (gameState.scaredTimer) {
        clearTimeout(gameState.scaredTimer);
    }
    
    // Hentikan semua suara
    eatSound.pause();
    eatSound.currentTime = 0;
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
    gameoverSound.pause();
    gameoverSound.currentTime = 0;
    victorySound.pause();
    victorySound.currentTime = 0;
    
    updateScore(); // Perbarui tampilan skor
    updateLives(); // Perbarui tampilan nyawa
    
    resetPositions(); // Reset posisi karakter
    createBoard(); // Buat ulang papan game
    
    // Sembunyikan layar game over dan menang
    gameOverScreen.style.display = 'none';
    gameWonScreen.style.display = 'none';
}

// Fungsi untuk memainkan suara makan
function playEatSound() {
    eatSound.currentTime = 0; // Set ulang waktu pemutaran
    eatSound.play().catch(e => console.log("Error playing eat sound: ", e)); // Mainkan suara
}

// Fungsi untuk mengaktifkan mode scared
function activateScaredMode() {
    gameState.isScared = true; // Set status scared
    drawGhosts(); // Gambar ulang hantu dengan warna scared
    
    // Hapus timer sebelumnya jika ada
    if (gameState.scaredTimer) {
        clearTimeout(gameState.scaredTimer);
    }
    
    // Set timer untuk mode scared
    gameState.scaredTimer = setTimeout(() => {
        gameState.isScared = false; // Nonaktifkan mode scared
        drawGhosts(); // Gambar ulang hantu dengan warna normal
    }, config.scaredTime);
}
