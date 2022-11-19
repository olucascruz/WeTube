export async function registerPlaylist(formCadastroPlaylist){
    try{

    const form = formCadastroPlaylist
    const name = form.values.name;
    

    console.log(form.values);

    const response = await fetch("http://localhost:3001/playlists", {
        method: "POST",
        body: JSON.stringify({"name":name}),
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