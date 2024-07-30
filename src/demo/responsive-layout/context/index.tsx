import React, {createContext, ReactNode, useEffect, useMemo, useState} from "react";
import {nanoid} from '../utils'
import {gridMap as defaultGridMap,includeData as defaultIncludeData } from "../settings/default";

export const ResponsiveContext = createContext({
    select: ''
})

const ResponsiveContextProvider = (props:{
    children: ReactNode;
}) => {
    const [select,setSelect] = useState('111');
    const [dataBase,setDataBase] = useState(()=> {
        const com_id = nanoid();
        const json = {
            parent: '',
            type: '',
            com_id: com_id
        };
        json.parent = 'page';
        json.type = 'container';
        return {
            [com_id]: json
        }
    });
    const pageData = useMemo(() => {
        return [];
    },[dataBase]);
    const [gridMap,setGridMap] = useState({
        x: [],
        y: []
    });
    const addItem = () => {}
    const makeDataBase = (gridMap,includeData) => {
        setGridMap(defaultGridMap);
    }
    useEffect(() => {
        makeDataBase(defaultGridMap,defaultGridMap);
        console.log(dataBase)
    }, []);
    return (
        <ResponsiveContext.Provider value={{
            select
        }}> 
            {props.children}
        </ResponsiveContext.Provider>
    )
}
export default ResponsiveContextProvider