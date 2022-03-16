import React,{Component} from 'react';
import {connect} from 'react-redux';
import {YoutubeSearchVideo} from '../utils/youtube';
import {truncateText} from '../utils/lib';
import VideoPreview from './video-preview.jsx';
import {open_video_priv} from '../actions';
import { CSSTransition } from 'react-transition-group';


class YoutubeComponent extends Component {
    constructor(props){
        super(props)
        this.getYoutubeVideo = this.getYoutubeVideo.bind(this);
        this.date_formatter = this.date_formatter.bind(this);

        this.state = {
            is_checking_video : false,
            video_info: null
        }

    }

    getYoutubeVideo(youtube_id, redux_video_index){
        YoutubeSearchVideo(youtube_id)
        .then( data => {
            let result = JSON.parse(data);

            this.setState({
                video_info: result.items[0],
                // is_checking_video: true
            })

            this.props.open_video_priv()


        })



    }
    date_formatter(publish_time){

        let time = publish_time.split('T')
        
        let length = time[1].split(':')

        return` ${time[0]} ● ${length[0]} min ${length[1]} sec`;
    }
    
    render(){
        const {youtube_list,is_checking_video} = this.props;
        const {video_info} = this.state;

        return (
            <aside className="youtube-container">

                <CSSTransition
                        in={is_checking_video}
                        timeout={600}
                        classNames="sidebar-right"
                        unmountOnExit>
                            <VideoPreview {...video_info}/>
                </CSSTransition>

                {/* {is_checking_video && <VideoPreview {...video_info}/>} */}

                {youtube_list.length > 0 && (
                <>
                    <div className="youtube-container-header">
                        <h3 className="subtitle">Search Results</h3>
                    </div>
                   { youtube_list.map((result,key) => {
                       const data = result.snippet;
                       const youtube_video_id = result.id.videoId;
                       const {thumbnails, publishTime, channelTitle, title} = data;

                       return <a href="#" 
                            onClick={(e)=>{
                                this.getYoutubeVideo(youtube_video_id, key);
                                e.preventDefault()
                            }}
                            className="youtube-result-item" key={key}>
                           <img className="music-image-small" 
                            src={thumbnails.high.url} alt="" />
                           <div className="ml--16">
                               <h4 className="result-title mb--12" dangerouslySetInnerHTML={{__html: truncateText(title,46)}}></h4>
                               <p className="label small mb--12">
                                 Channel: <b dangerouslySetInnerHTML={{__html: channelTitle }} ></b>
                                </p>
                               <p className="label small">
                                   {this.date_formatter(publishTime)} 
                                </p>
                           </div>
                       </a>
                   })}
                    
                </>
                )
            }
            </aside>
        );
    }
}
const mapStateToProps = state =>({
    youtube_list: state.youtube_list,
    is_checking_video:state.is_checking_video

})

const mapDispatchToProps = {
    open_video_priv
}
export default connect(mapStateToProps,mapDispatchToProps) (YoutubeComponent);