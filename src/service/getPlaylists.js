export async function getPlaylists(){
    try{
    let playlists = (await fetch("http://localhost:3001/playlists")).json()
    return playlists;
    }catch(error){
        console.log(error);
        return [];
    }
}