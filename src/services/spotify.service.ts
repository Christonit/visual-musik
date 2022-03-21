class Spotify{
    getNewAccessToken(refresh_token : String, handleSuccess : Function, handleFailure: Function){
        fetch("http://localhost:8888/refresh_token?refresh_token=" + refresh_token)
                            .then(res => {
                                return res.text();
                            })
                            .then(data => handleSuccess(data))
                            .catch(e => handleFailure(e))
    }

}

export const SpotifyService = new Spotify();