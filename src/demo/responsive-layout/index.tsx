import React, { useEffect, useContext } from "react";
import {Link} from "react-router-dom";
import styles from './style/index.module.scss';
import ResponsiveContainer from './components/ResponsiveContainer';
import ResponsiveContextProvider, {ResponsiveContext} from './context';
const WorkspaceAttribute = () => {
    const {select} = useContext(ResponsiveContext);
    console.log(select)
    return (
        <div className={styles['workspace-attribute']}>
            <div className={styles['workspace-attribute-title']}>
                页面属性
            </div>
        </div>
    )
}
export default () => {
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
            <ResponsiveContextProvider>
                <div className={styles['wrap']}>
                    <div className={styles['workspace-main']}>
                        <div className={styles['workspace-container']}>
                            <div className={styles['responsive-layout-container']}>
                                <div className={styles['responsive-layout-main-title']}>responsive-layout</div>
                                <div className={styles['responsive-layout-main-content']}>
                                    <ResponsiveContainer />
                                </div>
                            </div>
                        </div>
                        <WorkspaceAttribute />
                    </div>

                </div>
            </ResponsiveContextProvider>
        </>
    )
}