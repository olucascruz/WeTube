import React from 'react'

export const ColorModeContext = React.createContext({
    mode:"",
    toggleMode: () =>{alert("Precisa ser configurado")},
});

export default function ColorModeProvider(props){
    const [mode, setMode] = React.useState(props.initialMode)
    
    function toggleMode(){
        if(mode === "dark")  setMode("light");
        if(mode === "light")  setMode("dark");
    }
    
    return(
        <ColorModeContext.Provider value={{
            mode:mode,
            toggleMode:toggleMode
            }}>
            {props.children}
        </ColorModeContext.Provider>
    );
}