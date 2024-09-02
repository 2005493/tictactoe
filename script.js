let boxes = document.querySelectorAll('.boxs');
let currentPlayer = "X";
let isGameActive = true;

// Define handleClick function globally
function handleClick(event) {
    let box = event.target;

    if (box.textContent === "" && isGameActive) {
        box.textContent = currentPlayer;
       
        let winner = winningCondition();
        if (winner === "continue") {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateMessage(`Player ${currentPlayer}'s turn`);
        } else if (winner === "tie") {
            updateMessage("It's a tie!");
            isGameActive = false;
            
        } else {
            updateMessage(`${winner} wins!`);
            isGameActive = false;
            
        }
    }
    else {
        updateMessage("resting game");
        setTimeout(resetGame, 1000); // Delay the reset by 1 second
    }
    
}

function winningCondition() {
    // Checking rows
    if (boxes[0].textContent !== "" && boxes[0].textContent === boxes[1].textContent && boxes[1].textContent === boxes[2].textContent) {
        return boxes[0].textContent;
    }
    if (boxes[3].textContent !== "" && boxes[3].textContent === boxes[4].textContent && boxes[4].textContent === boxes[5].textContent) {
        return boxes[3].textContent;
    }
    if (boxes[6].textContent !== "" && boxes[6].textContent === boxes[7].textContent && boxes[7].textContent === boxes[8].textContent) {
        return boxes[6].textContent;
    }

    // Checking columns
    if (boxes[0].textContent !== "" && boxes[0].textContent === boxes[3].textContent && boxes[3].textContent === boxes[6].textContent) {
        return boxes[0].textContent;
    }
    if (boxes[1].textContent !== "" && boxes[1].textContent === boxes[4].textContent && boxes[4].textContent === boxes[7].textContent) {
        return boxes[1].textContent;
    }
    if (boxes[2].textContent !== "" && boxes[2].textContent === boxes[5].textContent && boxes[5].textContent === boxes[8].textContent) {
        return boxes[2].textContent;
    }

    // Checking diagonals
    if (boxes[0].textContent !== "" && boxes[0].textContent === boxes[4].textContent && boxes[4].textContent === boxes[8].textContent) {
        return boxes[0].textContent;
    }
    if (boxes[2].textContent !== "" && boxes[2].textContent === boxes[4].textContent && boxes[4].textContent === boxes[6].textContent) {
        return boxes[2].textContent;
    }

    // Checking for tie
    if (Array.from(boxes).every(cell => cell.textContent !== "")) {
        return "tie";
        //we are using this from(boxes) beacuse boxes might beahve as a array but it is not an array it a nodeList we first have to convert it into an array so that we can use array property like every()
    }

    return "continue";
}

function updateMessage(message) {
    document.getElementById('message').textContent = message;
}

function resetGame() {
    
    boxes.forEach((box) => {
        box.textContent = ""; // Clear the board
        
    });
    currentPlayer = "X"; // Reset the current player to X
    isGameActive = true;
    updateMessage(`Player ${currentPlayer}'s turn`);
}

// Add event listeners to each div
boxes.forEach((box) => {
    box.addEventListener('click', handleClick);
});
