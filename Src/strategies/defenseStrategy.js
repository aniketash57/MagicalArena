const Strategy = require('./strategy.js');

class DefenseStrategy extends Strategy {
    execute(defender) {
        const defenseRoll = this.dice.roll();
        return defenseRoll * defender.strength;
    }
}

module.exports = DefenseStrategy;
