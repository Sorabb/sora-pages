import React, {createContext, ReactNode, useEffect, useMemo, useState,  useReducer} from "react";
import {nanoid} from '../utils'
import {gridMap as defaultGridMap,includeData as defaultIncludeData } from "../settings/default";


export const ResponsiveContext = createContext<{
    state:Record<string,any>,
    onSelect:any,
    pageData: any[],
}>({
    state: {},
    onSelect: null,
    pageData: [],
})

const ResponsiveContextProvider = (props:{
    children: ReactNode;
}) => {
    const reducer = (state,action) => {
        switch (action.type) {
            case 'onSelect':
                state.select = action.select;
                console.log(state)
                return {...state};
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

    const onSelect = (com:string | null) => {
        dispatch({
            type: 'onSelect',
            select: com
        })
    }
    const pageData = useMemo(() => {
        return state.comps.map((i) => {
            return state.dataBase[i];
        });
    },[state.dataBase,state.comps]);
    return (
        <ResponsiveContext.Provider value={{
            state,
            onSelect,
            pageData
        }}> 
            {props.children}
        </ResponsiveContext.Provider>
    )
}
export default ResponsiveContextProvider