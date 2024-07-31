import {customAlphabet} from "nanoid";
export const nanoid = () => {
    return customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',1)() +
        customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',20)();
}
const mergeLine = (allLine) => {
    for (const i in allLine.x) {
        allLine.x[i].sort((a,b) => {
            return a.start-b.start;
        })
    }
    for (const i in allLine.y) {
        allLine.y[i].sort((a,b) => {
            return a.start-b.start;
        })
    }
    for (const i in allLine.x) {
        const item =allLine.x[i];
        for (let j = 0;j<item.length-1;) {
            if (item[j+1].start == item[j].end) {
                item.splice(j,2,{
                    start: item[j].start,
                    end: item[j+1].end
                });
            } else {
                j++;
            }
        }
    }
    for (const i in allLine.y) {
        const item =allLine.y[i];
        for (let j = 0;j<item.length-1;) {
            if (item[j+1].start == item[j].end) {
                item.splice(j,2,{
                    start: item[j].start,
                    end: item[j+1].end
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
        y: {}
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
                        start: Math.max(grids[i][1],grids[j][1]),
                        end: Math.min(grids[i][3],grids[j][3])
                    })
                } else {
                    allLine.x[grids[i][2]] = [
                        {
                            start: Math.max(grids[i][1],grids[j][1]),
                            end: Math.min(grids[i][3],grids[j][3])
                        }
                    ]
                }
            }
            // i在j下边
            if (grids[i][0] == grids[j][2] && grids[i][3] > grids[j][1] && grids[j][3] > grids[i][1]) {
                if (allLine.x[grids[i][0]]) {
                    allLine.x[grids[i][0]].push({
                        start: Math.max(grids[i][1],grids[j][1]),
                        end: Math.min(grids[i][3],grids[j][3])
                    })
                } else {
                    allLine.x[grids[i][0]] = [
                        {
                            start: Math.max(grids[i][1],grids[j][1]),
                            end: Math.min(grids[i][3],grids[j][3])
                        }
                    ]
                }
            }
            // i在j左边
            if (grids[i][3] == grids[j][1] && grids[i][2] > grids[j][0] && grids[j][2] > grids[i][0]) {
                if (allLine.y[grids[i][3]]) {
                    allLine.y[grids[i][3]].push({
                        start: Math.max(grids[i][0],grids[j][0]),
                        end: Math.min(grids[i][2],grids[j][2])
                    })
                } else {
                    allLine.y[grids[i][3]] = [
                        {
                            start: Math.max(grids[i][0],grids[j][0]),
                            end: Math.min(grids[i][2],grids[j][2])
                        }
                    ]
                }
            }
            // i在j右边
            if (grids[i][1] == grids[j][3] && grids[i][2] > grids[j][0] && grids[j][2] > grids[i][0]) {
                if (allLine.y[grids[i][1]]) {
                    allLine.y[grids[i][1]].push({
                        start: Math.max(grids[i][0],grids[j][0]),
                        end: Math.min(grids[i][2],grids[j][2])
                    })
                } else {
                    allLine.y[grids[i][1]] = [
                        {
                            start: Math.max(grids[i][0],grids[j][0]),
                            end: Math.min(grids[i][2],grids[j][2])
                        }
                    ]
                }
            }
        }
    }
    mergeLine(allLine)
    return allLine;
}
export default null;