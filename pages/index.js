import config from "../config.json"
import styled from "styled-components"
import {CSSReset} from "../src/components/CSSReset"
import {StyledTimeline} from "../src/components/Timeline"


function HomePage(){
    return(
    <div>
        <CSSReset/>
        <Header/>
        <Menu/>
        <TimeLine playlists = {config.playlists}/>
    </div>       
    ) 
}


export default HomePage;

const Menu = () =>{
    return(
        <div>
        Menu    
        </div>
    )
}

const StyledHeader = styled.div`
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }

`;
const Header = () => {
    return (
        <StyledHeader>
            <div className="user-info">
            <img src={`https://github.com/${config.github}.png`}></img>
            <div>
            <h2>{config.name}</h2>
            <br></br>
            <p>{config.job}</p>
            </div>
            </div>
        </StyledHeader>
    )
}


const TimeLine = (props) => {
    const playlistsNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistName)=>{
                const videos = props.playlists[playlistName];
                return videos.map((video) =>{
                    return (
                        <a href={video.url}>
                            <img src={video.thumb}></img>
                            <span>{video.title}</span>
                        </a>
                    )
                })
            })}
        </StyledTimeline>
    )
}