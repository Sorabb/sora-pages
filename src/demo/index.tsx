import React from "react";
import {Link} from "react-router-dom";
import './style/index.scss'
export default () => {
    return (
        <>
            <div className="wrap">
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
                <div>实现css模块引入，遇到两个问题</div>
                <div>1:引入的css模块报错 Cannot read properties of undefined。</div>
                <div>解决：降级css-loader，最新7.1.2版本降级到^6.8.1</div>
                <div>2:因为css模块引入需要ts声明，加入了global.d.ts，在tsconfig.json引入后会报错Error: The loaded module contains errors</div>
                <div>解决：参考https://github.com/babel/babel-loader/issues/912，在ts-loader里的加入options：transpileOnly:true</div>
                <div>更新：缺少@babel/preset-typescript，安装之后修复</div>
                <div>3:去掉transpileOnly:true之后，热重载会丢失module的定义</div>
                <div>解决：参考ts-loader文档的transpileOnly，使用fork-ts-checker-webpack-plugin插件编译加速ts-loader</div>
            <div>
                <h4>todo</h4>
                <div><span style={{textDecoration : 'line-through'}}>接入ant-design</span></div>
                <div>设置webpack-merge区分环境与打包</div>
                <div>创建自己的prettir与eslint</div>
                <div>管理pnpmrc与gh-pages不冲突</div>
                <div><span style={{textDecoration : 'line-through'}}>缺少一个reset.css</span></div>
                <div>从webpack更换成 <a href="https://turbo.build" target='_blank'>Turborepo</a></div>
            </div>
        </>
    )
}