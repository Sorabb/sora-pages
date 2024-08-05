import React , {useContext, useMemo,useRef,useLayoutEffect,useState} from "react";
import {ResponsiveContext} from '../../context';
import ResponsiveItem from "../ResponsiveItem";
import Draggable from 'react-draggable';
import {makeLines} from "../../utils";
import styles from '../../style/index.module.scss';
import lodash from "lodash";
export default () => {
    const {pageData,state:{gridSizeMap:sizeMap}, onHandleChangeItemSize,comDragingRef} = useContext(ResponsiveContext);
    const containerRef = useRef(null);
    const resizingPosRef = useRef(false);
    const dragPos = useRef({
        startX: undefined,
        startY: undefined,
        dir: undefined
    });
    const dragLine = (e, dir) => {
        resizingPosRef.current = true;
        comDragingRef.current = true;
        dragPos.current = {
            startX: e.clientX,
            startY: e.clientY,
            dir: dir
        };
    };
    const onHandleStop = (e, i, ex?: any) => {
        const arr = lodash.cloneDeep(sizeMap);
        comDragingRef.current = false;
        if (dragPos.current.dir == 'x') {
            const changeX = e.x;
            const changePercent = Math.round(
                (changeX / containefWidth) * 10000
            );
            arr.x[i] = (arr.x[i] * 100 + changePercent) / 100;
            arr.x[i + 1] = (arr.x[i + 1] * 100 - changePercent) / 100;
        } else if (dragPos.current.dir == 'y') {
            const changeY = e.y;
            arr.y[i] = arr.y[i] + changeY;
            if (ex && ex.bottom) {
                // 如果是最下面的一条线，只需要改变自己的高度，不需要减少下一层的高度
            } else {
                arr.y[i + 1] = arr.y[i + 1] - changeY;
            }
        }
        dragPos.current = {
            startX: undefined,
            startY: undefined,
            dir: undefined
        };
        onHandleChangeItemSize(arr);
    };
    const [containefWidth, setContainefWidth] = useState(0);
    const gridTemplateData = useMemo(() => {
        const gridTemplateData = {
            gridTemplateRows: '',
            gridTemplateColumns: '',
            widthSum: 100
        };
        if (sizeMap.y.length > 0) {
            gridTemplateData.gridTemplateRows = sizeMap.y
                ?.map((i) => {
                    return i + 'px';
                })
                .join(' ');
        }
        if (sizeMap.x.length > 0) {
            gridTemplateData.gridTemplateColumns = sizeMap.x
                .map((i) => {
                    return i / 50 + 'fr';
                })
                .join(' ');
            gridTemplateData.widthSum = sizeMap.x.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            );
        }

        return gridTemplateData;
    }, [sizeMap]);
    const LineGroupContent = useMemo(() => {
        if (containefWidth == 0) {
            return <></>
        }
        const allGrid = pageData.map((i) => {
            return i.grid.split('/').map(Number);
        });
        const lineData = makeLines(allGrid);
        const bottomLine = (
            <Draggable
                key={'bottomLine'}
                position={{x: 0, y: 0}}
                bounds={{
                    top: -(sizeMap.y[sizeMap.y.length - 1] - 30)
                }}
                axis="y"
                onMouseDown={(e) => {
                    dragLine(e, 'y');
                }}
                onStop={(e, data) => {
                    onHandleStop(data, sizeMap.y.length - 1, {
                        bottom: true
                    });
                }}>
                <div
                    className={styles['xline']}
                    style={{
                        height: '1px',
                        width:
                            sizeMap.x.reduce(
                                (accumulator, currentValue) =>
                                    accumulator + currentValue,
                                0
                            ) + '%',
                        top:
                            sizeMap.y.reduce(
                                (accumulator, currentValue) =>
                                    accumulator + currentValue,
                                0
                            ) -1 + 'px',
                        left: 0
                    }}></div>
            </Draggable>
        );
        const topLIne = (
            <div
                key={'topLIne'}
                className={styles['topline']}
                style={{
                    width:
                        sizeMap.x.reduce(
                            (accumulator, currentValue) =>
                                accumulator + currentValue,
                            0
                        ) + '%',
                    height: '1px',
                    top: 0,
                    left: 0
                }}></div>
        );

        const RightLine = (
            <div
                key={'RightLine'}
                className={styles['bothline']}
                style={{
                    height:
                        sizeMap.y.reduce(
                            (accumulator, currentValue) =>
                                accumulator + currentValue,
                            0
                        ) + 'px',
                    width: '1px',
                    top: 0,
                    right: '0'
                }}></div>
        );

        const LeftLine = (
            <div
                key={'LeftLine'}
                className={styles['bothline']}
                style={{
                    height:
                        sizeMap.y.reduce(
                            (accumulator, currentValue) =>
                                accumulator + currentValue,
                            0
                        ) + 'px',
                    width: '1px',
                    left: 0,
                    top: 0
                }}></div>
        );
        const alllines = [];

        if (!lineData) {
            alllines.push(bottomLine, topLIne, RightLine, LeftLine);
        } else {

            const lineXgroup = Object.keys(lineData.x);
            const lineYgroup = Object.keys(lineData.y);
            for (const i of lineXgroup) {
                for (const j of lineData.x[i]) {
                    const index = Number(i) - 2;
                    alllines.push(
                        <Draggable
                            position={{x: 0, y: 0}}
                            bounds={{
                                top: -(sizeMap.y[index] - 30),
                                bottom: sizeMap.y[index + 1] - 30
                            }}
                            axis="y"
                            onMouseDown={(e) => {
                                dragLine(e, 'y');
                            }}
                            onStop={(e, data) => {
                                onHandleStop(data, index);
                            }}>
                            <div
                                className={styles['xline']}
                                style={{
                                    marginTop: '-1px',
                                    height: '2px',
                                    width:
                                        sizeMap.x
                                            .slice(j.start - 1, j.end - 1)
                                            .reduce(
                                                (accumulator, currentValue) =>
                                                    accumulator + currentValue,
                                                0
                                            ) + '%',
                                    top:
                                        sizeMap.y
                                            .slice(0, index + 1)
                                            .reduce(
                                                (accumulator, currentValue) =>
                                                    accumulator + currentValue,
                                                0
                                            ) + 'px',
                                    left:
                                        sizeMap.x
                                            .slice(0, j.start - 1)
                                            .reduce(
                                                (accumulator, currentValue) =>
                                                    accumulator + currentValue,
                                                0
                                            ) + '%'
                                }}></div>
                        </Draggable>
                    );
                }
            }
            for (const i of lineYgroup) {
                for (const j of lineData.y[i]) {
                    const index = Number(i) - 2;
                    alllines.push(
                        <Draggable
                            position={{x: 0, y: 0}}
                            bounds={{
                                left:
                                    -(containefWidth * (sizeMap.x[index])) /
                                    100 + 30,
                                right:
                                    (containefWidth * (sizeMap.x[index + 1])) /
                                    100  - 30
                            }}
                            axis="x"
                            onMouseDown={(e) => {
                                dragLine(e, 'x');
                            }}
                            onStop={(e, data) => {
                                onHandleStop(data, index);
                            }}>
                            <div
                                className={styles['yline']}
                                style={{
                                    width: '2px',
                                    marginLeft: '-1px',
                                    height:
                                        sizeMap.y
                                            .slice(j.start - 1, j.end - 1)
                                            .reduce(
                                                (accumulator, currentValue) =>
                                                    accumulator + currentValue,
                                                0
                                            ) + 'px',
                                    left:
                                        sizeMap.x
                                            .slice(0, index + 1)
                                            .reduce(
                                                (accumulator, currentValue) =>
                                                    accumulator + currentValue,
                                                0
                                            ) + '%',
                                    top:
                                        sizeMap.y
                                            .slice(0, j.start - 1)
                                            .reduce(
                                                (accumulator, currentValue) =>
                                                    accumulator + currentValue,
                                                0
                                            ) + 'px'
                                }}></div>
                        </Draggable>
                    );
                }
            }
    
            alllines.push(bottomLine, topLIne, RightLine, LeftLine);
        }
        return (
            <div
                style={{
                    height: '0',
                    width: '100' + '%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    overflow:"visible",
                }}>
                {alllines}
            </div>
        );

    },[pageData,gridTemplateData,sizeMap,containefWidth]);
    useLayoutEffect(() => {
        setContainefWidth(containerRef.current.getBoundingClientRect().width);
    }, [gridTemplateData]);
    return (
        <div className={styles['responsive-layout-inner-container']}>
            <div className={styles['responsive-layout-inner-header']}></div>
            <div className={styles['responsive-layout-inner-content']}>
            <div style={{
                    position: 'relative',
                    boxSizing: 'border-box',
                }}>
                    <div
                        data-com_type={'container'}
                        ref={containerRef}
                        style={{
                            display: 'grid',
                            position: 'relative',
                            width: '100%',
                            boxSizing: 'border-box',
                            gridTemplateRows: gridTemplateData.gridTemplateRows,
                            gridTemplateColumns: gridTemplateData?.gridTemplateColumns,
                        }}>
                        {pageData.map((item, i) => (
                            <ResponsiveItem key={item.com_id} data={item}/>
                        ))}
                    </div>
            </div>
            {LineGroupContent}
            </div>
            <div className={styles['responsive-layout-inner-footer']}></div>
        </div>
        

    )
}