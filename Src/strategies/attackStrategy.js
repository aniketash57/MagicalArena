const Strategy = require('./strategy.js');

class AttackStrategy extends Strategy {
    execute(attacker) {
        const attackRoll = this.dice.roll();
        return attackRoll * attacker.attack;
    }
}

module.exports = AttackStrategy;
