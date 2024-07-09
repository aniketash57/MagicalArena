const assert = require('assert');
const Player = require('../Src/player');
const Arena = require('../Src/arena');
const Dice = require('../Src/dice');
const AttackStrategy = require('../Src/strategies/attackStrategy');
const DefenseStrategy = require('../Src/strategies/defenseStrategy');

jest.mock('readline', () => ({
    createInterface: () => ({
        question: jest.fn((question, callback) => {
            const answers = {
                "Enter Player A's health, strength, and attack (separated by space): ": '50 5 10',
                "Enter Player B's health, strength, and attack (separated by space): ": '100 10 5'
            };
            callback(answers[question]);
        }),
        close: jest.fn()
    })
}));

describe('Game Simulation Tests', () => {
    it('Player Creation Test', () => {
        const playerA = new Player('Player A', 50, 5, 10);
        expect(playerA.name).toBe('Player A');
        expect(playerA.health).toBe(50);
        expect(playerA.strength).toBe(5);
        expect(playerA.attack).toBe(10);
    });

    it('Arena Fight Simulation Test', () => {
        const playerA = new Player('Player A', 50, 5, 10);
        const playerB = new Player('Player B', 100, 10, 5);

        const attackDice = new Dice();
        const defenseDice = new Dice();
        const attackStrategy = new AttackStrategy(attackDice);
        const defenseStrategy = new DefenseStrategy(defenseDice);

        const arena = new Arena(playerA, playerB, attackStrategy, defenseStrategy);

        const fightResult = arena.fight();
        
        expect(fightResult).toMatch(/wins!/);
    });

    it('Dice Roll Test', () => {
        const dice = new Dice();
        for (let i = 0; i < 100; i++) {
            const roll = dice.roll();
            expect(roll).toBeGreaterThanOrEqual(1);
            expect(roll).toBeLessThanOrEqual(6);
        }
    });

    it('Attack Strategy Test', () => {
        const playerA = new Player('Player A', 50, 5, 10);
        const attackDice = new Dice();
        const attackStrategy = new AttackStrategy(attackDice);
        const damage = attackStrategy.execute(playerA);
        expect(damage).toBeGreaterThanOrEqual(10);
        expect(damage).toBeLessThanOrEqual(60);
    });

    it('Defense Strategy Test', () => {
        const playerA = new Player('Player A', 50, 5, 10);
        const defenseDice = new Dice();
        const defenseStrategy = new DefenseStrategy(defenseDice);
        const defense = defenseStrategy.execute(playerA);
        expect(defense).toBeGreaterThanOrEqual(5);
        expect(defense).toBeLessThanOrEqual(30);
    });

    it('Edge Case: Identical Players', () => {
        const playerA = new Player('Player A', 50, 5, 10);
        const playerB = new Player('Player B', 50, 5, 10);

        const attackDice = new Dice();
        const defenseDice = new Dice();
        const attackStrategy = new AttackStrategy(attackDice);
        const defenseStrategy = new DefenseStrategy(defenseDice);

        const arena = new Arena(playerA, playerB, attackStrategy, defenseStrategy);

        const fightResult = arena.fight();
        
        expect(fightResult).toMatch(/wins!/);
    });

    it('Edge Case: Player with Zero Health', () => {
        const playerA = new Player('Player A', 0, 5, 10);
        const playerB = new Player('Player B', 100, 10, 5);

        const attackDice = new Dice();
        const defenseDice = new Dice();
        const attackStrategy = new AttackStrategy(attackDice);
        const defenseStrategy = new DefenseStrategy(defenseDice);

        const arena = new Arena(playerA, playerB, attackStrategy, defenseStrategy);

        const fightResult = arena.fight();
        
        expect(fightResult).toBe('attacker or defender health not positive');
    });

    it('Edge Case: Player with negetive Health', () => {
        const playerA = new Player('Player A', -1, 5, 10);
        const playerB = new Player('Player B', 100, 10, 5);

        const attackDice = new Dice();
        const defenseDice = new Dice();
        const attackStrategy = new AttackStrategy(attackDice);
        const defenseStrategy = new DefenseStrategy(defenseDice);

        const arena = new Arena(playerA, playerB, attackStrategy, defenseStrategy);

        const fightResult = arena.fight();
        
        expect(fightResult).toBe('attacker or defender health not positive');
    });

    it('Multiple Rounds', () => {
        const playerA = new Player('Player A', 50, 5, 10);
        const playerB = new Player('Player B', 50, 5, 10);
        const playerA1 = new Player('Player A', 50, 5, 10);
        const playerB1 = new Player('Player B', 50, 5, 10);

        const attackDice = new Dice();
        const defenseDice = new Dice();
        const attackStrategy = new AttackStrategy(attackDice);
        const defenseStrategy = new DefenseStrategy(defenseDice);

        const arena = new Arena(playerA, playerB, attackStrategy, defenseStrategy);
        const arena2 = new Arena(playerA1,playerB1,attackStrategy, defenseStrategy);

        const fightResult = arena.fight();
        const fightResult2 = arena2.fight();

        expect(fightResult).toMatch(/wins!/);
        expect(fightResult2).toMatch(/wins!/);
    });

});