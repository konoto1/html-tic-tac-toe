class Game {
    constructor() {
        this.buttonDOM = document.querySelectorAll('.game > button');
        this.resetScoreDOM = document.querySelector('.resetScore');
        this.playAgainDOM = document.querySelector('.playAgain');
        this.resultDOM = document.querySelector('.result');
        this.scoreODOM = document.getElementById('scoreO');
        this.scoreXDOM = document.getElementById('scoreX');


        this.state = false;
        this.isGameDataNotEmpty();
        this.beginGame();
        this.resetScore();
    }


    winCheck() {

        let btn = []
        let gameScore = { scoreO: 0, scoreX: 0, result: '', state: false };
        if (JSON.parse(localStorage.getItem('gameScore')) !== null) {
            gameScore = JSON.parse(localStorage.getItem('gameScore'));
        }
        this.scoreODOM.textContent = gameScore.scoreO;
        this.scoreXDOM.textContent = gameScore.scoreX;
        for (let i = 0; i < this.buttonDOM.length; i++) {
            btn.push(this.buttonDOM[i].textContent);
        }

        if (btn[0] + btn[1] + btn[2] === 'OOO'
            || btn[0] + btn[1] + btn[2] === 'OOO'
            || btn[3] + btn[4] + btn[5] === 'OOO'
            || btn[6] + btn[7] + btn[8] === 'OOO'
            || btn[0] + btn[3] + btn[6] === 'OOO'
            || btn[1] + btn[4] + btn[7] === 'OOO'
            || btn[2] + btn[5] + btn[8] === 'OOO'
            || btn[0] + btn[4] + btn[8] === 'OOO'
            || btn[2] + btn[4] + btn[6] === 'OOO') {
            this.resultDOM.textContent = 'Player "O" won!';
            gameScore.scoreO++;
            gameScore.result = 'Player "O" won!';
            gameScore.state = true;
            this.scoreODOM.textContent = gameScore.scoreO;
            localStorage.setItem('gameScore', JSON.stringify(gameScore));
            this.state = true;
            return;
        }

        if (btn[0] + btn[1] + btn[2] === 'XXX'
            || btn[0] + btn[1] + btn[2] === 'XXX'
            || btn[3] + btn[4] + btn[5] === 'XXX'
            || btn[6] + btn[7] + btn[8] === 'XXX'
            || btn[0] + btn[3] + btn[6] === 'XXX'
            || btn[1] + btn[4] + btn[7] === 'XXX'
            || btn[2] + btn[5] + btn[8] === 'XXX'
            || btn[0] + btn[4] + btn[8] === 'XXX'
            || btn[2] + btn[4] + btn[6] === 'XXX') {
            this.resultDOM.textContent = 'Player "X" won!';
            gameScore.scoreX++;
            gameScore.result = 'Player "X" won!';
            gameScore.state = true;
            this.scoreXDOM.textContent = gameScore.scoreX;
            localStorage.setItem('gameScore', JSON.stringify(gameScore));
            this.state = true;
            return;
        }

        if (!btn.includes('')) {
            this.resultDOM.textContent = 'Game draw!';
            gameScore.result = 'Game draw!';
            localStorage.setItem('gameScore', JSON.stringify(gameScore));
            return;
        }
    }

    isGameDataNotEmpty() {
        const gameData = localStorage.getItem('gameInfo');
        if (gameData !== null && gameData !== '[]') {
            return true;
        }
        return false;
    }

    beginGame() {
        const gameData = JSON.parse(localStorage.getItem('gameInfo'));
        const gameScore = JSON.parse(localStorage.getItem('gameScore'));
        if (gameScore === null) {
            this.scoreODOM.textContent = 0;
            this.scoreXDOM.textContent = 0;
            this.resultDOM.textContent = '';
            this.state = false;
        } else {
            this.scoreODOM.textContent = gameScore.scoreO;
            this.scoreXDOM.textContent = gameScore.scoreX;
            this.resultDOM.textContent = gameScore.result;
            this.state = gameScore.state;
        }

        if (this.isGameDataNotEmpty()) {
            for (let i = 0; i < gameData.length; i++) {
                this.buttonDOM[gameData[i].index].textContent = gameData[i].move;
            }
        } else {
            for (const button of this.buttonDOM) {
                button.textContent = '';
            }
        }
        this.gameEvents();
    }

    gameEvents() {
        let gameData = JSON.parse(localStorage.getItem('gameInfo'));
        let count = null;
        this.playAgainDOM.addEventListener('click', () => {
            gameData = [];
            localStorage.setItem('gameInfo', JSON.stringify(gameData));
            let gameScore = JSON.parse(localStorage.getItem('gameScore'))
            if (gameScore === null) {
                this.state = false;
            } else {
                gameScore.state = false;
                gameScore.result = '';
                localStorage.setItem('gameScore', JSON.stringify(gameScore));
            }

            count = 0;
            this.state = false;
            this.beginGame();
        });

        if (this.state) {
            return;
        }

        if (!this.isGameDataNotEmpty()) {
            count = 0;
            gameData = [];
        } else {
            count = (gameData[gameData.length - 1]).count === 0 ? 1 : 0;
        }

        for (let i = 0; i < this.buttonDOM.length; i++) {
            this.buttonDOM[i].addEventListener('click', events => {
                const isEmpty = this.buttonDOM[i].textContent.length === 0;

                if (isEmpty && count === 0) {
                    this.buttonDOM[i].textContent = 'O';
                    gameData.push({
                        move: 'O',
                        count: count,
                        index: `${i}`,
                    });
                    count = 1;
                    localStorage.setItem('gameInfo', JSON.stringify(gameData));
                    this.winCheck();

                } else if (isEmpty && count !== 0) {
                    this.buttonDOM[i].textContent = 'X';
                    count = 1;
                    gameData.push({
                        move: 'X',
                        count: count,
                        index: `${i}`,
                    });
                    count = 0;
                    localStorage.setItem('gameInfo', JSON.stringify(gameData));
                    this.winCheck();
                }
                if (this.state) {
                    for (const button of this.buttonDOM) {
                        let btnText = button.textContent;
                        btnText !== '' ? button.textContent = btnText : button.textContent = ' ';
                    }
                }
            });
        }
    }

    resetScore() {
        this.resetScoreDOM.addEventListener('click', () => {
            let gameScore = { scoreO: 0, scoreX: 0, result: '', state: false };
            let gameData = [];
            localStorage.setItem('gameInfo', JSON.stringify(gameData));
            localStorage.setItem('gameScore', JSON.stringify(gameScore));
            this.beginGame();
        })
    }
}


new Game();