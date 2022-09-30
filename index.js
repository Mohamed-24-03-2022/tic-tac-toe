function Player(name, choice, order) {
    const player = {
        name: name,
        choice: choice,
        order: order,
    };
    return player;
}
const gameboard = (() => {
    const playerOne = Player("Player one", "x", 1);
    const playerTwo = Player("Player two", "o", 2);
    const score = {
        playerOne: [],
        playerTwo: [],
    };
    const generatePlayerChoice = (box) => {
        if (box.textContent === "x" || box.textContent === "o") return;
        const xNumber = score.playerOne.length;
        const oNumber = score.playerTwo.length;
        if (xNumber === 0 || xNumber === oNumber) {
            score.playerOne.push(playerOne.choice);
        } else if (xNumber > oNumber) {
            score.playerTwo.push(playerTwo.choice);
        }
    };
    return { score, generatePlayerChoice, playerOne, playerTwo };
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
    return { hideContainer, showContainer };
})();
const displayController = (() => {
    const boxesContainer = document.querySelector(".boxes-container");
    //* using event delegation
    const populationBoxes = (e) => {
        gameboard.generatePlayerChoice(e.target);
        const box = e.target;
        const score = gameboard.score;
        const choiceText = document.createElement("span");
        if (box.textContent === "x" || box.textContent === "o") {
            return;
        } else if (score.playerOne.length > score.playerTwo.length) {
            choiceText.textContent = score.playerOne[score.playerOne.length - 1];
        } else if (score.playerOne.length === score.playerTwo.length) {
            choiceText.textContent = score.playerTwo[score.playerTwo.length - 1];
        }
        box.appendChild(choiceText);
        chooseWinner();
    };
    boxesContainer.addEventListener("click", populationBoxes);
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
        resettingGame(`${gameboard.playerOne.name} has won.`);
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
        resettingGame("You Lost");
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
        resettingGame("It's a tie");
    }
}
const resettingGame = (result) => {
    const resultParagraph = document.querySelector(".result-container p");
    const resetButton = document.querySelector(".result-container button");
    resultParagraph.textContent = result;
    changeContainerVisibility.showContainer();
    displayController.boxesContainer.removeEventListener("click", displayController.populationBoxes);
    resetButton.addEventListener("click", () => {
        gameboard.score.playerOne = [];
        gameboard.score.playerTwo = [];
        document.querySelectorAll(".box span").forEach((choiceText) => {
            choiceText.textContent = "";
            choiceText.remove();
        });
        changeContainerVisibility.hideContainer();
        displayController.boxesContainer.addEventListener("click", displayController.populationBoxes);
    });
};
