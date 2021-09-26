///////////////
//   AUDIO   //
///////////////

//Audio sources for playing music and sounds
var soundEffectSrc;
var bgMusicSrc;

function setupAudioSources() {
    //Create audio elements that will be used to play music and sounds
    soundEffectSrc = document.createElement("audio");
    bgMusicSrc = document.createElement("audio");
}

function playBackgroundMusic() {
    //Set the bg music source so the correct music plays
    bgMusicSrc.src = "audio/backgroundMusic.mp3";
    //Reduce the volume so the music isn't overpowering
    bgMusicSrc.volume = 0.8;
    //Enable looping so the music plays for the duration of the game
    bgMusicSrc.loop = true;
    //Start playing the music
    bgMusicSrc.play();
}

function playSoundEffect(source) {
    //Set the sound effect source to the passed variable
    soundEffectSrc.src = source;
    //Start playing the sound
    soundEffectSrc.play();
}

function audioButtonClick() {
    //If sound is muted, soundOn is set to true and vice-versa so the button acts as a toggle
    var soundOn = !bgMusicSrc.muted;
    //If the audio elements exist, set their muted values to soundOn to enabled/disable all sound
    if (bgMusicSrc != null) {
        bgMusicSrc.muted = soundOn;
    }
    if (soundEffectSrc != null) {
        soundEffectSrc.muted = soundOn;
    }
}