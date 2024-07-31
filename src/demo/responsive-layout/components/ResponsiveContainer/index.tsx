import React , {useContext, useMemo} from "react";

import {ResponsiveContext} from '../../context';
import ResponsiveItem from "../ResponsiveItem";
export default () => {

    const {pageData,state:{gridSizeMap:sizeMap}} = useContext(ResponsiveContext);
    const gridTemplateData = useMemo(() => {
        const gridTemplateData = {
            gridTemplateRows: '',
            gridTemplateColumns: '',
            widthSum: 100
        };
        if (sizeMap.y.length > 0) {
            gridTemplateData.gridTemplateRows = sizeMap.y
                ?.map((i) => {
                    return i + 'px';
                })
                .join(' ');
        }
        if (sizeMap.x.length > 0) {
            gridTemplateData.gridTemplateColumns = sizeMap.x
                .map((i) => {
                    return i / 50 + 'fr';
                })
                .join(' ');
            gridTemplateData.widthSum = sizeMap.x.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            );
        }

        return gridTemplateData;
    }, [sizeMap]);
    return (
        <div style={{
            display: 'grid',
            position: 'relative',
            width: '100%',
            gridTemplateRows: gridTemplateData.gridTemplateRows,
            gridTemplateColumns: gridTemplateData?.gridTemplateColumns,
        }}>
            {pageData.map((item, i) => (
                <ResponsiveItem data={item} />
            ))}
        </div>
    )
}