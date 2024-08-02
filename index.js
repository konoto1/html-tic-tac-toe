class Game {
    constructor() {
        this.buttonDOM = document.querySelectorAll('.game > button');
        this.playAgainDOM = document.querySelector('.playAgain');

        this.beginGame();
        this.playAgain();
        this.isGameDataNotEmpty();
        this.gameEvents();

    }

    isGameDataNotEmpty() {
        const gameData = localStorage.getItem('gameInfo');
        if (gameData !== null && gameData !== '[]') {
            return true;
        }
        return false;
    }

    beginGame() {
        let gameData = JSON.parse(localStorage.getItem('gameInfo'));
        console.log(gameData);

        if (this.isGameDataNotEmpty()) {
            for (let i = 0; i < gameData.length; i++) {
                this.buttonDOM[gameData[i].index].textContent = gameData[i].move;
            }
        } else {
            for (const button of this.buttonDOM) {
                button.textContent = '';
            }
            gameData = [];
        }
    }

    gameEvents() {
        let gameData = JSON.parse(localStorage.getItem('gameInfo'));
        let count = null;
        if (!this.isGameDataNotEmpty()) {
            count = 0;
            gameData = [];
        } else {
            count = (gameData[gameData.length - 1]).count === 0 ? 1 : 0;
        }

        for (let i = 0; i < this.buttonDOM.length; i++) {
            this.buttonDOM[i].addEventListener('click', () => {
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
                }
            });
        }

    }

    playAgain() {
        this.playAgainDOM.addEventListener('click', () => {
            const gameData = [];
            localStorage.setItem('gameInfo', JSON.stringify(gameData));
            console.log(gameData);

            this.beginGame();
        });
    }
}


new Game();


// [{"move":"O","count":"0","index":"0"},{"move":"X","count":"1","index":"1"},{"move":"O","count":"0","index":"4"},{"move":"X","count":"1","index":"3"},{"move":"O","count":"0","index":"2"},{"move":"X","count":"1","index":"5"}]