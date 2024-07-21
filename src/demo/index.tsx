import React from "react";
import {Link} from "react-router-dom";
import {
    Route,
} from "react-router-dom";
export default () => {
    return (
        <>
            <div>
                <div><Link to={'responsive-layout'}>responsive-layout</Link></div>
                <div><Link to={'/'}>home</Link></div>
            </div>
            <div>index-demo</div>
        </>
    )
}