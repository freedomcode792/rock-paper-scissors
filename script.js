function generateComputerSelection(){

    const rand = Math.floor((Math.random()*3));
    return uppercaseOnlyFirst(rand===0 ? "rock" : rand===1 ? "paper" : "scissors");
    
}

function prepareNewRound(messages = ["Rock", "Paper", "Scissors"]) {
    
    resetSelectedButton();

    for (let i = 0; i < messages.length; i++){
        setTimeout(
            function () {

                resultSection.textContent = messages[i];
            }
        ,1000*(i+1));

        if(i>=messages.length-1){
            setTimeout(
                function() {
                    resultSection.textContent = "Make your choice!";
                    disableButtons(false);
                }
            ,1000*(i+1.8));
        }  
    }
}    

function resetSelectedButton(){
    if (selectedButton){
        setTimeout(function(){
            selectedButton.classList = '';
            computerChoiceSection.textContent='';
        }, 1000);
    }
}

function playRound(playerSelection, computerSelection){

    if (playerSelection === "Rock") {
        return computerSelection == "Rock" ? "Draw" : 
                computerSelection == "Paper" ? "Paper beats Rock You lost!" :
                 "Rock beats Scissors! You won!"
    }else if (playerSelection === "Paper") {
        return computerSelection == "Paper" ? "Draw" :
                computerSelection == "Scissors" ? "Scissors beats Paper! You lost!" :
                 "Paper beats Rock! You won!"
    } else if (playerSelection === "Scissors") {
        return computerSelection == "Scissors" ? "Draw" :
                computerSelection == "Rock" ? "Rock beats Scissors! You lost!" :
                 "Scissors beats Paper! You won!"           
    }    
}


function getPlayerSelection(){

    let playerSelection=prompt("Make your choice!");
    const check = /^((rock)|(paper)|(scissors))$/i;
    while (!(check.test(playerSelection))){
        playerSelection=prompt('Please enter "Rock", "Paper" or "Scissors"');
    }
    
    return uppercaseOnlyFirst(playerSelection);
}

function uppercaseOnlyFirst(str){
    const lowercaseStr = str.toLowerCase();
    return  lowercaseStr.slice(0,1).toUpperCase() + lowercaseStr.slice(1);
}


function checkRoundWinner(roundResult){
    if (roundResult.includes("You won!")) {
        //playerScore++;
        playerScore.textContent++;
        
    } else if (roundResult.includes("You lost!")){
        computerScore.textContent++;
    }
}


function checkGameWinner(chosenButton){
    if(playerScore.textContent==5){
        resultSection.textContent = "Congratulations! You've defeated the computer!";
        return;
    }else if(computerScore.textContent==5){
        resultSection.textContent = "Oh no! The computer has defeated you!";
        return;
    } else {
        console.log("no winner");
        chosenButton.classList = '';
        setTimeout(prepareNewRound, 1000);
    }
}


function disableButtons(trueOrFalse){
    choiceButtons.forEach(button => {button.disabled = trueOrFalse;});

}



const choiceButtons = document.querySelectorAll(".choice-button");
const resultSection = document.querySelector("#roundResultSection");
const computerChoiceSection = document.querySelector("#computerChoiceSection");

let playerScore = document.getElementById('playerScore');
let computerScore = document.getElementById('computerScore');
let selectedButton;

choiceButtons.forEach(button => button.addEventListener("click", (e) =>{
    button.classList.add("buttonChosen");
    selectedButton = button;
    disableButtons(true);
    

    const playerChoice = e.target.dataset.choice;
    console.log(playerChoice);

    const computerChoice = generateComputerSelection();
    computerChoiceSection.textContent = computerChoice;

    const roundResult = playRound(playerChoice, computerChoice);

    resultSection.textContent = roundResult;

    checkRoundWinner(roundResult);
    checkGameWinner(choiceButtons, button);
    
}))

disableButtons(true);
prepareNewRound();

