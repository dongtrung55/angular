enum Player {
    X = 'X',
    O = 'O',
}

type Board = (Player | null)[];

class TicTacToe {
    private currentPlayer: Player = Player.X;
    private board: Board = Array(9).fill(null);

    private renderBoard(): void {
        const appElement = document.getElementById('content');
        if (!appElement) return;

        appElement.innerHTML = '';

        this.board.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value || '';
            cell.addEventListener('click', () => this.handleCellClick(index));
            appElement.appendChild(cell);
        });
    }

    private handleCellClick(index: number): void {
        if (this.board[index] || this.calculateWinner()) {
            return;
        }

        this.board[index] = this.currentPlayer;
        this.renderBoard();

        const winner = this.calculateWinner();
        if (winner) {
            alert(`Player ${winner} wins!`);
            this.resetGame();
        } else if (!this.board.includes(null)) {
            alert('It\'s a draw!');
            this.resetGame();
        } else {
            this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
        }
    }

    private calculateWinner(): Player | null {
        const lines: number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const line of lines) {
            const [a, b, c] = line;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a] as Player;
            }
        }

        return null;
    }

    private resetGame(): void {
        this.currentPlayer = Player.X;
        this.board = Array(9).fill(null);
        this.renderBoard();
    }

    public start(): void {
        this.renderBoard();
    }
}

const game = new TicTacToe();
game.start();
