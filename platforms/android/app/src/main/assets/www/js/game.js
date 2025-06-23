const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const GAME_STATE = {
    MENU: 'menu',
    PLAYING: 'playing',
    GAME_OVER: 'gameOver',
    WIN: 'win'
};

const playerSprite = new Image();
playerSprite.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZmlsbD0iIzQyYzM5NyIgZD0iTTI1IDVMMTAgNDVINDBMMjUgNXoiLz48cGF0aCBmaWxsPSIjMzNhYjU4IiBkPSJNMjUgMTVMMTAgNDVIMzVMMjUgMTV6Ii8+PC9zdmc+';

const enemySprite = new Image();
enemySprite.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZmlsbD0iIzY2NjY2NiIgZD0iTTI1IDVjLTEwIDAtMTggOC0xOCAxOHM4IDE4IDE4IDE4IDE4LTggMTgtMTgtOC0xOC0xOC0xOHptMCAzMGMtNi42IDAtMTItNS40LTEyLTEyczUuNC0xMiAxMi0xMiAxMiA1LjQgMTIgMTItNS40IDEyLTEyIDEyeiIvPjxwYXRoIGZpbGw9IiM0NDQ0NDQiIGQ9Ik0yNSAxMGMtNy4yIDAtMTMgNS44LTEzIDEzczUuOCAxMyAxMyAxMyAxMy01LjggMTMtMTMtNS44LTEzLTEzLTEzeiIvPjxwYXRoIGZpbGw9IiM4ODg4ODgiIGQ9Ik0zMCAxNWMtMi44IDAtNSAyLjItNSA1czIuMiA1IDUgNSA1LTIuMiA1LTUtMi4yLTUtNS01eiIvPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik0xNSAyMGMtMS43IDAtMyAxLjMtMyAzczEuMyAzIDMgMyAzLTEuMyAzLTMtMS4zLTMtMy0zeiIvPjxwYXRoIGZpbGw9IiM4ODg4ODgiIGQ9Ik0yNSAyNWMtMS43IDAtMyAxLjMtMyAzczEuMyAzIDMgMyAzLTEuMyAzLTMtMS4zLTMtMy0zeiIvPjwvc3ZnPg==';

const bossSprite = new Image();
bossSprite.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZmlsbD0iI2ZmMDAwMCIgZD0iTTI1IDVjLTEwIDAtMTggOC0xOCAxOHM4IDE4IDE4IDE4IDE4LTggMTgtMTgtOC0xOC0xOC0xOHptMCAzMGMtNi42IDAtMTItNS40LTEyLTEyczUuNC0xMiAxMi0xMiAxMiA1LjQgMTIgMTItNS40IDEyLTEyIDEyeiIvPjxwYXRoIGZpbGw9IiNjYzAwMDAiIGQ9Ik0yNSAxMGMtNy4yIDAtMTMgNS44LTEzIDEzczUuOCAxMyAxMyAxMyAxMy01LjggMTMtMTMtNS44LTEzLTEzLTEzeiIvPjxwYXRoIGZpbGw9IiNmZmYwZjAiIGQ9Ik0zMCAxNWMtMi44IDAtNSAyLjItNSA1czIuMiA1IDUgNSA1LTIuMiA1LTUtMi4yLTUtNS01eiIvPjxwYXRoIGZpbGw9IiNmZmYwZjAiIGQ9Ik0xNSAyMGMtMS43IDAtMyAxLjMtMyAzczEuMyAzIDMgMyAzLTEuMyAzLTMtMS4zLTMtMy0zeiIvPjxwYXRoIGZpbGw9IiNmZmYwZjAiIGQ9Ik0yNSAyNWMtMS43IDAtMyAxLjMtMyAzczEuMyAzIDMgMyAzLTEuMyAzLTMtMS4zLTMtMy0zeiIvPjwvc3ZnPg==';

const projectileSprite = new Image();
projectileSprite.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHBhdGggZmlsbD0iIzAwZmZmZiIgZD0iTTUgMEw1IDEwTDAgNUw1IDB6Ii8+PC9zdmc+';

const coinSprite = new Image();
coinSprite.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PGNpcmNsZSBjeD0iNSIgY3k9IjUiIHI9IjUiIGZpbGw9IiNmZmQ3MDAiLz48Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iNCIgZmlsbD0iI2ZmYzEwMCIvPjwvc3ZnPg==';

let currentState = GAME_STATE.MENU;
let player = { 
    x: canvas.width / 2, 
    y: canvas.height / 2, 
    radius: 20, 
    speed: 3,
    angle: 0
};
let moveDir = { x: 0, y: 0 };
let shootDir = { x: 0, y: 0 };
let canShoot = true;
let health = 10;
let score = 0;
let level = 1;
let enemySpawnInterval = 2000;
let enemyBaseSpeed = 1.2;

