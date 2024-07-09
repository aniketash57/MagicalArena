class Arena {
    constructor(player1, player2, attackStrategy, defenseStrategy) {
        this.player1 = player1;
        this.player2 = player2;
        this.attackStrategy = attackStrategy;
        this.defenseStrategy = defenseStrategy;
    }

    fight() {
        let attacker = this.player1.health < this.player2.health ? this.player1 : this.player2;
        let defender = attacker === this.player1 ? this.player2 : this.player1;

        while (this.player1.isAlive() && this.player2.isAlive()) {
            this.attack(attacker, defender);

            if (!defender.isAlive()) break;

            [attacker, defender] = [defender, attacker];
        }

        return `${attacker.name} wins!`;
    }

    attack(attacker, defender) {
        const attackDamage = this.attackStrategy.execute(attacker);
        const defensePower = this.defenseStrategy.execute(defender);
        const damage = Math.max(0, attackDamage - defensePower);

        defender.takeDamage(damage);

        console.log(`${attacker.name} attacks! Damage: ${attackDamage}, ${defender.name} defends! Defense: ${defensePower}, Damage Taken: ${damage}, ${defender.name} Health: ${defender.health}`);
    }
}

module.exports = Arena;
