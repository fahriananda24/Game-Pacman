// Fungsi untuk memindahkan Pacman
function movePacman() {
    // Coba arah berikutnya terlebih dahulu
    let nextX = pacman.x;
    let nextY = pacman.y;
    
    // Tentukan posisi berikutnya berdasarkan arah yang diminta
    switch (pacman.nextDirection) {
        case 'right': nextX++; break;
        case 'left': nextX--; break;
        case 'up': nextY--; break;
        case 'down': nextY++; break;
    }
    
    // Jika arah berikutnya valid, ubah arah
    if (isValidMove(nextX, nextY)) {
        pacman.direction = pacman.nextDirection;
    }
    
    // Hitung posisi berikutnya berdasarkan arah saat ini
    nextX = pacman.x;
    nextY = pacman.y;
    
    switch (pacman.direction) {
        case 'right': nextX++; break;
        case 'left': nextX--; break;
        case 'up': nextY--; break;
        case 'down': nextY++; break;
    }
    
    // Jika gerakan valid, pindahkan Pacman
    if (isValidMove(nextX, nextY)) {
        pacman.x = nextX;
        pacman.y = nextY;
        
        // Cek apakah ada titik atau power pellet
        checkDotCollision();
        
        // Cek tabrakan dengan hantu
        checkGhostCollision();
    }
    
    drawPacman(); // Gambar Pacman di posisi baru
}

// Fungsi untuk memindahkan hantu
function moveGhosts() {
    ghosts.forEach(ghost => {
        // Tentukan arah acak untuk hantu
        const directions = ['up', 'down', 'left', 'right'];
        const possibleDirections = [];
        
        // Periksa setiap arah yang mungkin
        for (const dir of directions) {
            let nextX = ghost.x;
            let nextY = ghost.y;
            
            switch (dir) {
                case 'right': nextX++; break;
                case 'left': nextX--; break;
                case 'up': nextY--; break;
                case 'down': nextY++; break;
            }
            
            // Jika gerakan valid dan bukan arah berlawanan, tambahkan ke kemungkinan
            if (isValidMove(nextX, nextY) && dir !== getOppositeDirection(ghost.direction)) {
                possibleDirections.push(dir);
            }
        }
        
        // Jika ada arah yang mungkin
        if (possibleDirections.length > 0) {
            // Pilih arah acak dari kemungkinan yang ada
            const randomIndex = Math.floor(Math.random() * possibleDirections.length);
            ghost.direction = possibleDirections[randomIndex];
            
            // Gerakkan hantu
            let nextX = ghost.x;
            let nextY = ghost.y;
            
            switch (ghost.direction) {
                case 'right': nextX++; break;
                case 'left': nextX--; break;
                case 'up': nextY--; break;
                case 'down': nextY++; break;
            }
            
            ghost.x = nextX;
            ghost.y = nextY;
        }
        // Jika tidak ada arah yang mungkin, hantu akan berbalik arah
        else {
            ghost.direction = getOppositeDirection(ghost.direction);
            
            let nextX = ghost.x;
            let nextY = ghost.y;
            
            switch (ghost.direction) {
                case 'right': nextX++; break;
                case 'left': nextX--; break;
                case 'up': nextY--; break;
                case 'down': nextY++; break;
            }
            
            if (isValidMove(nextX, nextY)) {
                ghost.x = nextX;
                ghost.y = nextY;
            }
        }
    });
    
    drawGhosts(); // Gambar hantu di posisi baru
}

// Fungsi untuk mendapatkan arah berlawanan
function getOppositeDirection(direction) {
    switch (direction) {
        case 'right': return 'left';
        case 'left': return 'right';
        case 'up': return 'down';
        case 'down': return 'up';
    }
}

// Fungsi untuk memeriksa apakah gerakan valid
function isValidMove(x, y) {
    // Periksa batas peta
    if (x < 0 || x >= config.boardWidth || y < 0 || y >= config.boardHeight) {
        return false;
    }
    
    // Periksa apakah ada dinding
    return map[y][x] !== 1;
}