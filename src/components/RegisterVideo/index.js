import {StyledRegisterVideo} from "./styles"
import { getPlaylists } from "../../service/getPlaylists";
import { registerVideo } from "../../service/registerVideo";
import { registerPlaylist } from "../../service/registerPlaylist";
import React from "react"

function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return{
        values,
        handleChange:(event)=>{
            const value = event.target.value;
            const name = event.target.name;
            setValues({
                ...values,
                [name]:value,
            })
        },
        clearForm:()=>{setValues({})}
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
                console.log(playlists);
                let listPlaylists = []
                playlists.map((el)=>{
                    listPlaylists.push(el)
                });
                    setOptions(listPlaylists);

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
                +
            </button>

            {/* ----------- Forms -------------*/}

            {formVisible && (formPlaylist ?

            /* ----------- Forms: cadastrar playlist -------------*/ 
            <form onSubmit={(event)=>{
                event.preventDefault();
                setFormPlaylist(false);
                registerPlaylist(formCadastroPlaylist)
                setFormVisible(false);
                formCadastroPlaylist.clearForm();
                


            }}>
                <div>            
                    <button type="button" className="close-modal" onClick={()=>{
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
                    <button type="submit">
                        Cadastrar
                    </button>  
                </div>
                  
            </form>
            :
            /* ----------- Forms: cadastrar video -------------*/
            <form onSubmit={(event)=>{
                event.preventDefault();
                registerVideo(formCadastroVideo);
                setFormVisible(false);
                formCadastroVideo.clearForm();

            }}>
                <div>            
                    <button type="button" className="close-modal" onClick={()=>setFormVisible(false)}>
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
                        <option>Selecione a playlist</option>
                        {hasOptions && options.map((opts)=>{
                            
                        return(
                            <option value={opts._id} key={opts._id}>
                                {opts.name}
                            </option>
                            )
                        })
                        };
                    </select>

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