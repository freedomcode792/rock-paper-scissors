/*Rock, Paper, Scissors Game*/

/*Notes:
    - Commit early and often.
    - Make sure you understand the assignment.
    - Plan your solution.
    - Break big problems down.
    - Reduce the problems you can't solve to something close but
        simpler.
    - Do your best to write your code in self-explanatory manner.
*/

/* 
    1) Understand the problem
*/

/*Plan:
    1. Write a function that randomly returns into the browser 
    console either "Rock","Paper" or "Scissors". This function will
    provide the computer input.

    2. Write a function that plays a single round of Rock, Paper. Scissors
    The function should take two parameters: playerSelection and 
    computerSelection and should return a message declaring the
    winner.
        1) Output a message such as "rock, paper, scissors!" or something 
        like that, to make the user aware that the round has started.
        Wrap this into a function.
        2) Prompt the user for input. Input needs to be checked for
        validity. Both of these can be wrapped into functions, but the
        second one absolutely should.
        3)Compare the userChoice with computerChoice and determine the
        winner. Output the result of the match as a string. All of this
        can be done in one function we will call "decideWinner"


*/



function generateComputerSelection(){
    /*should randomly output one of three strings:"Rock", "Paper"
    or "Scissors" */
    /*first get randomly one of the three numbers: 0,1 or 2 */
    const rand = Math.floor((Math.random()*3));
    return uppercaseOnlyFirst(rand===0 ? "rock" : rand===1 ? "paper" : "scissors");
    
}

function printMessagesWithDelay(messages, nextFunction) {
    /*should:
     1)print three stings:"Rock","Paper","Scissors" into the console
     with a delay between each print
     2)prompt the user for input with
     a message "Make your choice!".
     */
     
    for (let i = 0; i < messages.length; i++){
        setTimeout(
            function () {
                console.log(messages[i]);
            }
        ,1000*(i+1));

        if(i>=messages.length-1){
            setTimeout(
                function() {
                    console.log("Make your choice!");
                }
            ,1000*(i+1.5))
        }  
    }
}    


function playRound(playerSelection, computerSelection){
/*check who's won
    if computer won
        return "you lost!"
    
    if player won
        return "you won!"

    if it's a draw
        return "draw!"
*/

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
    /*The function should:
        1. prompt the user for a string
        2. check whether the string provided is correct
            -I gonna need regex to pull this off. 
        3. if yes -> return the string
        4. if not -> prompt for a new string
    */
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

function game () {
    /*This function should tie together all the other functions
    to create a complete game. The game will consist of 5 rounds,
    and should keep score. After the 5th game has been played,
    the function should determine the winner.*/

    /*Actually, after having though about this, it doesn't make
    much sense to just play 5 games, because if one side has
    score 3 wins in a row from the very start, it makes the
    remaining 2 games kinda meaningless. It will be much better to
    play the game indefinitely until one side has reached 5 victories.*/

    /*Plan:
        1) create variables tracking the score of the two players
        2) create an indefinite loop which ends after one of the variables
        has reached 5. 
            - each iteration of the loop should:
                1) output the message signaling the start of a new game (use printMessagesWithDelay function)
                2) prompt the user to make their choice (use getUserSelection function)
                3) get a game result using playRound function and assign a point to the winner
                4) output the current score of both players (need a simple function of this)
                5) introduce a delay before the next iteration for the player to have some time to see the result and the score
            - if computer has reached the victory score

        Note: I need to introduce a delay before the start of a new round. Perhaps I could "freeze" the cycle somehow?
    */

    /*Due to the peculiarities of timeouts in Javascript, I need to
    rework game function: instead of a loop It should be based on
    recursion and external variables to stop it.
    
    */


    let playerScore = 0;
    let computerScore = 0;
    //let noWinner = true;
    newGame();

    

    function newGame(){
        /*
            print introductory messages with a delay
            (this part will probably also require the rest of the
                code to be executed with a timeout)
    
            Note: it looks like working with delays comes down to
            delaying the execution of the code that follows after.
    
            get player choice
            get computer choice
            get round result
            print the choices and the result
            add score to the winner
    
            if player got 5 wins {
                print: "you won!"
                end the function
            }
    
            if computer got 5 wins {
                print: "you lost!"
                end the function
            }
    
            if no winner == true {
                repeatGame with delay
    
            There should be delays in two places:
                -a delay of code execution until the intro messages have been printed
                -a delay of the next recursion of the function 
                plus the delays between the starting messages
            }
        */  
            printMessagesWithDelay(["Rock", "Paper", "Scissors"]);
            /*Wait until the messages have been output and start the code */
            
            setTimeout(()=>{
                let playerSelection = getPlayerSelection();
                let computerChoice = generateComputerSelection();
                let roundResult = playRound(playerSelection, computerChoice);
                console.log('--------------------');
                console.log("Your choice: ", playerSelection);
                console.log("Computer choice: ", computerChoice);
                console.log(roundResult);
                
                if (roundResult.includes("You won!")) {
                    playerScore++;
                    
                } else if (roundResult.includes("You lost!")){
                    computerScore++;
                }
    
                console.log("Your score: ", playerScore);
                console.log("Computer score: ", computerScore);
                console.log('============================');
            
                if(playerScore==5){
                    noWinner=false;
                    console.log("Congratulations! You've defeated the computer!");
                    return;
                }else if(computerScore==5){
                    noWinner=false;
                    console.log("Oh now! The computer has defeated you!");
                    return;
                } else {
                    setTimeout(newGame, 2000);
                }
            }, 4000);
    
    }
}
//game();
const choiceButtons = document.querySelectorAll(".choice-button");

choiceButtons.forEach(button => button.addEventListener("click", (e)=>{
    console.log(e.target.dataset.choice);
    const computerChoice = generateComputerSelection();
    console.log(computerChoice);
    console.log(playRound(e.target.dataset.choice, computerChoice));
}))



