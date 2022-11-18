function getThumbByUrl(url){

    const idVideo = url.substring(
        url.indexOf("=") + 1, 
        url.indexOf("&")
    );

    const thumb =`https://img.youtube.com/vi/${idVideo}/hqdefault.jpg`;


    return thumb;
}



export async function registerVideo(event){


    const form = event.target;
    const title = form.tile.value;
    const url = form.url.value;
    const thumb = getThumbByUrl(url);
    const playlist = form.playlist.value;



    const response = await fetch("http://localhost:3001/videos", {
        method: "POST",
        body: JSON.stringify({"title": title, "url":url, "thumb":thumb, "playlist":playlist}),
        headers:{
            "Content-type": "application/json",
        }, 
     });

    const body = await response.json();

    console.log(body)
    document.location.reload(true);
}