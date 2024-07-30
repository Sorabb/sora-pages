import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import styles from './style/index.module.scss';
import ResponsiveItem from './components/ResponsiveItem';
const WorkspaceAttribute = () => {
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
            <div className={styles['wrap']}>
                <div className={styles['workspace-main']}>
                    <div className={styles['workspace-container']}>
                        <div className={styles['responsive-layout-container']}>
                            <div className={styles['responsive-layout-main-title']}>responsive-layout</div>
                            <div className={styles['responsive-layout-main-content']}>
                                <ResponsiveItem />
                            </div>
                        </div>
                    </div>
                    <WorkspaceAttribute />
                </div>

            </div>
        </>
    )
}