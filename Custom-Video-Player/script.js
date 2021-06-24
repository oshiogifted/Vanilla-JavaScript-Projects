const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play & pause video 
const toggleVideoStatus = () => {
  video.paused ? video.play() : video.pause();
}

// Update play/pause icon
const updatePlayIcon = () => {
  video.paused ? playBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>' : playBtn.innerHTML = '<i class="fa fa-pause fa-2x"></i>';  
}

// Update progress & timestamp
const updateProgress = () => {
  //console.log(video.currentTime);
  //console.log(video.duration)
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs =  '0' + String(secs);
    console.log(secs)
  }

  timestamp.innerText = `${mins}:${secs}`;
}

// Stop the video
const stopVideo = () => {
  video.currentTime = 0;
  video.pause();
}

// Set video time to scrub progress on range input
const setVideoProgress = () => {
  video.currentTime = (+progress.value * video.duration) / 100;
}




// Event listeners -------------
// Play video if paused, pause video if playing (for when we click on the video screen)
video.addEventListener('click', toggleVideoStatus);

// When you click play button, it changes to pause icon and vice versa
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);

// As the video plays, its going to continuously call timeupdate
video.addEventListener('timeupdate', updateProgress);

// Play video if paused, pause video if playing (for when we click on the play button)
playBtn.addEventListener('click', toggleVideoStatus);

// Stop video 
stopBtn.addEventListener('click', stopVideo);

// It's a range input so it has a 'change' event - when we scrub the video
progress.addEventListener('change', setVideoProgress);
