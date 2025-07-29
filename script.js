document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const userChoiceDisplay = document.getElementById('user-choice');
    const computerChoiceDisplay = document.getElementById('computer-choice');
    const resultMessageDisplay = document.getElementById('result-message');
    const choiceButtons = document.querySelectorAll('.choice-button');

    // Get references for score and play again button
    const playerScoreDisplay = document.getElementById('player-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    const playAgainButton = document.getElementById('play-again-button');


    let userChoice;
    const possibleChoices = ['rock', 'paper', 'scissors'];

    // Initialize scores
    let playerScore = 0;
    let computerScore = 0;

    // Function to update the score display
    function updateScoreDisplay() {
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
    }

    // Add event listeners to each choice button
    choiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            userChoice = e.target.id;
            userChoiceDisplay.textContent = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
            generateComputerChoice();
            determineResult();
            playAgainButton.style.display = 'block'; // Show play again button after a round
        });
    });

    // Function to generate computer's random choice
    function generateComputerChoice() {
        const randomNumber = Math.floor(Math.random() * 3); // Generates 0, 1, or 2
        const computerChoice = possibleChoices[randomNumber]; // Maps the number to 'rock', 'paper', or 'scissors'
        computerChoiceDisplay.textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1); // Display computer's choice
    }

    // Function to determine the winner
    function determineResult() {
        const user = userChoice;
        const computer = computerChoiceDisplay.textContent.toLowerCase();

        if (user === computer) {
            resultMessageDisplay.textContent = "It's a Draw!";
            resultMessageDisplay.style.color = "#6c757d"; // Gray for draw
        } else if (
            (user === 'rock' && computer === 'scissors') ||
            (user === 'paper' && computer === 'rock') ||
            (user === 'scissors' && computer === 'paper')
        ) {
            resultMessageDisplay.textContent = "You Win!";
            resultMessageDisplay.style.color = "#28a745"; // Green for win
            playerScore++; // Increment player score
        } else {
            resultMessageDisplay.textContent = "You Lose!";
            resultMessageDisplay.style.color = "#dc3545"; // Red for lose
            computerScore++; // Increment computer score
        }
        updateScoreDisplay(); // Update the score display after each round
    }

    // Add event listener for the Reset Score button
    playAgainButton.addEventListener('click', () => {
        // Reset displays
        userChoiceDisplay.textContent = '';
        computerChoiceDisplay.textContent = '';
        resultMessageDisplay.textContent = '';
        resultMessageDisplay.style.color = "#28a745"; // Reset color to default green
        playAgainButton.style.display = 'none'; // Hide the button again

        // Reset scores to 0
        playerScore = 0;
        computerScore = 0;
        updateScoreDisplay(); // Update display after resetting scores
    });

    // Initialize score display when the page loads
    updateScoreDisplay();
});