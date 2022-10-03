function Player(name, choice, order) {
    const player = {
        name: name,
        choice: choice,
        order: order,
    };
    return player;
}
const choosePlayerNames = () => {
    document.body.style.backgroundColor = "#000000";
    const startButton = document.querySelector(".form-container button");
    const playerTwoNameInput = document.querySelector("#player-two-name");
    const isComputer = document.querySelector("#is-computer");
    isComputer.addEventListener("input", () => {
        if (isComputer.checked === true) {
            playerTwoNameInput.disabled = true;
            playerTwoNameInput.value = "Computer";
        } else {
            playerTwoNameInput.disabled = false;
            playerTwoNameInput.value = "";
        }
    });

    startButton.addEventListener("click", () => {
        const formContainer = document.querySelector(".form-container");
        const playerOneNameInput = document.querySelector("#player-one-name");
        const playersNameParagraph = document.querySelectorAll(".player-box p");
        if (
            !playerOneNameInput.value ||
            (!playerTwoNameInput.value && isComputer.checked === false)
        ) {
            return;
        } else {
            document.querySelector(".logo-box .player-one").style.color = "#ffc442";
            gameboard.playerOne.name = playerOneNameInput.value;
            gameboard.playerTwo.name = playerTwoNameInput.value;
            playersNameParagraph[0].textContent = gameboard.playerOne.name;
            playersNameParagraph[1].textContent = gameboard.playerTwo.name;
            formContainer.style.visibility = "hidden";
            startButton.style.visibility = "hidden";
            formContainer.remove();
            startButton.remove();
            document.body.style.backgroundColor = "";
            displayController.boxesContainer.addEventListener(
                "click",
                displayController.populationBoxes
            );
        }
    });
};
const gameboard = (() => {
    const playerOne = Player("Player one", "x", 1);
    const playerTwo = Player("Player two", "o", 2);
    choosePlayerNames();

    const content = {
        playerOne: [],
        playerTwo: [],
    };
    const generatePlayerChoice = (box) => {
        if (box.textContent === "x" || box.textContent === "o") return;
        const xNumber = content.playerOne.length;
        const oNumber = content.playerTwo.length;
        if (xNumber === 0 || xNumber === oNumber) {
            document.querySelector(".logo-box .player-one").style.color = "#333";
            document.querySelector(".logo-box .player-two").style.color = "#ffc442";
            content.playerOne.push(playerOne.choice);
        } else if (xNumber > oNumber) {
            document.querySelector(".logo-box .player-one").style.color = "#ffc442";
            document.querySelector(".logo-box .player-two").style.color = "#333";
            content.playerTwo.push(playerTwo.choice);
        }
    };
    return { content, generatePlayerChoice, playerOne, playerTwo };
})();
const changeContainerVisibility = (() => {
    const resultContainer = document.querySelector(".result-container");
    const resetButton = document.querySelector(".result-container button");
    const hideContainer = () => {
        resultContainer.style.visibility = "hidden";
        resetButton.style.visibility = "hidden";
    };
    const showContainer = () => {
        resultContainer.style.visibility = "visible";
        resetButton.style.visibility = "visible";
    };
    hideContainer();
    return { hideContainer, showContainer, resultContainer };
})();
const displayController = (() => {
    const boxesContainer = document.querySelector(".boxes-container");
    const boxes = document.querySelectorAll(".box");
    const populationBoxes = (e) => {
        boxes.forEach((box) => {
            if (e.target === box) {
                gameboard.generatePlayerChoice(e.target);
                const content = gameboard.content;
                const choiceText = document.createElement("span");
                const xNumber = content.playerOne.length;
                const oNumber = content.playerTwo.length;
                if (box.textContent === "x" || box.textContent === "o") {
                    return;
                } else if (xNumber > oNumber) {
                    choiceText.textContent = content.playerOne[content.playerOne.length - 1];
                    if (gameboard.playerTwo.name === "Computer") {
                        setTimeout(() => generatePcChoice(), 150);
                    }
                } else if (xNumber === oNumber) {
                    choiceText.textContent = content.playerTwo[content.playerTwo.length - 1];
                }
                box.appendChild(choiceText);
                chooseWinner();
            }
        });
    };
    const generatePcChoice = () => {
        const randChoice = Math.floor(Math.random() * 9);
        if (
            boxes[0].textContent !== "" &&
            boxes[1].textContent !== "" &&
            boxes[2].textContent !== "" &&
            boxes[3].textContent !== "" &&
            boxes[4].textContent !== "" &&
            boxes[5].textContent !== "" &&
            boxes[6].textContent !== "" &&
            boxes[7].textContent !== "" &&
            boxes[8].textContent !== ""
        ) {
            return;
        }
        if (boxes[randChoice].textContent === "") {
            boxes[randChoice].click();
        } else if (boxes[randChoice].textContent !== "") {
            generatePcChoice();
            console.log("WRONG BOX OOPS");
        }
    };
    return { boxesContainer, populationBoxes };
})();
const chooseWinner = () => {
    const boxes = document.querySelectorAll(".box");
    const boxContent = (index) => {
        return boxes[index].textContent;
    };
    if (
        (boxContent(0) === "x" && boxContent(1) === "x" && boxContent(2) === "x") ||
        (boxContent(3) === "x" && boxContent(4) === "x" && boxContent(5) === "x") ||
        (boxContent(6) === "x" && boxContent(7) === "x" && boxContent(8) === "x") ||
        (boxContent(0) === "x" && boxContent(3) === "x" && boxContent(6) === "x") ||
        (boxContent(1) === "x" && boxContent(4) === "x" && boxContent(7) === "x") ||
        (boxContent(2) === "x" && boxContent(5) === "x" && boxContent(8) === "x") ||
        (boxContent(0) === "x" && boxContent(4) === "x" && boxContent(8) === "x") ||
        (boxContent(2) === "x" && boxContent(4) === "x" && boxContent(6) === "x")
    ) {
        console.log("YOU WIN");
        document.querySelector(".logo-box .player-one").style.color = "#ffc442";
        document.querySelector(".logo-box .player-two").style.color = "#333";
        resetGame(`${gameboard.playerOne.name} has won.`);
    } else if (
        (boxContent(0) === "o" && boxContent(1) === "o" && boxContent(2) === "o") ||
        (boxContent(3) === "o" && boxContent(4) === "o" && boxContent(5) === "o") ||
        (boxContent(6) === "o" && boxContent(7) === "o" && boxContent(8) === "o") ||
        (boxContent(0) === "o" && boxContent(3) === "o" && boxContent(6) === "o") ||
        (boxContent(1) === "o" && boxContent(4) === "o" && boxContent(7) === "o") ||
        (boxContent(2) === "o" && boxContent(5) === "o" && boxContent(8) === "o") ||
        (boxContent(0) === "o" && boxContent(4) === "o" && boxContent(8) === "o") ||
        (boxContent(2) === "o" && boxContent(4) === "o" && boxContent(6) === "o")
    ) {
        console.log("you lost");
        document.querySelector(".logo-box .player-one").style.color = "#333";
        document.querySelector(".logo-box .player-two").style.color = "#ffc442";
        resetGame("You Lost");
    } else if (
        boxContent(0) &&
        boxContent(1) &&
        boxContent(2) &&
        boxContent(3) &&
        boxContent(4) &&
        boxContent(5) &&
        boxContent(6) &&
        boxContent(7) &&
        boxContent(8)
    ) {
        console.log("It's a tie");
        document.querySelector(".logo-box .player-one").style.color = "#ffc442";
        document.querySelector(".logo-box .player-two").style.color = "#ffc442";
        resetGame("It's a tie");
    }
};
const resetGame = (result) => {
    const resultParagraph = document.querySelector(".result-container p");
    const resetButton = document.querySelector(".result-container button");
    resultParagraph.textContent = result;
    changeContainerVisibility.showContainer();
    displayController.boxesContainer.removeEventListener(
        "click",
        displayController.populationBoxes
    );
    resetButton.addEventListener("click", () => {
        gameboard.content.playerOne = [];
        gameboard.content.playerTwo = [];
        document.querySelector(".logo-box .player-one").style.color = "#ffc442";
        document.querySelector(".logo-box .player-two").style.color = "#333";
        document.querySelectorAll(".box span").forEach((choiceText) => {
            choiceText.textContent = "";
            choiceText.remove();
        });
        changeContainerVisibility.hideContainer();
        displayController.boxesContainer.addEventListener(
            "click",
            displayController.populationBoxes
        );
    });
};
const restartGame = (() => {
    const restartButton = document.querySelector(".restart-container button");
    restartButton.addEventListener("click", () => {
        if (
            changeContainerVisibility.resultContainer.style.visibility === "visible"
        ) {
            return;
        }
        document.querySelector(".logo-box .player-one").style.color = "#ffc442";
        document.querySelector(".logo-box .player-two").style.color = "#333";
        gameboard.content.playerOne = [];
        gameboard.content.playerTwo = [];
        document.querySelectorAll(".box span").forEach((choiceText) => {
            choiceText.textContent = "";
            choiceText.remove();
        });
    });
})();

//todo read my documentation in oneNote
//todo highlight player turn
//todo add computer player
//todo try remove IIFE if it's not necessary (by trying to delete and see the feedback)
