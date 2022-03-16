const setActivePlaylist =(id, func) =>{
    let active_playlist = func;
    let access_token = localStorage.getItem('access_token');
    console.log(id)
    let header = { 
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${access_token}`};
    
    fetch(`https://api.spotify.com/v1/playlists/${id}`,
        {method:'GET',
        headers:header})
        .then( res => {
            if(res.status == 200){
                return res.text()
            }
        })
        .then(data => {
            let info  = JSON.parse(data)

            active_playlist(info)
        })

    
}

function songMstoSeconds(song){
    let ms = song;
    let seconds = (ms / 1000 );
    let min = seconds / 60;
    let r = min % 1;
    let sec = (r * 60);

    min = Math.floor(min);
    sec = Math.floor(sec);

    if (sec < 10) {
        sec = '0'+sec;
    }
    if (min < 10) {
        min = min;
    }


    return {
      min:min,
      sec:sec
    }
}

function truncateText( text, length) {
    console.log(text.length)
    if(text.length >= length ){
        text = text.slice(0,length - 1);
        return text + "...";
    }

    return text;
}

export {
    songMstoSeconds,
    truncateText,
    setActivePlaylist};