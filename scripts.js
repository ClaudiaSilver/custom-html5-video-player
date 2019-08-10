// Get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle'); // this is the play button
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build functions

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
 }   
    // Same as:
//     if(video.paused) {
//         video.play();
//     } else {
//         video.pause();
//     }
 
function updateButton() {
    const icon = this.paused? '▶️' : '⏸';
    toggle.textContent = icon;
}

function skip() {

}


// Hook up event listeners 

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));