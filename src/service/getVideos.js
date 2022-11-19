export async function getVideos(){
    try{
    let videos = (await fetch("http://localhost:3001/videos")).json()
    return videos;
    }catch(error){
        console.log(error);
        return [];
    }
}