

const KEY = "AIzaSyCVmJo0pll4riv8talotmbc-gI-OFHUvFU";
 function YoutubeSearchForVideos(query = 'dubstep'){
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=${KEY}&part=snippet&q=${query}`)
    .then( res => {
        if(res.status == 200){
            return  res.text();
        }
    })
};
 function YoutubeSearchVideo(id = ''){
    return fetch(`https://www.googleapis.com/youtube/v3/videos?key=${KEY}&part=id,snippet,statistics&id=${id}`)
    .then( res => {
        if(res.status == 200){
            return  res.text();
        }
    })
};


export {
    YoutubeSearchForVideos,
    YoutubeSearchVideo
};