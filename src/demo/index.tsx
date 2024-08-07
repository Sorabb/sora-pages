import React from 'react';
const Index = () => {
    return (
        <div className="wrap">
            <div>
                <h4>responsive-layout</h4>
                <div>仿wix布局</div>
                <div>实现可以拆分删除拖拽改变大小的网格布局，可以一键将布局改变为预设的几种布局</div>
                <div>总结：</div>
                <div>
                    react源生的useReducer相比于redux还是难用太多，因为使用的js源生Object.is方法，导致state在传入方法与set时需要深拷贝才会触发渲染。
                </div>
                <div>state在传入方法时还有奇怪的问题，导致state方法执行多遍的bug</div>
                <div>redux使用了omit对象压缩，性能上更高效</div>
            </div>
        </div>
    );
};
export default Index;
