import {StyledRegisterVideo} from "./styles"
import { getPlaylists } from "../../service/getPlaylists";
import { registerVideo } from "../../service/registerVideo";
import { registerPlaylist } from "../../service/registerPlaylist";
import React from "react"

function useForm(props){
    const [values, setValues] = React.useState([]);
    const [validForm, setValidForm] = React.useState(false);
    const [error, setError] = React.useState("");
    const [playlists, setPlaylists] = React.useState();

    function validationForm(typeForm){
    
        console.log(values)
        if(typeForm === "playlistForm"){
            let _playlists = []
            playlists.map((playlist)=>{
                _playlists.push(playlist.name.toLowerCase())
            })
            if(!values.name){
                return setError("Campo não preenchido");
            }
            if(_playlists.includes(values.name.toLowerCase())){
                return setError("Playlist já existe!")
            }
            return setValidForm(true);
            
        }

        if(typeForm === "videoForm"){
            if(!values.title || !values.url || !values.playlist){
               return setError("Campos não preenchidos");
            }

            if(!values.url.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)){
                return setError("url inválida")
            }

            return setValidForm(true);
        
        }
    }


    return{
        values,
        validForm,
        error,
        setPlaylists,
        validationForm,
        handleChange:(event)=>{
            const value = event.target.value;
            const name = event.target.name;
            setValues({
                ...values,
                [name]:value,
            })






        },
        clearForm:()=>{setValues({}); setError("");}
    };
}





export default function RegisterVideo(){
    const [formVisible, setFormVisible] = React.useState(false)
    const formCadastroVideo = useForm({})
    const formCadastroPlaylist = useForm({})
    const [formPlaylist, setFormPlaylist] = React.useState(false)
    const [options, setOptions] = React.useState(undefined);
    
    React.useEffect(()=>{
        async function setPlaylists(){
            try{
                const playlists = await getPlaylists();
                let listPlaylists = []
                playlists.map((el)=>{
                    listPlaylists.push(el)
                });
                    setOptions(listPlaylists);
                    formCadastroPlaylist.setPlaylists(listPlaylists);

            }catch(error){
                console.log(error)
            }
        }
        setPlaylists();

    },[])

    const hasOptions = options != undefined;

    




    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={()=>{
                setFormVisible(true)
            }}
                >
               <strong>+</strong> 
            </button>

            {/* ----------- Forms -------------*/}

            {formVisible && (formPlaylist ?

            /* ----------- Forms: cadastrar playlist -------------*/ 
            <form onSubmit={(event)=>{
                event.preventDefault();
                formCadastroPlaylist.validationForm("playlistForm");
                if(formCadastroPlaylist.validForm){
                    registerPlaylist(formCadastroPlaylist)
                    setFormPlaylist(false);
                    setFormVisible(false);
                    formCadastroPlaylist.clearForm();
                }
            }}>
                <div>            
                    <button type="button" className="close-modal" onClick={()=>{
                        formCadastroPlaylist.clearForm();
                        setFormVisible(false);
                        setFormPlaylist(false);
                    }}>
                        X
                    </button>
                    <input 
                    name="name"  
                    placeholder="Nome da playlist" 
                    onChange={formCadastroPlaylist.handleChange}
                    />
                     <span className="warning">
                        {formCadastroPlaylist.error}
                     </span>
                    <button type="submit">
                        Cadastrar
                    </button>  
                </div>
                  
            </form>
            :
            /* ----------- Forms: cadastrar video -------------*/
            <form onSubmit={(event)=>{
                event.preventDefault();
                formCadastroVideo.validationForm("videoForm");
                if(formCadastroVideo.validForm){
                    registerVideo(formCadastroVideo);
                    setFormPlaylist(false);
                    setFormVisible(false);
                    formCadastroVideo.clearForm();
                }

            }}>
                <div>            
                    <button type="button" className="close-modal"
                    onClick={()=>{
                    setFormVisible(false); 
                    formCadastroVideo.clearForm();
                    }}>
                        X
                    </button>
                    <input 
                    name="title"
                    maxLength={100} 
                    placeholder="Título do vídeo" 
                    onChange={formCadastroVideo.handleChange} />
                    
                    <input name="url"
                    placeholder="URL"
                    maxLength={150} 
                    onChange={formCadastroVideo.handleChange}/>
                    
                    <select name="playlist" onChange={formCadastroVideo.handleChange}>
                        <option value={''}>Selecione a playlist</option>
                        {hasOptions && options.map((opts)=>{
                            
                        return(
                            <option value={opts._id} key={opts._id}>
                                {opts.name}
                            </option>
                            )
                        })
                        };
                    </select>

                    <span className="warning">
                        {formCadastroVideo.error}
                     </span>

                    <button className="add-playlist" type="button" onClick={()=>{
                        formCadastroVideo.clearForm();
                        setFormPlaylist(true);
                        }}>
                        Adiconar playlist
                    </button>
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>)}

        </StyledRegisterVideo>

    )
}