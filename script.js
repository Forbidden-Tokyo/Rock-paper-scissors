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

    // Get reference for max score display
    const maxScoreDisplay = document.getElementById('max-score-display');


    let userChoice;
    const possibleChoices = ['rock', 'paper', 'scissors'];

    // Game state variables for "Best of X"
    let playerScore = 0;
    let computerScore = 0;
    const bestOfRounds = 5; // Defines "Best of 5" (change this number for other "Best of X" values)
    const maxScoreToWin = Math.floor(bestOfRounds / 2) + 1; // Calculates the score needed

    // Initialize the max score display on page load
    maxScoreDisplay.textContent = maxScoreToWin;

    // Function to disable choice buttons (when game ends)
    function disableChoiceButtons() {
        choiceButtons.forEach(button => {
            button.disabled = true;
        });
    }

    // Function to enable choice buttons (for a new game)
    function enableChoiceButtons() {
        choiceButtons.forEach(button => {
            button.disabled = false;
        });
    }

    // Function to update the score display
    function updateScoreDisplay() {
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
    }

    // Add event listeners to each choice button
    choiceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Only allow a new round if the game is NOT already over
            if (playerScore < maxScoreToWin && computerScore < maxScoreToWin) {
                userChoice = e.target.id;
                userChoiceDisplay.textContent = userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
                generateComputerChoice();
                determineResult();
                playAgainButton.style.display = 'block'; // Show play again button after a round
            }
        });
    });

    // Function to generate computer's random choice
    function generateComputerChoice() {
        const randomNumber = Math.floor(Math.random() * 3);
        const computerChoice = possibleChoices[randomNumber];
        computerChoiceDisplay.textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
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
            resultMessageDisplay.textContent = "You win this round!"; // Clarify round win
            resultMessageDisplay.style.color = "#28a745"; // Green for win
            playerScore++; // Increment player score
        } else {
            resultMessageDisplay.textContent = "You lose this round!"; // Clarify round lose
            resultMessageDisplay.style.color = "#dc3545"; // Red for lose
            computerScore++; // Increment computer score
        }
        updateScoreDisplay(); // Update the score display after each round

        // Check for overall game winner after each round
        if (playerScore === maxScoreToWin) {
            resultMessageDisplay.textContent = `🎉 You win the best of ${bestOfRounds} games! 🎉`;
            resultMessageDisplay.style.color = "#007bff"; // Blue for overall win
            disableChoiceButtons(); // Disable buttons as the game is over
            playAgainButton.textContent = "Play New Game"; // Change button text to "Play New Game"
        } else if (computerScore === maxScoreToWin) {
            resultMessageDisplay.textContent = `😢 Computer wins the best of ${bestOfRounds} games! 😢`;
            resultMessageDisplay.style.color = "#dc3545"; // Red for overall lose
            disableChoiceButtons(); // Disable buttons as the game is over
            playAgainButton.textContent = "Play New Game"; // Change button text to "Play New Game"
        }
    }

    // Add event listener for the Play Again / Reset Score / Play New Game button
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

        enableChoiceButtons(); // Re-enable choice buttons for a new game
        playAgainButton.textContent = "Reset Score"; // Reset button text back
    });

    // Initialize score display when the page loads
    updateScoreDisplay();
});
