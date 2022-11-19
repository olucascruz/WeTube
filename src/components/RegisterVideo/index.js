import {StyledRegisterVideo} from "./styles"
import { getPlaylists } from "../../service/getPlaylists";
import { registerVideo } from "../../service/registerVideo";
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
    const formCadastro = useForm({
        initialValues:{title:"black panter", url:"www.google.com"}
    })
    const [formPlaylist, setFormPlaylist] = React.useState(false)

    const [options, setOptions] = React.useState(undefined);

    React.useEffect(()=>{
        async function setPlaylists(){
            try{
            const playlists = await getPlaylists()
            setOptions(playlists.name)
            playlists.map((el)=>{
                setOptions([el]);
            });

            console.log(playlists);
            }catch(error){
                console.log(error)
            }
        }
        setPlaylists();
    },[])

    const notOptions = options === undefined;
        
    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={()=>setFormVisible(true)}>
                +
            </button>

            {/* ----------- Forms -------------*/}

            {formVisible && (formPlaylist ?

            /* ----------- Forms: cadastrar playlisy -------------*/ 
            <form onSubmit={(event)=>{
                event.preventDefault();
                setFormPlaylist(false);
                // setFormVisible(false);
                // formCadastro.clearForm();

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
                    onChange={console.log("a")} />
                    <button type="submit">
                        Cadastrar
                    </button>  
                </div>
                  
            </form>
            :
            /* ----------- Forms: cadastrar video -------------*/
            <form onSubmit={(event)=>{
                event.preventDefault();
                registerVideo(formCadastro);
                setFormVisible(false);
                formCadastro.clearForm();

            }}>
                <div>            
                    <button type="button" className="close-modal" onClick={()=>setFormVisible(false)}>
                        X
                    </button>
                    <input 
                    name="title" 
                    value={formCadastro.values.title} 
                    placeholder="Título do vídeo" 
                    onChange={formCadastro.handleChange} />
                    
                    <input name="url"
                    value={formCadastro.values.url} 
                    placeholder="URL" 
                    onChange={formCadastro.handleChange}/>
                    
                    <select name="playlist" onChange={formCadastro.handleChange}>
                        {<option>{notOptions && "Sem opções"}</option>}
                        {!notOptions && options.map((opts)=>
                        <option value={opts._id} key={opts._id}>
                            {opts.name}
                        </option>)
                        };
                    </select>

                    <button type="button" onClick={()=>{
                        formCadastro.clearForm();
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