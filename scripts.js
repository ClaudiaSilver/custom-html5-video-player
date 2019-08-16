// Get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle'); // this is the play button
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');


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
    const icon = this.paused ? `<i class="material-icons">${'pause'}</i>` : `<i class="material-icons">${'play_arrow'}</i>`
    toggle.innerHTML = icon;
}

function skip() {
    console.log(this.dataset.skip); // accesses all data- attributes with 'skip' 
    //currentTime specifies current playback time in seconds
    video.currentTime += parseFloat(this.dataset.skip); //converts string into a decimal
}
// volume and playbackRate sliders:
function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value);
    console.log(this.name); 
}

// progress bar: updates flex-basis value to visually fill bar; flex-basis sets the initial size of a flex item
// only works in conjuction with time update event listener
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; 
}

function scrub(e){
    console.log(e); //logs the offsetX and offsetY pixel values
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// toggles fullscreen
function screenToggle() {
    if(!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
         video.exitFullscreen();
    } 
}

// Hook up event listeners 

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); // triggers when video's time code is being updated


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false; // flag variable
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // only moves on to scrub if mousedown is true!
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mousedown', () => mousedown = false);

// add full screen button 
fullScreen.addEventListener('click', screenToggle);

