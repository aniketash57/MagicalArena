const readline = require('readline');
const Player = require('./player');
const Arena = require('./arena');
const Dice = require('./dice');
const AttackStrategy = require('./strategies/attackStrategy');
const DefenseStrategy = require('./strategies/defenseStrategy');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptForPlayerAttributes(playerName) {
    return new Promise((resolve, reject) => {
        rl.question(`Enter ${playerName}'s health, strength, and attack (separated by space): `, (input) => {
            const [health, strength, attack] = input.split(' ').map(value => parseInt(value));
            if (isNaN(health) || isNaN(strength) || isNaN(attack)) {
                console.error('Invalid input. Please enter numeric values.');
                reject();
            } else {
                resolve({ health, strength, attack });
            }
        });
    });
}

console.log('Enter Player A\'s details:');
promptForPlayerAttributes('Player A')
    .then(({ health: playerA_health, strength: playerA_strength, attack: playerA_attack }) => {
        console.log('Enter Player B\'s details:');
        return promptForPlayerAttributes('Player B')
            .then(({ health: playerB_health, strength: playerB_strength, attack: playerB_attack }) => {
                rl.close();

                const playerA = new Player('Player A', playerA_health, playerA_strength, playerA_attack);
                const playerB = new Player('Player B', playerB_health, playerB_strength, playerB_attack);

                const attackDice = new Dice();
                const defenseDice = new Dice();
                const attackStrategy = new AttackStrategy(attackDice);
                const defenseStrategy = new DefenseStrategy(defenseDice);

                const arena = new Arena(playerA, playerB, attackStrategy, defenseStrategy);

                console.log(arena.fight());
            });
    })
    .catch((err) => {
        console.error('Error:', err);
        rl.close();
    });
