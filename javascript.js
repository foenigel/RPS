let bkgdAudio;
let isMuted = true;  // Start with the audio muted
let audioStarted = false;
let clicks = 0;

function bkgdmusic(){
    bkgdAudio = new Audio('audio/bgm.mp3');
    bkgdAudio.loop = true;
    bkgdAudio.volume = 0.3;

    if (!audioStarted) {
        bkgdAudio.play().catch(error => {
            console.error("Audio playback failed: ", error);
        });
        audioStarted = true; // Set flag to true after starting audio
    }
}

document.addEventListener("DOMContentLoaded", () => {
    bkgdmusic();
});


document.getElementById("soundbttn").addEventListener("click", function() {
    if (isMuted) {
        // Unmute audio when the button is clicked
        bkgdAudio.play().catch(error => {
            console.error("Audio playback failed: ", error);
        });
        this.textContent = "Mute"; // Change button text to "Mute"
        isMuted = false; // Set muted state to false
    } else {
        // Mute audio when the button is clicked
        bkgdAudio.pause(); // Pause sound
        this.textContent = "Unmute"; // Change button text to "Unmute"
        isMuted = true; // Set muted state to true
    }
});



        document.addEventListener("DOMContentLoaded", () => {
        let arrowsound = new Audio('audio/arrowselect.mp3'); // Ensure the path is correct

        // Select all gesture options with class "gesture-option"
        const gestureOptions = document.querySelectorAll('.gesture-option');

        gestureOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Reset sound to start and play it
                arrowsound.currentTime = 0;
                arrowsound.play().catch(error => {
                    console.error("Arrow sound playback failed: ", error);
                });

                // Call selectGesture function with specific gesture name
                const gesture = option.alt; // assuming alt text stores the gesture name (Rock, Paper, Scissors)
                selectGesture(gesture); // This will pass the correct gesture to the function
            });
        });
    });


            let userWins = 0;
            let userLosses = 0;
            let userTies = 0;
            let pcWins = 0;
            let pcLosses = 0;
            let pcTies = 0;

            function updateScores(result) {
            const userWinsElement = document.getElementById('user-wins');
            const userLossesElement = document.getElementById('user-losses');
            const userTiesElement = document.getElementById('user-ties');
            
            const pcWinsElement = document.getElementById('pc-wins');
            const pcLossesElement = document.getElementById('pc-losses');
            const pcTiesElement = document.getElementById('pc-ties');

            if (result === 'You Win!') {
                userWins++;
                pcLosses++;
            } else if (result === 'You Lose!') {
                userLosses++;
                pcWins++;
            } else if (result === 'Its a Tie!') {
                userTies++;
                pcTies++;
            }

            // Update UI
            userWinsElement.textContent = userWins;
            userLossesElement.textContent = userLosses;
            userTiesElement.textContent = userTies;

            pcWinsElement.textContent = pcWins;
            pcLossesElement.textContent = pcLosses;
            pcTiesElement.textContent = pcTies;
        }

            document.addEventListener("DOMContentLoaded", () => {
                const toggleButton = document.getElementById("theme-toggle");

                toggleButton.addEventListener("click", () => {
                    document.body.classList.toggle("dark-mode");

                    // Save the current theme to localStorage
                    if (document.body.classList.contains("dark-mode")) {
                        localStorage.setItem("theme", "dark");
                    } else {
                        localStorage.setItem("theme", "light");
                    }
                });

                // Load the theme from localStorage on page load
                if (localStorage.getItem("theme") === "dark") {
                    document.body.classList.add("dark-mode");
                }
            });

            window.onload = function() {
                const userCard = document.getElementById('user-card');
                setTimeout(() => {
                    userCard.classList.add('flipped');
                }, 1000); 
            };

            function selectGesture(gesture) {
                const arrowSelect = document.getElementById('arrow-select');
                const userSelectionImage = document.getElementById('user-selection');
                let leftPosition = 0;
                const useroption = '';
                const randomNum = Math.random();
                let result = '';
                let pcmove = '';
                let imageSrc = '';

                //switch case to switch between options
                switch (gesture){
                    case 'Rock':
                        leftPosition = '27px';
                        imageSrc = 'images/rock-selection.svg';
                        break;
                    case 'Paper':
                        leftPosition = '97px';
                        imageSrc = 'images/paper-selection.svg';
                        break;
                    case 'Scissors':
                        leftPosition = '167px';
                        imageSrc = 'images/scissors-selection.svg';
                        break;
                }
                arrowSelect.style.left = leftPosition;
                userSelectionImage.src = imageSrc;
                userSelectionImage.style.display = 'block';
                
            }


            function readyGo(){

                if (clicks >= 5){
                    showFinalScore();
                    return;
                }

                 randomNum = Math.random();
                pcmove = '';
                if (randomNum >=0 && randomNum < 1/3){
                pcmove = 'Rock';
                }
                else if (randomNum >=1/3 && randomNum < 2/3){
                pcmove ='Paper';
                }
                else if (randomNum >=2/3 && randomNum < 1){
                pcmove = 'Scissors';
                }
                console.log(pcmove);
                
                
                result = '';
                if (useroption === 'Rock' && pcmove === 'Rock'){
                    result = 'Its a Tie!';
                }
                else if (useroption === 'Rock' && pcmove === 'Paper'){
                    result = 'You Lose!';
                }
                else if (useroption === 'Rock' && pcmove === 'Scissors'){
                    result = 'You Win!';
                }



                else if (useroption === 'Paper' && pcmove === 'Rock'){
                    result = 'You Win!';
                }
                else if (useroption === 'Paper' && pcmove === 'Paper'){
                    result = 'Its a Tie!';
                }
                else if (useroption === 'Paper' && pcmove === 'Scissors'){
                    result = 'You Lose!';
                }


                else if (useroption === 'Scissors' && pcmove === 'Rock'){
                    result = 'You Lose!';
                }
                else if (useroption === 'Scissors' && pcmove === 'Paper'){
                    result = 'You Win!';
                }
                else if (useroption === 'Scissors' && pcmove === 'Scissors'){
                    result = 'Its a Tie!';
                }
           
                updateScores(result);
                clicks++;
                console.log(clicks);
                showResults(result, pcmove);
                
            }

            function showResults(result, pcmove){
                if (result === 'You Win!'){
                WinresultAudioPlay();
                }

                else if (result === 'You Lose!'){
                    loseResultAudioPlay();
                }

                else if (result === 'Its a Tie!'){
                    loseResultAudioPlay();
                }
                const showgamerslt = document.getElementById('game-result');
                showgamerslt.style.display = 'flex';
                document.getElementById('game-result-text').textContent = result;
                document.getElementById('computer-move-text').textContent = `Computer chose: ${pcmove}`;
            }

            function WinresultAudioPlay(){
                const resultsAudio = new Audio('audio/results.mp3'); 
                resultsAudio.play();
            }

            function loseResultAudioPlay(){
                const lResultAudio = new Audio('audio/lose2.mp3');
                lResultAudio.play();
            }

            function closeGame(){
                const closewindow = document.getElementById('game-result');
                closewindow.style.display = 'none';

                const blurbackground = document.querySelector('.cards-container');
                const blurbackground2 = document.querySelector('.ingame-instructions');
                const blurbackground3 = document.getElementById('clouds');
            
                blurbackground.classList.remove('blur-background');
                blurbackground2.classList.remove('blur-background');
                blurbackground3.classList.remove('blur-background');

                closewindow.style.height = '';
                closewindow.style.width = ''; 

                resetScores();
            }

            function showFinalScore() {
                const blurbackground = document.querySelector('.cards-container');
                const blurbackground2 = document.querySelector('.ingame-instructions');
                const blurbackground3 = document.getElementById('clouds');
                // Add blur effect to the body
                blurbackground.classList.add('blur-background');
                blurbackground2.classList.add('blur-background');
                blurbackground3.classList.add('blur-background');

                const showgamerslt = document.getElementById('game-result');
                showgamerslt.style.display = 'flex';
                showgamerslt.style.height = '400px';
                showgamerslt.style.width = '400px';
                 // Show final results
                document.getElementById('game-result-text').textContent = "Game Over!";
                document.getElementById('computer-move-text').style.fontSize = '12px';
                document.getElementById('computer-move-text').style.fontWeight = '300';
                const scoreText = `Your total score: <br><br> Wins: ${userWins}<br><br> Losses: ${userLosses}<br><br> Ties: ${userTies}`;
                
                // Set innerHTML to allow the <br> to be rendered
                document.getElementById('computer-move-text').innerHTML = scoreText; 
            }
            
            // Function to reset scores
            function resetScores() {
                userWins = 0;
                userLosses = 0;
                userTies = 0;

                 pcWins = 0;
                 pcLosses = 0;
                 pcTies = 0;
                
                // Update UI
                updateScores('reset'); // Call to reset score display, may need to update this based on your UI logic
                clicks = 0; // Reset clicks count
            }