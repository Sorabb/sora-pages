import React , {useContext, useMemo,useRef,useLayoutEffect,useState} from "react";

import {ResponsiveContext} from '../../context';
import ResponsiveItem from "../ResponsiveItem";
import Draggable from 'react-draggable';
import {makeLines} from "../../utils";
import styles from '../../style/index.module.scss';
export default () => {

    const containerRef = useRef(null);
    const [containefWidth, setContainefWidth] = useState(0);
    const {pageData,state:{gridSizeMap:sizeMap}} = useContext(ResponsiveContext);
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
        const allGrid = pageData.map((i) => {
            return i.grid.split('/').map(Number);
        });
        const lineData = makeLines(allGrid);
        const bottomLine = (
            <Draggable
                position={{x: 0, y: 0}}
                bounds={{
                    top: -(sizeMap.y[sizeMap.y.length - 1] - 6)
                }}
                axis="y"
                onMouseDown={(e) => {
                    console.log(`dragLine(e, 'y');`)
                }}
                onStop={(e, data) => {
                    console.log(`onHandleStop(data, sizeMap.y.length - 1, {
                        bottom: true
                    });`)
                }}>
                <div
                    className={styles['xline']}
                    style={{
                        marginTop: '-1px',
                        height: '2px',
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
                            ) + 'px',
                        left: 0
                    }}></div>
            </Draggable>
        );
        const topLIne = (
            <div
                className={styles['topline']}
                style={{
                    marginTop: '-1px',
                    width:
                        sizeMap.x.reduce(
                            (accumulator, currentValue) =>
                                accumulator + currentValue,
                            0
                        ) + '%',
                    height: '2px',
                    top: 0,
                    left: 0
                }}></div>
        );

        const RightLine = (
            <div
                className={styles['bothline']}
                style={{
                    marginRight: '-1px',
                    height:
                        sizeMap.y.reduce(
                            (accumulator, currentValue) =>
                                accumulator + currentValue,
                            0
                        ) + 'px',
                    width: '2px',
                    top: 0,
                    right: 0
                }}></div>
        );

        const LeftLine = (
            <div
                className={styles['bothline']}
                style={{
                    marginLeft: '-1px',
                    height:
                        sizeMap.y.reduce(
                            (accumulator, currentValue) =>
                                accumulator + currentValue,
                            0
                        ) + 'px',
                    width: '2px',
                    left: 0,
                    top: 0
                }}></div>
        );
        if (!lineData) {
            return [bottomLine, topLIne, RightLine, LeftLine];
        }
        const alllines = [];
        const lineXgroup = Object.keys(lineData.x);
        const lineYgroup = Object.keys(lineData.y);
        for (const i of lineXgroup) {
            for (const j of lineData.x[i]) {
                const index = Number(i) - 2;
                alllines.push(
                    <Draggable
                        position={{x: 0, y: 0}}
                        bounds={{
                            top: -(sizeMap.y[index] - 6),
                            bottom: sizeMap.y[index + 1] - 6
                        }}
                        axis="y"
                        onMouseDown={(e) => {
                            console.log(`dragLine(e, 'y');`)
                        }}
                        onStop={(e, data) => {
                            console.log(`onHandleStop(data, index);`)
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
                                -(containefWidth * (sizeMap.x[index] - 6)) /
                                100,
                            right:
                                (containefWidth * (sizeMap.x[index + 1] - 6)) /
                                100
                        }}
                        axis="x"
                        onMouseDown={(e) => {
                            console.log(`dragLine(e, 'x');`)
                        }}
                        onStop={(e, data) => {
                            console.log(`onHandleStop(data, index);`);
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
        return (
            <div
                style={{
                    height: '0',
                    width: '100' + '%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10
                }}>
                {alllines}
            </div>
        );

    },[pageData,gridTemplateData,sizeMap]);
    useLayoutEffect(() => {
        setContainefWidth(containerRef.current.getBoundingClientRect().width);
    }, [gridTemplateData]);
    return (
        <div style={{
            position: 'relative',
        }}>
            <div
                ref={containerRef}
                style={{
                    display: 'grid',
                    position: 'relative',
                    width: '100%',
                    gridTemplateRows: gridTemplateData.gridTemplateRows,
                    gridTemplateColumns: gridTemplateData?.gridTemplateColumns,
                }}>
                {pageData.map((item, i) => (
                    <ResponsiveItem data={item}/>
                ))}
            </div>
            {LineGroupContent}
        </div>

    )
}