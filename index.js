$(function () {
    const statusDisplay = document.querySelector('.game-status');
    let gameActive = true;
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let xAmountOfWins = 0;
    let oAmountOfWins = 0;
    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
    
    $(".x-wins").text("X: " + xAmountOfWins);
    $(".o-wins").text("O: " + oAmountOfWins);

    statusDisplay.innerHTML = currentPlayerTurn();

    function handleCellPlayed(CLICKED_CELL, CLICKED_CELL_INDEX) {
            gameState[CLICKED_CELL_INDEX] = currentPlayer;
            CLICKED_CELL.innerHTML = currentPlayer;
        }

        function handlePlayerChange() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerHTML = currentPlayerTurn();
        }

    const WINNING_CONDITIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            let winCondition = WINNING_CONDITIONS[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        playersAmountOfWins();
        gameActive = false;
        return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        handlePlayerChange();
        
    }

    function handleCellClick(clickedCellEvent) {
            const CLICKED_CELL = clickedCellEvent.target;
    
            const CLICKED_CELL_INDEX = parseInt(
            CLICKED_CELL.getAttribute('data-cell-index')
            );
        
            if (gameState[CLICKED_CELL_INDEX] !== "" || !gameActive) {
                return;
            }
            
            handleCellPlayed(CLICKED_CELL, CLICKED_CELL_INDEX);
            handleResultValidation();
        }

        function restartGame() {
            gameActive = true;
            currentPlayer = "X";
            gameState = ["", "", "", "", "", "", "", "", ""];
            statusDisplay.innerHTML = currentPlayerTurn();
            document.querySelectorAll('.cell')
                    .forEach(cell => cell.innerHTML = "");
        }

    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    document.querySelector('.game-restart').addEventListener('click', restartGame);

    function displayRules() {
        $(".game-rules > h3").on({
            click: function() {
                $(".read-rules").hasClass("active") ? $(".read-rules").removeClass("active") : $(".read-rules").addClass("active");
                if ($("h3 > i").hasClass("fa fa-angle-down")) {
                    $("h3 > i").removeClass("fa fa-angle-down");
                    $("h3 > i").addClass("fa fa-angle-up");
                } else if ($("h3 > i").hasClass("fa fa-angle-up")) {
                    $("h3 > i").removeClass("fa fa-angle-up");
                    $("h3 > i").addClass("fa fa-angle-down");
                }   
            } 
        })
    }

    displayRules();

    
    function playersAmountOfWins() {
        if (currentPlayer === "X") {
            oAmountOfWins++;
        } else {
            xAmountOfWins++;
        }
    }

})
