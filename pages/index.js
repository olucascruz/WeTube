import React from "react"
import config from "../config.json"
import styled from "styled-components"
import {CSSReset} from "../src/components/CSSReset"
import {StyledTimeline} from "../src/components/Timeline"
import Menu from "../src/components/Menu/Menu"


function HomePage(){
    const [filterValue, setFilterValue] = React.useState("");
    return(
        <>
        <CSSReset/>
        <div>
            <Menu searchValue={filterValue} setFilterValue={setFilterValue}/>
            <Header/>
            <TimeLine filterValue={filterValue} playlists = {config.playlists}/>
        </div>
        </>       
    ) 
}


export default HomePage;

const StyledHeader = styled.div`
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }

`;

const StyledBanner = styled.div`
    background-image: url(${config.bg});
    height:230px; 

`;

const Header = () => {
    return (
        <StyledHeader>
            <StyledBanner/>
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
            {playlistsNames.map((playlistsName)=>{
                const videos = props.playlists[playlistsName];
                return(
                    <section key={playlistsName}>
                        <h2>{playlistsName}</h2>
                        <div>
                            {videos
                                .filter((video)=>{
                                    const titleNormalize = video.title.toLowerCase();
                                    const searchNormalize = props.filterValue.toLowerCase();

                                    return titleNormalize.includes(searchNormalize);
                                })
                                .map((video)=>{
                                    return(
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb}></img>
                                            <span>{video.title}</span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                    ) 
            })}
        </StyledTimeline>
    )
}