import React, {createContext, ReactNode, useEffect, useMemo, useState,  useReducer} from "react";
import {nanoid, makeGridMap, makeGridInfo, rearrangeGrid} from '../utils'
import {gridMap as defaultGridMap,includeData as defaultIncludeData } from "../settings/default";
import lodash from "lodash";



export const ResponsiveContext = createContext<{
    state: {
        gridSizeMap: {
            x: any[],
            y: any[]
        },
        select: null | string,
        comps: string[],
        database: Record<string,{
            com_id: string,
            grid: string
        }>
    },
    onSelect:any,
    pageData: any[],
    onHandleTrigger: (name,com) => void,
}>({
    state: null,
    onSelect: null,
    pageData: [],
    onHandleTrigger: null,
})
const splitGridHorizontal = (state,com_id) => {
    const seletid = com_id;
    const dataBase = state.dataBase;
    const selectcom = dataBase[seletid];
    const arr = state.comps.map((i) => {
        return state.dataBase[i];
    });
    const girdMap = makeGridMap(arr);
    const targetGrid = selectcom.grid.split('/').map(Number);
    const gridSizeMap = state.gridSizeMap;
    // 所占单元格数为奇数，先把所在格中间行扩充一列
    const midNum =
        Math.ceil((targetGrid[3] - targetGrid[1]) / 2) +
        targetGrid[1] -
        1;
    if ((targetGrid[3] - targetGrid[1]) % 2 == 1) {
        for (const i of girdMap) {
            i.splice(midNum, 0, i[midNum - 1]);
        }
        const mapx = gridSizeMap.x;
        mapx.splice(
            midNum - 1,
            1,
            Math.round(mapx[midNum - 1] / 2),
            Math.round(mapx[midNum - 1] / 2)
        );
    }
    const newId = nanoid();
    const width = girdMap[0].length;
    const height = girdMap.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (girdMap[y][x] == seletid && x >= midNum) {
                girdMap[y][x] = newId;
            }
        }
    }
    const gridInfo = makeGridInfo(girdMap, gridSizeMap);
    state.dataBase[newId] = {
        com_id: newId,
        grid: ''
    };
    state.comps.push(newId);
    for (const i in gridInfo) {
        state.dataBase[i].grid = gridInfo[i].join('/');
    }
    return {...state};
}

const splitGridVertical = (state,com_id) => {
    const seletid = com_id;
    const dataBase = state.dataBase;
    const selectcom = dataBase[seletid];
    const arr = state.comps.map((i) => {
        return state.dataBase[i];
    });
    const girdMap = makeGridMap(arr);
    const targetGrid = selectcom.grid.split('/').map(Number);
    const gridSizeMap = state.gridSizeMap;
    // 所占单元格数为奇数，先把所在格中间行扩充一行
    const midNum =
        Math.ceil((targetGrid[2] - targetGrid[0]) / 2) +
        targetGrid[0] -
        1;
    if ((targetGrid[2] - targetGrid[0]) % 2 == 1) {
        girdMap.splice(midNum, 0, [...girdMap[midNum - 1]]);
        const mapy = gridSizeMap.y;
        mapy.splice(
            midNum - 1,
            1,
            Math.round(mapy[midNum - 1] / 2),
            Math.round(mapy[midNum - 1] / 2)
        );
    }
    const newId = nanoid();
    const width = girdMap[0].length;
    const height = girdMap.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (girdMap[y][x] == seletid && y >= midNum) {
                girdMap[y][x] = newId;
            }
        }
    }
    const gridInfo = makeGridInfo(girdMap, gridSizeMap);
    state.dataBase[newId] = {
        com_id: newId,
        grid: ''
    };
    state.comps.push(newId);
    for (const i in gridInfo) {
        state.dataBase[i].grid = gridInfo[i].join('/');
    }
    return {...state};
}

const ResponsiveContextProvider = (props:{
    children: ReactNode;
}) => {
    const reducer = (state,action) => {
        switch (action.type) {
            case 'onSelect':
                state.select = action.select;
                return {...state};
            case 'horizontal':
                return splitGridHorizontal(lodash.cloneDeep(state),action.select);
            case 'vertical':
                return splitGridVertical(lodash.cloneDeep(state),action.select);
            case 'onDelete':
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
    const onHandleTrigger = (name,com) => {
        dispatch({
            type: name,
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
            pageData,
            onHandleTrigger
        }}> 
            {props.children}
        </ResponsiveContext.Provider>
    )
}
export default ResponsiveContextProvider