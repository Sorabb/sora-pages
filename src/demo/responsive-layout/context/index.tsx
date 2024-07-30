import React, {createContext,ReactNode, useState} from "react";

export const ResponsiveContext = createContext({
    select: ''
})

const ResponsiveContextProvider = (props:{
    children: ReactNode;
}) => {
    const [select,setSelect] = useState('111');
    return (
        <ResponsiveContext.Provider value={{
            select
        }}> 
            {props.children}
        </ResponsiveContext.Provider>
    )
}
export default ResponsiveContextProvider