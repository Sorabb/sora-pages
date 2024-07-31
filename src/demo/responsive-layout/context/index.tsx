import React, {createContext, ReactNode, useEffect, useMemo, useState,  useReducer} from "react";
import {nanoid} from '../utils'
import {gridMap as defaultGridMap,includeData as defaultIncludeData } from "../settings/default";


export const ResponsiveContext = createContext<{
    select: string,
    state:Record<string,any>,
    dispatch:any,
    pageData: any[],
}>({
    select: '',
    state: {},
    dispatch: null,
    pageData: [],
})

const ResponsiveContextProvider = (props:{
    children: ReactNode;
}) => {
    const [select,setSelect] = useState('111');
    const reducer = (state,action) => {
        switch (action.type) {
            case 'a':
                return state;
            default:
                return state;
        }
    };
    const reducerInit = (state) => {
        for (const i of defaultIncludeData) {
            const newId = nanoid();
            state.comps.push(newId);
            state.dataBase[newId] = {
                com_id: newId,
                grid: i.grid
            }
        }
        state.gridSizeMap = defaultGridMap;
        return state;
    }
    const [state, dispatch] = useReducer(reducer, {
        gridSizeMap: {
            x: [],
            y: []
        },
        select: null,
        comps: [],
        dataBase: {},
    },reducerInit);
    const pageData = useMemo(() => {
        return state.comps.map((i) => {
            return state.dataBase[i];
        });
    },[state.dataBase,state.comps]);
    return (
        <ResponsiveContext.Provider value={{
            select,
            state,
            dispatch,
            pageData
        }}> 
            {props.children}
        </ResponsiveContext.Provider>
    )
}
export default ResponsiveContextProvider