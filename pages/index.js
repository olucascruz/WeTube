import React, { useEffect, useState } from "react"
import config from "../config.json"
import styled from "styled-components"

import {StyledTimeline} from "../src/components/Timeline"
import Menu from "../src/components/Menu/Menu"
import {getPlaylists} from "../src/service/getPlaylists"
import {getVideos} from "../src/service/getVideos"


function HomePage(){
    const [filterValue, setFilterValue] = React.useState("");
    return(
        <>
        <div>
            <Menu searchValue={filterValue} setFilterValue={setFilterValue}/>
            <Header/>
            <TimeLine filterValue={filterValue}/>
        </div>
        </>       
    ) 
}


export default HomePage;

const StyledHeader = styled.div`
    background-color: ${({theme})=> theme.backgroundLevel1};
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
    const [playlists, setPlaylists] = useState([]);
    const [videos, setVideos] = useState([]);

    React.useEffect(()=>{
        async function gettingPlaylist(){
            try{
                const _playlists = await getPlaylists();
                _playlists.map((el)=>{
                    setPlaylists([el]);
                });

                console.log(playlistsNames);
            }catch(error){
                console.log(error);
            }
        }
        gettingPlaylist();

        async function gettingVideo(){
            try{
                const _videos = await getVideos();
                _videos.map((el)=>{
                    setVideos([el]);
                });

                console.log(videos);
            }catch(error){
                console.log(error);
            }
        }

        gettingVideo();
    },[])

    return (
        <StyledTimeline>
            {playlists.map(playlist=>{return(
                <section key={playlist._id}>
                    <h2>{playlist.name}</h2>
                    <div>
                        {videos
                            .filter((video)=>{
                                return video.playlist == playlist._id
                            })
                            .map((video)=>{
                                return(
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb}></img>
                                        <span><strong>{video.title}</strong></span>
                                    </a>
                                )
                            })
                        }
                    </div>
                </section>
                )})}
        </StyledTimeline>
    )
}


// {playlistsNames.map((playlistsName)=>{
//     const videos = props.playlists[playlistsName];
//     return(
//         <section key={playlistsName}>
//             <h2>{playlistsName}</h2>
//             <div>
//                 {videos
//                     .filter((video)=>{
//                         const titleNormalize = video.title.toLowerCase();
//                         const searchNormalize = props.filterValue.toLowerCase();

//                         return titleNormalize.includes(searchNormalize);
//                     })
//                     .map((video)=>{
//                         return(
//                             <a key={video.url} href={video.url}>
//                                 <img src={video.thumb}></img>
//                                 <span>{video.title}</span>
//                             </a>
//                         )
//                     })}
//             </div>
//         </section>
//         ) 
// })}