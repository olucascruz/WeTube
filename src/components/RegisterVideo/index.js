import {StyledRegisterVideo} from "./styles"
import React from "react"

export default function RegisterVideo(){
    const [formVisible, setFormVisible] = React.useState(false)


    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={()=>setFormVisible(true)}>
                +
            </button>
            {formVisible && (<form>
                <div>            
                    <button className="close-modal" onClick={()=>setFormVisible(false)}>
                        X
                    </button>
                    <input placeholder="Título do vídeo" />
                    <input placeholder="URL" />
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>)}

        </StyledRegisterVideo>

    )
}