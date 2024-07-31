import React from "react";
export default (props) => {
    const {data} = props;
    console.log(data)
    return (
        <div data-com_id={data.com_id} data-com_type={'item'} style={{
            gridArea: data.grid,
        }}>3213213</div>
    )
}