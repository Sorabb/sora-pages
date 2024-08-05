import React, {useContext, useLayoutEffect, useMemo, useRef, useState} from "react";
import { Dropdown } from 'antd';
import {ResponsiveContext} from '../../context';

export default (props) => {
    const {onHandleTrigger,state: {
        gridSizeMap
    }} = useContext(ResponsiveContext);
    const {data} = props;
    const domRef = useRef(null);

    const [items,setItems] = useState([]);
    useLayoutEffect(() => {
        if (domRef.current) {
            const rect = domRef.current.getBoundingClientRect();
            setItems ([
                {label: '左右拆分',key: 'horizontal',disabled:rect.width < 60},
                {label: '上下拆分',key: 'vertical',disabled:rect.height < 60},
                {label: '刪除',key: 'onDelete'}
                ]
            )
        } else {
            setItems([])
        }
    }, [data.grid,gridSizeMap]);

    const onClick = ({item, key}) => {
        onHandleTrigger(key,data.com_id);
    }
    return (
        <Dropdown menu={{ items, onClick }} trigger={['contextMenu']}>
            <div ref={domRef} data-com_id={data.com_id} data-com_type={'item'} style={{
                gridArea: data.grid,
                boxSizing: 'border-box',
                margin: '5px',
                border: '1px solid #ccc',
            }}></div>
        </Dropdown>
    )
}