import React from "react";
import {Link} from "react-router-dom";
export default () => {
    return (
        <>
            <div>
                <Link to={'/'}>index</Link>
            </div>
            <div>
                <Link to={'/demo'}>demo</Link>
            </div>
            <div>responsive-layout</div>
        </>
    )
}