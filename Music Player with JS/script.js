let musicPlayer = document.getElementById('player');
let songImg = document.getElementById('song-img');
let title = document.querySelector('.title');
let singer = document.querySelector('.singer');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const startTime = document.getElementById('start');
const endTime = document.getElementById('end');

let prevBtn = document.getElementById('prev-song');
let playBtn = document.getElementById('play-song');
let pauseBtn = document.getElementById('pause-song');
let nextBtn = document.getElementById('next-song');

let audio = document.getElementById('audio');

const songs = [
    'Pop Smoke - Hello',
    'OTP - London View',
    'SCALE$ - STAND UP GUY',
    'Snoop Dogg - Back In The Game',
    'The Notorious B.I.G. ft. 2Pac - Runnin'
]

let songIndex = songs.length - 1;

loadSong(songs[songIndex]);

function loadSong(song) {
    title.textContent = song.split('-')[1];
    audio.src = `music/${song}.mp3`;
    singer.textContent = song.split('-')[0];
    songImg.src = `img/${song.split('- ')[1]}.jpeg`;
}

function playSong() {
    musicPlayer.classList.add('play-song');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';

    audio.play();
}

function pauseSong() {
    musicPlayer.classList.remove('play-song');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';

    audio.pause();
}

function prevSong() {
    songIndex--;
    if(songIndex <= 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if(songIndex >= songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
 
    let currentSecond = Math.floor(currentTime % 60);
    let currentMinutes = Math.floor(currentTime / 60);

    startTime.textContent = `${('0' + currentMinutes).slice(-2)}:${('0' + currentSecond).slice(-2)}`

    const minutes = Math.floor(duration / 60);
    const remainingSeconds = duration % 60;
    endTime.textContent = `${minutes}:${('0' + remainingSeconds).slice(-2)}`;
  }


  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }

  function convertTime(currentTime) {
    let minutes = 0;
    let seconds = 00;

    let result = `${minutes}:${seconds}`
    seconds = currentTime
    if(seconds % 60 == 0) {
        minutes++;
        seconds = 00
        result = `0${minutes}:${seconds}`
        if(minutes >= 10) {
            result = `${minutes}:${seconds}`
        }
    }
    return result;
  }

//Event Listeners
playBtn.addEventListener('click', () => {

    const isPlaying = musicPlayer.classList.contains('play-song');

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

pauseBtn.addEventListener('click', () => {
    const isPlaying = musicPlayer.classList.contains('play-song');

    if(!isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
// audio.addEventListener('timeupdate', durTime);