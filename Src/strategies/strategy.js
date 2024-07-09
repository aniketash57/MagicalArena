class Strategy {
    constructor(dice) {
        if (this.constructor === Strategy) {
            throw new Error('Abstract classes cannot be instantiated.');
        }
        this.dice = dice;
    }

    execute() {
        throw new Error('Method "execute()" must be implemented.');
    }
}

module.exports = Strategy;
