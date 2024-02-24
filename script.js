function generateComputerSelection(){

    const rand = Math.floor((Math.random()*3));
    return uppercaseOnlyFirst(rand===0 ? "rock" : rand===1 ? "paper" : "scissors");
    
}



function prepareNewRound(messages = ["Rock", "Paper", "Scissors"]) {
    
    setTimeout(function(){

        const lastArrIndex = messages.length-1;

        for (let i = 0; i <= lastArrIndex; i++){
            setTimeout(function(){
                resultSection.textContent = messages[i];
            }, ( 1000*i ));

            if(i===lastArrIndex){
                setTimeout(function(){
                    resultSection.textContent = "Make your choice!";
                    disableButtons(false);
                }, 1000*(lastArrIndex+1));
            }
        }
    }, 1000);
}    

function resetSelections(){
    if (selectedButton){
        setTimeout(function(){
            selectedButton.classList = '';
            computerChoiceSection.classList = "";
            computerChoiceSection.classList.add("noChoice");
            playerChoiceSection.classList = '';
            playerChoiceSection.classList.add("noChoice");
            resultSection.textContent = "";
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
        delayNextRound();
    }
}

function delayNextRound(){
    const afterRoundDelay = 1400;
    setTimeout(function(){

        setTimeout(function(){
            prepareNewRound();
        },500)

        resetSelections();

        }, afterRoundDelay);
}

function disableButtons(trueOrFalse){
    choiceButtons.forEach(button => {button.disabled = trueOrFalse;});

    if (!trueOrFalse){
        addChangeImageOnHover();
        addRevertDefaultImage();
    }else{
        clearImageFunctions();
    }
}



const choiceButtons = document.querySelectorAll(".choice-button");
const resultSection = document.querySelector("#roundResultSection");
const computerChoiceSection = document.querySelector("#computerChoiceSection");
const playerChoiceSection = document.querySelector("#playerChoiceSection");

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
    computerChoiceSection.classList.add(computerChoice);

    const roundResult = playRound(playerChoice, computerChoice);

    resultSection.textContent = roundResult;

    checkRoundWinner(roundResult);
    checkGameWinner(choiceButtons, button);
    
}))



function addChangeImageOnHover(){
    choiceButtons.forEach(button=>{
        button.addEventListener("mouseenter", changeImageOnHover)
    })
}

function addRevertDefaultImage(){
    choiceButtons.forEach(button=>{
        button.addEventListener("mouseleave", revertDefaultImage);
    })
}

function changeImageOnHover(){
    console.log(this);
    playerChoiceSection.classList = "";
    playerChoiceSection.classList.add(this.dataset.choice);
}

function clearImageFunctions(){
    choiceButtons.forEach(button=>{
        button.removeEventListener("mouseenter", changeImageOnHover);
        button.removeEventListener("mouseleave", revertDefaultImage);
    })

}


function revertDefaultImage(){
    console.log(this);
    playerChoiceSection.classList = "";
    playerChoiceSection.classList.add("noChoice");
}

disableButtons(true);
prepareNewRound();

