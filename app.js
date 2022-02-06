const app = () =>{
    // Time selects
    const timeSelect = document.querySelectorAll('.time-select button');
    // Audio
    const song = document.querySelector('.song');    
    // Play btn
    const play = document.querySelector('.play');
    //  Outline of the play btn - will decrease parallel with the song
    const outline = document.querySelector('.moving-outline circle');
    // Video (will be our background)
    const video = document.querySelector('.vid-container .video');    
    // Time display
    const timeDisplay = document.querySelector('.time-display');
    // getDuration - how long the song should last
    let duration = 600;

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    // get the length of the outline
    const outlineLenght = outline.getTotalLength();
    console.log(outlineLenght);    


    outline.style.strokeDasharray = outlineLenght ;
    // outline.style.strokeDashoffset = 200; 

    
    // change the song and backgforund based on the dataset of the buttons
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            var music = sound.dataset.sound;
            var vid = sound.dataset.video;
            console.log(music,vid);

            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
      
            // song.load(); //call this to just preload the audio without playing
            // video.load(); //call this to just preload the video without playing            

        });       

    });



    // Play sound
    play.addEventListener('click', ()=>{
        checkPlaying(song);
    });

    // Select the duration of the sound
    timeSelect.forEach(option =>{
        
        option.addEventListener('click',function(e){
            duration =  this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duration / 60)}:${duration % 60}`;
        });
                
         
    }); 

    
    // function to check the status of the song
    const checkPlaying = song =>{
        if(song.paused){            
            // play video background
            video.play();
            // play the song
            song.play();
            // change the icon to a pause btn
            play.src = './svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = './svg/play.svg';           
            
        }
    };  


       // We can animate the circle
    // this function going to execute every time we play the song and if the song keeps going on it will keep updateing
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsedTime = duration - currentTime;
        let seconds = Math.floor(elapsedTime % 60) ;
        let minutes = Math.floor(elapsedTime / 60) ;

        // Lets get the progress bar going : Animate the circle
        let progress = outlineLenght - (currentTime / duration) * outlineLenght;
        // outline.style.strokeDashoffset = progress;
        outline.style.strokeDashoffset = progress;

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        // Preventing the count down from being negative
        if(currentTime >= duration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'; 
            video.pause();            

        }     

    };    

};

app();