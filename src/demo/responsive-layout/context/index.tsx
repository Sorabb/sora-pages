import React, {createContext, ReactNode, useEffect, useMemo, useState,  useReducer} from "react";
import {nanoid, makeGridMap, makeGridInfo, rearrangeGrid} from '../utils'
import {gridMap, gridMap as defaultGridMap, includeData as defaultIncludeData} from "../settings/default";
import lodash from "lodash";



export const ResponsiveContext = createContext<{
    state: {
        gridSizeMap: {
            x: any[],
            y: any[]
        },
        select: null | string,
        comps: string[],
        dataBase: Record<string,{
            com_id: string,
            grid: string
        }>
    },
    onSelect:any,
    pageData: any[],
    selectComSize: [number,number],
    setSelectComSize: (array: [number,number]) => void,
    onHandleTrigger: (name,com) => void,
}>({
    state: null,
    onSelect: null,
    pageData: [],
    selectComSize: [0,0],
    setSelectComSize: null,
    onHandleTrigger: null,
})
const splitGridHorizontal = (state,com_id) => {
    const seletid = com_id;
    const dataBase = state.dataBase;
    const selectcom = dataBase[seletid];
    const arr = state.comps.map((i) => {
        return state.dataBase[i];
    });
    const ogridMap = makeGridMap(arr);
    const targetGrid = selectcom.grid.split('/').map(Number);
    const gridSizeMap = state.gridSizeMap;
    // 所占单元格数为奇数，先把所在格中间行扩充一列
    const midNum =
        Math.ceil((targetGrid[3] - targetGrid[1]) / 2) +
        targetGrid[1] -
        1;
    if ((targetGrid[3] - targetGrid[1]) % 2 == 1) {
        for (const i of ogridMap) {
            i.splice(midNum, 0, i[midNum - 1]);
        }
        const mapx = gridSizeMap.x;
        mapx.splice(
            midNum - 1,
            1,
            (mapx[midNum - 1] / 2),
            (mapx[midNum - 1] / 2)
        );
    }
    const newId = nanoid();
    const width = ogridMap[0].length;
    const height = ogridMap.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (ogridMap[y][x] == seletid && x >= midNum) {
                ogridMap[y][x] = newId;
            }
        }
    }
    const gridInfo = makeGridInfo(ogridMap, gridSizeMap);
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
    const ogridMap = makeGridMap(arr);
    const targetGrid = selectcom.grid.split('/').map(Number);
    const gridSizeMap = state.gridSizeMap;
    // 所占单元格数为奇数，先把所在格中间行扩充一行
    const midNum =
        Math.ceil((targetGrid[2] - targetGrid[0]) / 2) +
        targetGrid[0] -
        1;
    if ((targetGrid[2] - targetGrid[0]) % 2 == 1) {
        ogridMap.splice(midNum, 0, [...ogridMap[midNum - 1]]);
        const mapy = gridSizeMap.y;
        mapy.splice(
            midNum - 1,
            1,
            (mapy[midNum - 1] / 2),
            (mapy[midNum - 1] / 2)
        );
    }
    const newId = nanoid();
    const width = ogridMap[0].length;
    const height = ogridMap.length;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (ogridMap[y][x] == seletid && y >= midNum) {
                ogridMap[y][x] = newId;
            }
        }
    }
    const gridInfo = makeGridInfo(ogridMap, gridSizeMap);
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

const deleteItem = (state,com_id) => {
    if (state.comps.length == 1) {
        state.gridSizeMap = {
            x: [],
            y: []
        }
    } else {
        const arr = state.comps.map((i) => {
            return state.dataBase[i];
        });
        const ogridMap = makeGridMap(arr);
        const targetGrid = state.dataBase[com_id].grid
            .split('/')
            .map(Number);
        // 先左后右，再上最后下
        let canDel = false;
        const y = targetGrid[0] - 1;
        const x = targetGrid[1] - 1;
        const ye = targetGrid[2] - 1;
        const xe = targetGrid[3] - 1;
        if (x > 0 && !canDel) {
            // ←
            if (
                ogridMap[y]?.[x - 1] !=
                ogridMap[y - 1]?.[x - 1] &&
                ogridMap[ye - 1]?.[x - 1] != ogridMap[ye]?.[x - 1]
            ) {
                canDel = true;
                for (let xi = x; xi < xe; xi++) {
                    for (let yi = y; yi < ye; yi++) {
                        ogridMap[yi][xi] = ogridMap[yi][x - 1];
                    }
                }
            }
        }
        if (xe < ogridMap[0].length && !canDel) {
            // →
            if (
                ogridMap[y]?.[xe] != ogridMap[y - 1]?.[xe] &&
                ogridMap[ye]?.[xe] != ogridMap[ye - 1]?.[xe]
            ) {
                canDel = true;
                for (let xi = x; xi < xe; xi++) {
                    for (let yi = y; yi < ye; yi++) {
                        ogridMap[yi][xi] = ogridMap[yi][xe];
                    }
                }
            }
        }
        if (y > 0 && !canDel) {
            // ↑
            if (
                ogridMap[y - 1]?.[x] !=
                ogridMap[y - 1]?.[x - 1] &&
                ogridMap[y - 1]?.[xe - 1] != ogridMap[y - 1]?.[xe]
            ) {
                canDel = true;
                for (let xi = x; xi < xe; xi++) {
                    for (let yi = y; yi < ye; yi++) {
                        ogridMap[yi][xi] = ogridMap[y - 1][xi];
                    }
                }
            }
        }
        if (y < ogridMap.length && !canDel) {
            // ↓
            if (
                ogridMap[ye]?.[x - 1] != ogridMap[ye]?.[x] &&
                ogridMap[ye]?.[xe - 1] != ogridMap[ye]?.[xe]
            ) {
                canDel = true;
                for (let xi = x; xi < xe; xi++) {
                    for (let yi = y; yi < ye; yi++) {
                        ogridMap[yi][xi] = ogridMap[ye][xi];
                    }
                }
            }
        }
        const gridInfo = makeGridInfo(
            ogridMap,
            state.gridSizeMap
        );
        for (const i in gridInfo) {
            state.dataBase[i].grid = gridInfo[i].join('/');
        }
    }

    state.comps = state.comps.filter((i) => i!= com_id);
    delete state.dataBase[com_id];
    if (state.select == com_id) {
        state.select = null;
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
                return deleteItem(lodash.cloneDeep(state),action.select);
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

    const [selectComSize,setSelectComSize] = useState<[number,number]>([0,0]);
    useEffect(() => {
        if (state.select && state.select != 'container') {
            const selectdom = document.querySelector(`[data-com_id='${state.select}']`) as HTMLInputElement;
            const rect = selectdom.getBoundingClientRect();
            setSelectComSize([rect.width, rect.height]);
        } else {
            setSelectComSize([0,0]);
        }
    }, [state.select]);

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
            selectComSize,
            setSelectComSize,
            onHandleTrigger
        }}> 
            {props.children}
        </ResponsiveContext.Provider>
    )
}
export default ResponsiveContextProvider