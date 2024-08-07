import { customAlphabet } from 'nanoid';
import lodash from 'lodash';
export const nanoid = () => {
    return (
        customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 1)() +
        customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 20)()
    );
};
const mergeLine = (allLine) => {
    for (const i in allLine.x) {
        allLine.x[i].sort((a, b) => {
            return a.start - b.start;
        });
    }
    for (const i in allLine.y) {
        allLine.y[i].sort((a, b) => {
            return a.start - b.start;
        });
    }
    for (const i in allLine.x) {
        const item = allLine.x[i];
        for (let j = 0; j < item.length - 1; ) {
            if (item[j + 1].start == item[j].end) {
                item.splice(j, 2, {
                    start: item[j].start,
                    end: item[j + 1].end,
                });
            } else {
                j++;
            }
        }
    }
    for (const i in allLine.y) {
        const item = allLine.y[i];
        for (let j = 0; j < item.length - 1; ) {
            if (item[j + 1].start == item[j].end) {
                item.splice(j, 2, {
                    start: item[j].start,
                    end: item[j + 1].end,
                });
            } else {
                j++;
            }
        }
    }
};
export const makeLines = (grids) => {
    const allLine = {
        x: {},
        y: {},
    };
    if (grids.length < 2) {
        return null;
    }
    for (let i = 0; i < grids.length - 1; i++) {
        for (let j = i + 1; j < grids.length; j++) {
            // i在j上边
            if (grids[i][2] == grids[j][0] && grids[i][3] > grids[j][1] && grids[j][3] > grids[i][1]) {
                if (allLine.x[grids[i][2]]) {
                    allLine.x[grids[i][2]].push({
                        start: Math.max(grids[i][1], grids[j][1]),
                        end: Math.min(grids[i][3], grids[j][3]),
                    });
                } else {
                    allLine.x[grids[i][2]] = [
                        {
                            start: Math.max(grids[i][1], grids[j][1]),
                            end: Math.min(grids[i][3], grids[j][3]),
                        },
                    ];
                }
            }
            // i在j下边
            if (grids[i][0] == grids[j][2] && grids[i][3] > grids[j][1] && grids[j][3] > grids[i][1]) {
                if (allLine.x[grids[i][0]]) {
                    allLine.x[grids[i][0]].push({
                        start: Math.max(grids[i][1], grids[j][1]),
                        end: Math.min(grids[i][3], grids[j][3]),
                    });
                } else {
                    allLine.x[grids[i][0]] = [
                        {
                            start: Math.max(grids[i][1], grids[j][1]),
                            end: Math.min(grids[i][3], grids[j][3]),
                        },
                    ];
                }
            }
            // i在j左边
            if (grids[i][3] == grids[j][1] && grids[i][2] > grids[j][0] && grids[j][2] > grids[i][0]) {
                if (allLine.y[grids[i][3]]) {
                    allLine.y[grids[i][3]].push({
                        start: Math.max(grids[i][0], grids[j][0]),
                        end: Math.min(grids[i][2], grids[j][2]),
                    });
                } else {
                    allLine.y[grids[i][3]] = [
                        {
                            start: Math.max(grids[i][0], grids[j][0]),
                            end: Math.min(grids[i][2], grids[j][2]),
                        },
                    ];
                }
            }
            // i在j右边
            if (grids[i][1] == grids[j][3] && grids[i][2] > grids[j][0] && grids[j][2] > grids[i][0]) {
                if (allLine.y[grids[i][1]]) {
                    allLine.y[grids[i][1]].push({
                        start: Math.max(grids[i][0], grids[j][0]),
                        end: Math.min(grids[i][2], grids[j][2]),
                    });
                } else {
                    allLine.y[grids[i][1]] = [
                        {
                            start: Math.max(grids[i][0], grids[j][0]),
                            end: Math.min(grids[i][2], grids[j][2]),
                        },
                    ];
                }
            }
        }
    }
    mergeLine(allLine);
    return allLine;
};
// 如果xy有完全重复，就合并这一行列
const reduceMap = (gridMap, gridSizeMap) => {
    let checkStatus = {
        xneedcheck: true,
        yneedcheck: true,
    };
    const checkY = () => {
        let change = false;
        if (gridMap.length > 1) {
            for (let i = 1; i < gridMap.length; ) {
                if (lodash.isEqual(gridMap[i], gridMap[i - 1])) {
                    gridMap.splice(i, 1);
                    gridSizeMap.y.splice(i, 1);
                    change = true;
                } else {
                    i++;
                }
            }
        }
        checkStatus.yneedcheck = false;
        if (change == true) {
            checkStatus.xneedcheck = true;
        }
        if (checkStatus.xneedcheck) {
            checkX();
        }
    };
    const checkX = () => {
        let change = false;
        if (gridMap[0].length > 1) {
            for (let i = 1; i < gridMap[0].length; ) {
                let same = true;
                for (let j = 0; j < gridMap.length; j++) {
                    if (gridMap[j][i] != gridMap[j][i - 1]) {
                        same = false;
                        break;
                    }
                }
                if (same) {
                    for (let j = 0; j < gridMap.length; j++) {
                        gridMap[j].splice(i, 1);
                    }
                    gridSizeMap.x.splice(i - 1, 2, gridSizeMap.x[i - 1] + gridSizeMap.x[i]);
                    change = true;
                } else {
                    i++;
                }
            }
        }
        checkStatus.xneedcheck = false;
        if (change == true) {
            checkStatus.yneedcheck = true;
        }
        if (checkStatus.yneedcheck) {
            checkY();
        }
    };
    checkY();
    return gridMap;
};
// 根据所有单元格grid生成坐标map
export const makeGridMap = (arr) => {
    const arrInfo = arr.map((i) => {
        return {
            id: i.com_id,
            grid: i.grid.split('/').map(Number),
        };
    });
    let heightNum = 0;
    let widthNum = 0;
    for (const i of arrInfo) {
        if (i.grid[2] - 1 > heightNum) {
            heightNum = i.grid[2] - 1;
        }
        if (i.grid[3] - 1 > widthNum) {
            widthNum = i.grid[3] - 1;
        }
    }
    const gridMap = Array.from({ length: heightNum }, () => new Array(widthNum));
    for (const item of arrInfo) {
        for (let x = item.grid[1]; x < item.grid[3]; x++) {
            for (let y = item.grid[0]; y < item.grid[2]; y++) {
                gridMap[y - 1][x - 1] = item.id;
            }
        }
    }
    return gridMap;
    // console.log(arrInfo);
};
//根据坐标map生成所有单元格grid信息
export const makeGridInfo = (map, gridSizeMap) => {
    map = reduceMap(map, gridSizeMap);
    const newGridInfoData = {};
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (!newGridInfoData[map[y][x]]) {
                newGridInfoData[map[y][x]] = [y + 1, x + 1, y + 2, x + 2];
            } else {
                if (x + 2 > newGridInfoData[map[y][x]][3]) {
                    newGridInfoData[map[y][x]][3] = x + 2;
                }
                if (y + 2 > newGridInfoData[map[y][x]][2]) {
                    newGridInfoData[map[y][x]][2] = y + 2;
                }
            }
        }
    }
    return newGridInfoData;
};
//根据所有单元格grid信息重新排列所有单元格grid
// 不知道为什么会导致reducer反复执行，先不使用
export const rearrangeGrid = (database, gridInfo) => {
    for (const i in gridInfo) {
        database[i].grid = gridInfo[i].join('/');
    }
};
export default null;
