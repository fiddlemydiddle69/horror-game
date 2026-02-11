const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const flash = document.getElementById("flash");
const hitSound = document.getElementById("hitSound");

let playerX = 170;
let score = 0;
let speed = 5;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && playerX > 0) playerX -= 25;
    if (e.key === "ArrowRight" && playerX < 340) playerX += 25;
    player.style.left = playerX + "px";
});
game.addEventListener("touchmove", (e) => {
    const touchX = e.touches[0].clientX;
    const rect = game.getBoundingClientRect();
    playerX = touchX - rect.left - 30;

    if (playerX < 0) playerX = 0;
    if (playerX > 340) playerX = 340;

    player.style.left = playerX + "px";
});

function flicker() {
    flash.style.opacity = Math.random() > 0.95 ? 0.4 : 0;
}
setInterval(flicker, 100);

function createBlock() {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = Math.floor(Math.random() * 340) + "px";
    game.appendChild(block);

    let blockY = 0;

    const fall = setInterval(() => {
        blockY += speed;
        block.style.top = blockY + "px";

        const p = player.getBoundingClientRect();
        const b = block.getBoundingClientRect();

        if (
            b.bottom > p.top &&
            b.top < p.bottom &&
            b.left < p.right &&
            b.right > p.left
        ) {
            hitSound.play();
            flash.style.opacity = 1;
            setTimeout(() => {
                alert("YOU DIDN'T ESCAPE...\nSurvival Time: " + score);
                location.reload();
            }, 200);
        }

        if (blockY > 600) {
            block.remove();
            score++;
            scoreDisplay.textContent = score;

            // game gets faster over time
            if (score % 5 === 0) speed += 1;

            clearInterval(fall);
        }
    }, 20);
}

setInterval(createBlock, 900);