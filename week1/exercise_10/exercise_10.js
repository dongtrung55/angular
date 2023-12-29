var Player;
(function (Player) {
    Player["X"] = "X";
    Player["O"] = "O";
})(Player || (Player = {}));
var TicTacToe = /** @class */ (function () {
    function TicTacToe() {
        this.currentPlayer = Player.X;
        this.board = Array(9).fill(null);
    }
    TicTacToe.prototype.renderBoard = function () {
        var _this = this;
        var appElement = document.getElementById('app');
        if (!appElement)
            return;
        appElement.innerHTML = '';
        this.board.forEach(function (value, index) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value || '';
            cell.addEventListener('click', function () { return _this.handleCellClick(index); });
            appElement.appendChild(cell);
        });
    };
    TicTacToe.prototype.handleCellClick = function (index) {
        if (this.board[index] || this.calculateWinner()) {
            return;
        }
        this.board[index] = this.currentPlayer;
        this.renderBoard();
        var winner = this.calculateWinner();
        if (winner) {
            alert("Player ".concat(winner, " wins!"));
            this.resetGame();
        }
        else if (!this.board.includes(null)) {
            alert('It\'s a draw!');
            this.resetGame();
        }
        else {
            this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
        }
    };
    TicTacToe.prototype.calculateWinner = function () {
        var lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var a = line[0], b = line[1], c = line[2];
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }
        return null;
    };
    TicTacToe.prototype.resetGame = function () {
        this.currentPlayer = Player.X;
        this.board = Array(9).fill(null);
        this.renderBoard();
    };
    TicTacToe.prototype.start = function () {
        this.renderBoard();
    };
    return TicTacToe;
}());
var game = new TicTacToe();
game.start();
