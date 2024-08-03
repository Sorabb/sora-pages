import React, {useContext} from "react";
import { Dropdown } from 'antd';
import {ResponsiveContext} from '../../context';

export default (props) => {
    const {onHandleTrigger} = useContext(ResponsiveContext);
    const {data} = props;
    const items = [
        {label: '左右拆分',key: 'horizontal'},
        {label: '上下拆分',key: 'vertical'},
        {label: '刪除',key: 'onDelete'}
    ]
    const onClick = ({item, key}) => {
        onHandleTrigger(key,data.com_id);
    }
    return (
        <Dropdown menu={{ items, onClick }} trigger={['contextMenu']}>
            <div data-com_id={data.com_id} data-com_type={'item'} style={{
                gridArea: data.grid,
                boxSizing: 'border-box',
                margin: '5px',
                border: '1px solid #ccc',
            }}></div>
        </Dropdown>
    )
}