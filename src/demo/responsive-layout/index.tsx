import React, { useEffect, useContext } from "react";
import {Link} from "react-router-dom";
import styles from './style/index.module.scss';
import ResponsiveContainer from './components/ResponsiveContainer';
import ResponsiveContextProvider, {ResponsiveContext} from './context';
const WorkspaceAttribute = () => {
    const {state: {
        select
    }} = useContext(ResponsiveContext);
    return (
        <div className={styles['workspace-attribute']}>
            <div className={styles['workspace-attribute-title']}>
                页面属性{select}
            </div>
        </div>
    )
}
const ResponsiveLayout =() => {
    const {onSelect,state} = useContext(ResponsiveContext);
    useEffect(() => {
        document.body.style.margin = '0';

        return () => {
            document.body.style.margin = '';
        };
    },[])
    return (
        <>
            {/*<div>
                <Link to={'/'}>index</Link>
            </div>
            <div>
                <Link to={'/demo'}>demo</Link>
            </div>
            <div>responsive-layout321321</div>*/}
            <div className={styles['wrap']}>
                <div className={styles['workspace-main']}>
                    <div className={styles['workspace-container']}>
                        <div className={styles['responsive-layout-container']}>
                            <div className={styles['responsive-layout-main-title']}>responsive-layout</div>
                            <div className={styles['responsive-layout-main-content']} onClick={(e) => {
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
                                }
                            }}>
                                <ResponsiveContainer />
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