class Player {
    constructor(name) {
        this._name = name
        this._hp = 10
        this._attackBonus = 0
    }

    takeDamage = (damage) => {
        this._hp -= damage
    }

    isDead = () => {
        return this._hp <= 0
    }

    dealDamage = () => {
        const randomDamage = Math.ceil(Math.random() * 6)
        const damageTotal = randomDamage + this._attackBonus
        this._attackBonus = 0
        return damageTotal
    }

    healSelf = () => {
        const damageHealed = (Math.ceil(Math.random() * 4))
        this._hp += damageHealed
        this._attackBonus += 1
        return damageHealed
    }

    get name() {
        return this._name
    }

    get hp() {
        return this._hp
    }

    get bonus() {
        return this._attackBonus
    }
}

class Game {
    constructor (player1Name, player2Name) {
        this._players = [new Player(player1Name), new Player(player2Name)]
        this._hasEnded = false
        this._winner = null
        this.startGame()
    }

    startGame = () => {
        const playingNow = Math.floor(Math.random() * 2)
        const nextPlayer = playingNow + 1
        const normalizedNext = nextPlayer % 2
        this._playingNow = playingNow
        this._nextPlayer = normalizedNext
    }

    passTurn = () => {
        const shallEndGame = this.checkEnd()
        if (shallEndGame) this.endGame() 
        else{
            const passTurnAux = this._playingNow
            this._playingNow = this._nextPlayer
            this._nextPlayer = passTurnAux
        }
    }

    endGame = () => {
        this._winner = this._playingNow
        this._playingNow = null
        this._nextPlayer = null
        this._hasEnded = true
    }

    checkEnd = () => {
        const isPlayerDead = this._players[this._nextPlayer].isDead()
        return isPlayerDead
    }

    attack = () => {
        const attackingPlayer = this._playingNow
        const defendingPlayer = this._nextPlayer
        const damageDealt = this._players[attackingPlayer].dealDamage()
        this._players[defendingPlayer].takeDamage(damageDealt)
        this.checkEnd()
        return damageDealt
    }

    heal = () => {
        const healingPlayer = this._playingNow
        const amountHealed = this._players[healingPlayer].healSelf()
        return amountHealed
    }

    get playingNow() {
        return this._playingNow
    }

    get nextPlayer() {
        return this._nextPlayer
    }

    get players() {
        return this._players
    }

    get hasEnded() {
        return this._hasEnded
    }

    get winner() {
        return this._winner
    }
}