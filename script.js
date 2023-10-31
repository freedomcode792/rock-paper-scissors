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

console.log("Hello World!")

function generateComputerSelection(){
    /*should randomly output one of three strings:"Rock", "Paper"
    or "Scissors" */
    /*first get randomly one of the three numbers: 0,1 or 2 */
    const rand = Math.floor((Math.random()*3));
    return rand===0 ? "Rock" : rand===1 ? "Paper" : "Scissors";
    
}

function printMessagesWithDelay(messages) {
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

    return playerSelection;

}
console.log(getPlayerSelection());