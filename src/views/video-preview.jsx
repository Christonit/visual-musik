import React from "react";
import {useDispatch} from "react-redux";
import {close_video_prev} from "../actions";

const VideoPreview = ({snippet, statistics, id, closePrev}) => {
    const dispatch = useDispatch();

    return (
        <div className="video-preview">
            <div className="youtube-container-header">
                <h3 className="subtitle">Video Preview</h3>

                <button className="material-icons button-glass" onClick={() => dispatch(close_video_prev())}>
                    close
                </button>
            </div>

            <iframe
                width="100%"
                height="280"
                src={`https://www.youtube.com/embed/${id}`}
                allow="accelerometer; autoplay; gyroscope; picture-in-picture"
                title="YouTube video player"
                className="mb--16"
                frameborder="0"></iframe>

            <div className="mb--32">
                <h3 className="subtitle mb--16">{snippet.title}</h3>
                <p className="text label">
                    Channel: <b>{snippet.channelTitle}</b>
                </p>
            </div>

            <div className="stats-container">
                <div className="stats-element">
                    <span className="material-icons mb--4">visibility</span>
                    <span className="text mb--4">Views</span>
                    <b className="size-20 medium text">{statistics.viewCount}</b>
                </div>
                <div className="stats-element">
                    <span className="material-icons mb--4">thumb_up</span>
                    <span className="text mb--4">Likes</span>
                    <b className="size-20 medium text">{statistics.likeCount}</b>
                </div>
                <div className="stats-element">
                    <span className="material-icons mb--4">thumb_down</span>
                    <span className="text mb--4">Dislikes</span>
                    <b className="size-20 medium text">{statistics.dislikeCount}</b>
                </div>
                <div className="stats-element">
                    <span className="material-icons mb--4">comment</span>
                    <span className="text mb--4">Coments</span>
                    <b className="size-20 medium text">{statistics.commentCount}</b>
                </div>
            </div>

            <div style={{textAlign: "center"}}>
                <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" className="youtube-button">
                    VIEW ON YOUTUBE
                </a>
            </div>
        </div>
    );
};

export default VideoPreview;