let enemies = [];
let drops = [];
let projectiles = [];
let boss = null;
let bossHP = 5;
let bossSpawned = false;
let coinBurst = [];

function setupJoystick(baseId, onMove) {
  const base = document.getElementById(baseId);
  const stick = base.querySelector('.joystickStick');
  let dragging = false;

  base.addEventListener('touchstart', () => dragging = true);
  base.addEventListener('touchmove', e => {
    if (!dragging) return;
    const touch = e.touches[0];
    const rect = base.getBoundingClientRect();
    const dx = touch.clientX - (rect.left + rect.width / 2);
    const dy = touch.clientY - (rect.top + rect.height / 2);
    const dist = Math.min(Math.hypot(dx, dy), 40);
    const angle = Math.atan2(dy, dx);
    stick.style.left = 25 + Math.cos(angle) * dist + 'px';
    stick.style.top = 25 + Math.sin(angle) * dist + 'px';
    onMove({ x: Math.cos(angle), y: Math.sin(angle) });
  });
  base.addEventListener('touchend', () => {
    dragging = false;
    onMove({ x: 0, y: 0 });
    stick.style.left = '25px';
    stick.style.top = '25px';
  });
}

setupJoystick("leftJoystick", dir => moveDir = dir);
setupJoystick("rightJoystick", dir => {
  shootDir = dir;
  if (canShoot && (dir.x !== 0 || dir.y !== 0)) {
    shootProjectile(dir);
    canShoot = false;
    setTimeout(() => canShoot = true, 200);
  }
});

function shootProjectile(dir) {
    const angle = Math.atan2(dir.y, dir.x) + Math.PI/2;
    projectiles.push({
        x: player.x,
        y: player.y,
        dx: dir.x * 6,
        dy: dir.y * 6,
        radius: 6,
        angle: angle
    });
}

function resetGame() {
    level = 1;
    enemyBaseSpeed = 1.2;
    enemySpawnInterval = 2000;
    
    player = { x: canvas.width / 2, y: canvas.height / 2, radius: 20, speed: 3, angle: 0 };
    moveDir = { x: 0, y: 0 };
    shootDir = { x: 0, y: 0 };
    canShoot = true;
    health = 10;
    score = 0;
    enemies = [];
    drops = [];
    projectiles = [];
    boss = null;
    bossHP = 5;
    bossSpawned = false;
    coinBurst = [];
    currentState = GAME_STATE.PLAYING;
}

function startNextLevel() {
    level++;
    enemyBaseSpeed *= 1.5;
    enemySpawnInterval *= 0.5;
    
    player = { x: canvas.width / 2, y: canvas.height / 2, radius: 20, speed: 3, angle: 0 };
    moveDir = { x: 0, y: 0 };
    shootDir = { x: 0, y: 0 };
    canShoot = true;
    health = 10;
    score = 0;
    enemies = [];
    drops = [];
    projectiles = [];
    boss = null;
    bossHP = 5;
    bossSpawned = false;
    coinBurst = [];
    currentState = GAME_STATE.PLAYING;
}

function spawnEnemy() {
    if (bossSpawned) return;
    const edge = Math.random() < 0.5 ? 0 : canvas.width;
    const y = Math.random() * canvas.height;
    const dx = player.x - edge;
    const dy = player.y - y;
    const angle = Math.atan2(dy, dx) - Math.PI/2;
    
    enemies.push({
        x: edge,
        y: y,
        radius: 15,
        speed: enemyBaseSpeed,
        angle: angle
    });
}

function spawnBoss() {
    const dx = player.x - canvas.width/4;
    const dy = player.y - canvas.height/4;
    const angle = Math.atan2(dy, dx) - Math.PI/2;
    
    const bossSpeed = 0.7 * Math.pow(1.5, level - 1);
    
    boss = {
        x: canvas.width / 4,
        y: canvas.height / 4,
        radius: 30,
        speed: bossSpeed,
        angle: angle
    };
    bossHP = 5;
    bossSpawned = true;
}

function createCoinBurst(x, y) {
    for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = 2 + Math.random() * 2;
        coinBurst.push({
            x: x,
            y: y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            radius: 5
        });
    }
}

function drawSprite(sprite, x, y, angle, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(sprite, -size/2, -size/2, size, size);
    ctx.restore();
}

