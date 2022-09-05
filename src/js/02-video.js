import throttle from 'lodash.throttle';
import Player from '@vimeo/player/dist/player.js';
// console.log(Player.prototype);


const iframe = document.querySelector('iframe');
// console.log(iframe);

const player = new Player(iframe);
// console.log(player);


const STORAGE_TIME = "videoplayer-current-time";

function onPlayTimeSaver(event) {
    let playTime = event.seconds;
    localStorage.setItem(STORAGE_TIME, playTime);
// console.log("значение времени", playTime);
    
};

player.on('timeupdate', throttle(onPlayTimeSaver, 1000));

let lastTimeValue = localStorage.getItem(STORAGE_TIME);
// console.log(lastTimeValue);
if (lastTimeValue) {
player.setCurrentTime(lastTimeValue)};




// event listener

// const logPlayerPlay = function(event) { 
//     console.log("плеер играет")};

// player.on('play', logPlayerPlay);






