let player = {
    name: "",
    hp: 100,
    maxHp: 100,
    damage: 20,
    icon: "⚔️"
};

let enemy = {
    hp: 100,
    maxHp: 100,
    damage: 15
};

let potionCount = 3;
let gameOver = false;


const characters = {

    knight: {
        name: "Knight",
        hp: 120,
        damage: 20,
        icon: "⚔️"
    },

    mage: {
        name: "Mage",
        hp: 90,
        damage: 30,
        icon: "🔮"
    },

    archer: {
        name: "Archer",
        hp: 100,
        damage: 25,
        icon: "🏹"
    }

};


function chooseCharacter(type) {

    const selected = characters[type];

    player.name = selected.name;
    player.hp = selected.hp;
    player.maxHp = selected.hp;
    player.damage = selected.damage;
    player.icon = selected.icon;

    enemy.hp = enemy.maxHp;

    document.getElementById("character-screen").classList.add("hidden");
    document.getElementById("battle-screen").classList.remove("hidden");

    document.getElementById("player-name").textContent = player.name;
    document.getElementById("player-icon").textContent = player.icon;

    updateHP();

    message("Pertarungan dimulai! Serang Goblin!");
}


function attack() {

    if (gameOver) return;

    const damage = Math.floor(
        player.damage * (0.8 + Math.random() * 0.4)
    );

    enemy.hp -= damage;

    if (enemy.hp < 0) {
        enemy.hp = 0;
    }

    message(
        `${player.name} menyerang Goblin dan memberikan ${damage} damage!`
    );

    updateHP();

    if (enemy.hp <= 0) {
        winGame();
        return;
    }

    setTimeout(enemyAttack, 700);
}


function enemyAttack() {

    if (gameOver) return;

    const damage = Math.floor(
        enemy.damage * (0.8 + Math.random() * 0.4)
    );

    player.hp -= damage;

    if (player.hp < 0) {
        player.hp = 0;
    }

    message(
        `Goblin menyerang balik dan memberikan ${damage} damage!`
    );

    updateHP();

    if (player.hp <= 0) {
        loseGame();
    }
}


function potion() {

    if (gameOver) return;

    if (potionCount <= 0) {

        message("Potion kamu sudah habis!");

        return;
    }

    if (player.hp === player.maxHp) {

        message("HP kamu sudah penuh!");

        return;
    }

    const heal = 30;

    player.hp += heal;

    if (player.hp > player.maxHp) {
        player.hp = player.maxHp;
    }

    potionCount--;

    message(
        `Kamu menggunakan Potion! HP bertambah ${heal}. Sisa Potion: ${potionCount}`
    );

    updateHP();

    setTimeout(enemyAttack, 700);
}


function run() {

    if (gameOver) return;

    gameOver = true;

    document.getElementById("battle-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("result-title").textContent =
        "🏃 Kamu Kabur!";

    document.getElementById("result-message").textContent =
        "Pertarungan dihentikan. Goblin masih hidup.";
}


function winGame() {

    gameOver = true;

    document.getElementById("battle-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("result-title").textContent =
        "🏆 KAMU MENANG!";

    document.getElementById("result-message").textContent =
        `${player.name} berhasil mengalahkan Goblin!`;
}


function loseGame() {

    gameOver = true;

    document.getElementById("battle-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    document.getElementById("result-title").textContent =
        "💀 KAMU KALAH!";

    document.getElementById("result-message").textContent =
        "Goblin berhasil mengalahkanmu. Coba lagi!";
}


function updateHP() {

    document.getElementById("player-hp").textContent =
        player.hp;

    document.getElementById("enemy-hp").textContent =
        enemy.hp;

    const playerPercent =
        (player.hp / player.maxHp) * 100;

    const enemyPercent =
        (enemy.hp / enemy.maxHp) * 100;

    document.getElementById("player-hp-bar").style.width =
        playerPercent + "%";

    document.getElementById("enemy-hp-bar").style.width =
        enemyPercent + "%";
}


function message(text) {

    document.getElementById("message").textContent = text;
}


function restartGame() {

    location.reload();

}