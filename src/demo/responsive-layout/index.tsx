import React from "react";
import {Link} from "react-router-dom";
import styles from './style/index.module.scss';
import ResponsiveItem from './components/ResponsiveItem'
export default () => {
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
                <div className={styles['content']}>
                    <div className={styles['main']}>
                        <div className={styles['main-title']}>responsive-layout</div>
                        <ResponsiveItem />
                    </div>

                </div>

            </div>
        </>
    )
}