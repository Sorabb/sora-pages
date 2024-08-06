import React, {useEffect, useContext, useState, useMemo, useRef} from "react";
import { Input, Button, Popover } from "antd";
import styles from './style/index.module.scss';
import { QuestionCircleOutlined,GithubOutlined } from "@ant-design/icons";
import ResponsiveContainer from './components/ResponsiveContainer';
import ResponsiveContextProvider, {ResponsiveContext} from './context';

const WorkspaceAttribute = () => {
    const {
        state: {
            select,
        },
        selectComSize
    } = useContext(ResponsiveContext);
    return (
        <div className={styles['workspace-attribute']}>
            <div className={styles['workspace-attribute-title']}>
                所选组件属性
            </div>

            {select && select != 'container' ? (
                <>
                    {/*<div className={styles['workspace-attribute-line']}>
                        所选组件id: {select}
                    </div>*/}
                    <div className={styles['workspace-attribute-line']}>
                        组件宽
                        <Input disabled value={selectComSize[0] + 'px'} style={{
                            width: '100px',
                            marginLeft: '10px'
                        }} size={'small'}></Input>
                    </div>
                    <div className={styles['workspace-attribute-line']}>
                        组件高
                        <Input disabled value={selectComSize[1] + 'px'} style={{
                            width: '100px',
                            marginLeft: '10px'
                        }} size={'small'}></Input>
                    </div>
                </>
                ) : <></>
            }
        </div>
    )
}

const ResponsiveLayout = () => {
    const {onSelect, state: {
        select
    },comDragingRef} = useContext(ResponsiveContext);
    const selectContentRef = useRef(null);
    useEffect(() => {
        document.body.style.margin = '0';

        return () => {
            document.body.style.margin = '';
        };
    }, []);


    const [hoverItemId, setHoverItemId] = useState('');

    const HoverItemLineContent = useMemo(() => {
        if (!hoverItemId || select == hoverItemId) {
            return <></>;
        }
        const hoverItem = document.querySelector(
            `[data-com_id='${hoverItemId}']`
        ) as HTMLElement;
        const selectRect = hoverItem?.getBoundingClientRect();
        if (!selectRect) {
            return <></>;
        } else {
            const parentDom = selectContentRef.current;
            const parentRect = parentDom?.getBoundingClientRect();

            const buttonTop = selectRect.top - parentRect.top;
            const buttonLeft = selectRect.left - parentRect.left;
            return (
                <div
                    style={{
                        width: selectRect.width,
                        height: selectRect.height,
                        left: buttonLeft - 1,
                        top: buttonTop  - 1,
                        border: '1px solid #2149a4',
                        pointerEvents: 'none',
                        position: 'absolute',
                        zIndex: 8
                    }}></div>
            );
        }
    }, [hoverItemId, select]);

    const SelectItemLineContent = useMemo(() => {
        if (!select) {
            return <></>;
        }
        const selectItem = document.querySelector(
            `[data-com_id='${select}']`
        ) as HTMLElement;
        const selectRect = selectItem?.getBoundingClientRect();
        if (!selectRect) {
            return <></>;
        } else {
            const parentDom = selectContentRef.current;
            const parentRect = parentDom?.getBoundingClientRect();

            const buttonTop = selectRect.top - parentRect.top;
            const buttonLeft = selectRect.left - parentRect.left;
            return (
                <div
                    style={{
                        width: selectRect.width,
                        height: selectRect.height,
                        left: buttonLeft - 1,
                        top: buttonTop - 1,
                        border: '1px solid #2149a4',
                        boxShadow: '0 0 1px 1px #2149a4',
                        pointerEvents: 'none',
                        position: 'absolute',
                        zIndex: 8
                    }}></div>
            );
        }
    }, [select])
    return (
        <>
            <div className={styles['wrap']}
                 onClick={(e) => {
                     e.stopPropagation();
                     let target = e.target as HTMLElement;
                     while (
                         !target.dataset?.['com_type'] && target.parentNode
                         ) {
                         target = target.parentNode as HTMLElement;
                     }
                     if (target?.dataset?.['com_type'] == 'container') {
                         onSelect('container');
                     } else if (target?.dataset?.['com_type'] == 'item') {
                         onSelect(target.dataset?.['com_id']);
                     } else {
                         onSelect('');
                     }
                 }}>
                <div className={styles['workspace-main']}>
                    <div className={styles['workspace-container']}>
                        <div className={styles['responsive-layout-container']}>
                            <div className={styles['responsive-layout-main-title']}>
                                wix布局
                                <Popover content={(
                                    <>
                                        <div>1.右键单元格可以拆分与删除</div>
                                        <div>2.选中单元格右侧显示单元格宽高</div>
                                        <div>3.拖动单元格之间的分割线可以改变单元格的宽高</div>
                                        <div>4.容器内没有单元格时可以选择预设的几种布局</div>
                                        <div>5.单元格有大小限制，太小将不可分割与拖动</div>
                                    </>

                                )}
                                    title={'使用方法&包含功能'}>
                                    <Button shape="circle" style={{marginLeft: '10px'}} type="text" icon={<QuestionCircleOutlined />} />
                                </Popover>
                                <Button shape="circle" style={{marginLeft: '10px'}} icon={<GithubOutlined />} target={'_blank'} title={'demo源码地址'} href={'https://github.com/Sorabb/sora-pages/tree/master/src/demo/responsive-layout'} />
                            </div>
                            <div className={styles['responsive-layout-main-content']}

                                 onMouseOver={(e) => {
                                     if (comDragingRef.current) {
                                         return;
                                     }
                                     e.stopPropagation();
                                     let target = e.target as HTMLElement;;
                                     while (
                                         !target.dataset?.['com_type'] && target.parentNode
                                         ) {
                                         target = target.parentNode as HTMLElement;
                                     }
                                     if (target?.dataset?.['com_type'] == 'item') {
                                         setHoverItemId(target.dataset?.['com_id']);
                                     } else {
                                         setHoverItemId('');
                                     }
                                 }}
                                 onMouseOut={() => {
                                     setHoverItemId('');
                                 }}
                            >
                                <ResponsiveContainer/>
                                <div className={styles['responsive-layout-select-content']} ref={selectContentRef}>
                                    {HoverItemLineContent}
                                    {SelectItemLineContent}
                                </div>
                            </div>

                        </div>
                    </div>
                    <WorkspaceAttribute />
                </div>

            </div>
        </>
    )
}
export default () => {
    return (
        <ResponsiveContextProvider>
            <ResponsiveLayout />
        </ResponsiveContextProvider>
    )
}