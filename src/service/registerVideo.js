function getThumbByUrl(url){

    const idVideo = url.substring(
        url.indexOf("=") + 1, 
        url.indexOf("&")
    );

    const thumb =`https://img.youtube.com/vi/${idVideo}/hqdefault.jpg`;


    return thumb;
}



export async function registerVideo(formCadastro){
    try{

    const form = formCadastro
    const title = form.values.title;
    const url = form.values.url;
    const thumb = getThumbByUrl(url);
    const playlist = form.values.playlist;

    console.log(form.values);

    const response = await fetch("http://localhost:3001/videos", {
        method: "POST",
        body: JSON.stringify({"title": title, "url":url, "thumb":thumb, "playlist":playlist}),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
     });

    const body = await response.json();

    console.log(body)
    document.location.reload(true);
    }catch(error){
        console.log(error)
        
    }
}