function update() {
    if (currentState !== GAME_STATE.PLAYING) return;

    if (moveDir.x !== 0 || moveDir.y !== 0) {
        player.angle = Math.atan2(moveDir.y, moveDir.x) + Math.PI/2;
    } else if (shootDir.x !== 0 || shootDir.y !== 0) {
        player.angle = Math.atan2(shootDir.y, shootDir.x) + Math.PI/2;
    }

    player.x += moveDir.x * player.speed;
    player.y += moveDir.y * player.speed;

    player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

    projectiles = projectiles.filter(p => {
        p.x += p.dx;
        p.y += p.dy;
        return p.x >= 0 && p.x <= canvas.width && p.y >= 0 && p.y <= canvas.height;
    });

    enemies.forEach((e, i) => {
        const dx = player.x - e.x;
        const dy = player.y - e.y;
        const dist = Math.hypot(dx, dy);
        const moveX = (dx / dist) * e.speed;
        const moveY = (dy / dist) * e.speed;
        
        e.x += moveX;
        e.y += moveY;
        
        e.angle = Math.atan2(moveY, moveX) - Math.PI/2;

        if (dist < player.radius + e.radius) {
            enemies.splice(i, 1);
            health--;
            if (health <= 0) currentState = GAME_STATE.GAME_OVER;
        }
    });

    projectiles = projectiles.filter(p => {
        let hit = false;
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            if (Math.hypot(p.x - e.x, p.y - e.y) < e.radius + p.radius) {
                enemies.splice(i, 1);
                drops.push({ x: e.x, y: e.y });
                hit = true;
                break;
            }
        }
        return !hit;
    });

    drops = drops.filter(d => {
        if (Math.hypot(player.x - d.x, player.y - d.y) < player.radius) {
            score++;
            if (score >= 10 && !bossSpawned && !boss) {
                spawnBoss();
            }
            return false;
        }
        return true;
    });

    coinBurst.forEach(coin => {
        coin.x += coin.dx;
        coin.y += coin.dy;
        coin.dy += 0.1;
    });
    coinBurst = coinBurst.filter(coin => coin.y < canvas.height);

    if (boss) {
        const dx = player.x - boss.x;
        const dy = player.y - boss.y;
        const dist = Math.hypot(dx, dy);
        const moveX = (dx / dist) * boss.speed;
        const moveY = (dy / dist) * boss.speed;
        
        boss.x += moveX;
        boss.y += moveY;
        
        boss.angle = Math.atan2(moveY, moveX) - Math.PI/2;

        if (dist < player.radius + boss.radius) {
            health -= 2;
            if (health <= 0) currentState = GAME_STATE.GAME_OVER;
        }

        let bossHit = false;
        projectiles = projectiles.filter(p => {
            if (!bossHit && Math.hypot(p.x - boss.x, p.y - boss.y) < boss.radius + p.radius) {
                bossHP--;
                if (bossHP <= 0) {
                    createCoinBurst(boss.x, boss.y);
                    boss = null;
                    bossSpawned = false;
                    currentState = GAME_STATE.WIN;
                }
                bossHit = true;
                return false;
            }
            return true;
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentState === GAME_STATE.MENU) {
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("Mobile Shooter", canvas.width / 2, canvas.height / 3);
        ctx.font = '24px Arial';
        ctx.fillText("Tap to Start", canvas.width / 2, canvas.height / 2);
        return;
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, canvas.width * (health / 10), 20);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(10, 10, canvas.width * 1, 20);

    if (boss) {
        ctx.fillStyle = 'darkred';
        ctx.fillRect(10, 40, canvas.width * (bossHP / 5), 20);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(10, 40, canvas.width * 1, 20);
    }

    drawSprite(playerSprite, player.x, player.y, player.angle, player.radius * 2);

    enemies.forEach(e => {
        drawSprite(enemySprite, e.x, e.y, e.angle, e.radius * 2);
    });

    if (boss) {
        drawSprite(bossSprite, boss.x, boss.y, boss.angle, boss.radius * 2);
    }

    projectiles.forEach(p => {
        drawSprite(projectileSprite, p.x, p.y, p.angle, p.radius * 2);
    });

    drops.forEach(d => {
        drawSprite(coinSprite, d.x, d.y, 0, 20);
    });

    coinBurst.forEach(coin => {
        drawSprite(coinSprite, coin.x, coin.y, 0, 10);
    });

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Level: ${level}`, 10, 110);
    ctx.fillText(`Score: ${score}`, 10, 80);

    if (currentState === GAME_STATE.GAME_OVER) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '24px Arial';
        ctx.fillText("Tap to Restart", canvas.width / 2, canvas.height / 2 + 20);
    }

    if (currentState === GAME_STATE.WIN) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'gold';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("Victory!", canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '24px Arial';
        ctx.fillText(`Level ${level} Complete!`, canvas.width / 2, canvas.height / 2);
        ctx.fillText("Tap for Next Level", canvas.width / 2, canvas.height / 2 + 40);
    }
}

canvas.addEventListener('click', () => {
    if (currentState === GAME_STATE.MENU || currentState === GAME_STATE.GAME_OVER) {
        resetGame();
    } else if (currentState === GAME_STATE.WIN) {
        startNextLevel();
    }
});

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

setInterval(spawnEnemy, enemySpawnInterval);
loop();
