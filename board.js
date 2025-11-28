// Fungsi untuk membuat papan game
function createBoard() {
    gameBoard.innerHTML = ''; // Kosongkan papan game
    gameState.dots = 0; // Reset jumlah titik
    
    // Loop melalui setiap baris dan kolom peta
    for (let y = 0; y < config.boardHeight; y++) {
        for (let x = 0; x < config.boardWidth; x++) {
            const cell = document.createElement('div'); // Buat elemen div untuk sel
            cell.className = 'cell'; // Tambahkan class cell
            cell.id = `cell-${x}-${y}`; // Set ID unik untuk sel
            
            // Periksa tipe sel berdasarkan peta
            if (map[y][x] === 1) {
                cell.classList.add('wall'); // Tambahkan class wall untuk dinding
            } else if (map[y][x] === 0) {
                const dot = document.createElement('div'); // Buat elemen untuk titik
                dot.className = 'dot'; // Tambahkan class dot
                cell.appendChild(dot); // Tambahkan titik ke sel
                gameState.dots++; // Tambah jumlah titik
            } else if (map[y][x] === 2) {
                const powerPellet = document.createElement('div'); // Buat elemen untuk power pellet
                powerPellet.className = 'power-pellet'; // Tambahkan class power-pellet
                cell.appendChild(powerPellet); // Tambahkan power pellet ke sel
                gameState.dots++; // Tambah jumlah titik
            }
            
            gameBoard.appendChild(cell); // Tambahkan sel ke papan game
        }
    }
}

// Fungsi untuk menggambar Pacman
function drawPacman() {
    // Hapus Pacman dari posisi sebelumnya
    document.querySelectorAll('.pacman').forEach(el => el.remove());
    
    // Gambar Pacman di posisi baru
    const pacmanCell = document.getElementById(`cell-${pacman.x}-${pacman.y}`);
    const pacmanElement = document.createElement('div');
    pacmanElement.className = `pacman ${pacman.direction}`;
    pacmanCell.appendChild(pacmanElement);
}

// Fungsi untuk menggambar hantu
function drawGhosts() {
    // Hapus semua hantu
    document.querySelectorAll('.ghost').forEach(el => el.remove());
    
    // Gambar setiap hantu
    ghosts.forEach(ghost => {
        const ghostCell = document.getElementById(`cell-${ghost.x}-${ghost.y}`);
        const ghostElement = document.createElement('div');
        ghostElement.className = `ghost ${ghost.name} ${gameState.isScared ? 'scared' : ''}`;
        ghostCell.appendChild(ghostElement);
    });
}

// Fungsi untuk memperbarui tampilan skor
function updateScore() {
    scoreElement.textContent = gameState.score; // Perbarui teks skor
}

// Fungsi untuk memperbarui tampilan nyawa
function updateLives() {
    livesElement.textContent = gameState.lives; // Perbarui teks nyawa
}