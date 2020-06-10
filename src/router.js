import React from 'react';
import { Router, HashRouter, Route, Switch } from 'dva/router';
import Loadable from 'react-loadable'; 
import dynamic from 'dva/dynamic'; // 异步加载路由
import {base} from './defaultSetting'

const AsyncIndex = Loadable({
  timeout: 3000,
  loading () {
    return <div>loading....</div>
  },
  loader: () => import('./routes/homePage')
})

function RouterConfig({ history, app }) {
  // 登录
  const loginPage = dynamic({
    app,
    component: () => import('./routes/loginPage')
  })
  // 首页，主菜单
  const homePage = dynamic({
    app,
    component: () => import('./routes/homePage')
  })
  // 个人信息
  const infoPage = dynamic({
    app,
    component: () => import('./routes/infoPage')
  })
  // 协议页面
  const agreementPage = dynamic({
    app,
    component: () => import('./routes/agreementPage')
  })
  // 签署页面
  const signPage = dynamic({
    app,
    component: () => import('./routes/signPage')
  })
  // 结果页
  const resultPage = dynamic({
    app,
    component: () => import('./routes/resultPage')
  })
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={homePage}/>
        <Route path="/login" exact component={loginPage}/>
        <Route path="/info" exact component={infoPage}/>
        <Route path="/agreement" exact component={agreementPage}/>
        <Route path="/sign" exact component={signPage}/>
        <Route path="/result" exact component={resultPage}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
