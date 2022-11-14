import {StyledRegisterVideo} from "./styles"
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
        initialValues:{titulo:"black panter", url:"www.google.com"}
    })

    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={()=>setFormVisible(true)}>
                +
            </button>
            {formVisible && (
            <form onSubmit={(event)=>{
                event.preventDefault();
                setFormVisible(false);
                formCadastro.clearForm();

            }}>
                <div>            
                    <button type="button" className="close-modal" onClick={()=>setFormVisible(false)}>
                        X
                    </button>
                    <input 
                    name="titulo" 
                    value={formCadastro.values.titulo} 
                    placeholder="Título do vídeo" 
                    onChange={formCadastro.handleChange} />
                    <input name="url"
                    value={formCadastro.values.url} 
                    placeholder="URL" 
                    onChange={formCadastro.handleChange}/>
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>)}

        </StyledRegisterVideo>

    )
}