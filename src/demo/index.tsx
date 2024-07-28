import React from "react";
import {Link} from "react-router-dom";
export default () => {
    return (
        <>
            <div>
                <div><Link to={'responsive-layout'}>responsive-layout</Link></div>
                <div><Link to={'/'}>home</Link></div>
            </div>
            <div>index-demo</div>
            <div>
                <h4>项目介绍</h4>
                <div>无脚手架使用<b>webpack</b> + <b>react</b> + <b>react-router-dom</b>部署</div>
                <div>github action实现cicd</div>
            </div>
            <div>
                <h4>总结</h4>
                <div>git pages在绑定域名情况下可以有多个站点</div>
                <div>
                    git pages因为没有nginx，实现不了路由地址统一index.html，刷新域名会统一走404。
                </div>
                <div>
                    但是有个天才说可以上传一个404文件，因为会走404文件，404文件跟index.html同内容的话，就相当于做了入口路由。</div>
                </div>
                <div>使用webpack插件来实现复制出404文件暂时没用好的解决办法，因为webpack是打包执行，需要一个打包成功后的操作</div>
                <div>已由github action实现</div>
            <div>
                <h4>todo</h4>
                <div>接入ant-design</div>
                <div>设置webpack-merge区分环境与打包</div>
                <div>创建自己的prettir与eslint</div>
                <div>管理pnpmrc与gh-pages不冲突</div>
                <div>缺少一个reset.css</div>
            </div>
        </>
    )
}