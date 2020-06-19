import React from 'react'
import {Button, InputItem, Toast, WhiteSpace, WingBlank} from 'antd-mobile'
import {routerRedux} from 'dva/router'
import {createForm} from 'rc-form'
import {connect} from 'dva'
import styles from "../assets/css/home.less"
import {Header} from '../components/header'


class loginPage extends React.Component {

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      this.login(value)
    });
  }

  //协议模版查询
  login = (value) => {
    let type = 'app/login'
    let returnUrl = this.props.location.state.returnUrl
    this.props.dispatch({
      type,
      payload: value,
    }).then(res => {
      if (res.data.code === 200) {
        this.props.dispatch(routerRedux.push(returnUrl))
      } else {
        Toast.fail(res.data.msg)
      }
    })
  };

  render() {
    const {getFieldProps} = this.props.form;

    return (
      <div className={styles["animate-route"]}>
        <Header/>
        <div>
          <WhiteSpace size={"xl"}/>
          <WingBlank size={"lg"}>
            <InputItem
              {...getFieldProps('username')}
              type="username"
              placeholder="V00000666"
            >账号</InputItem>
          </WingBlank>

          <WhiteSpace size={"xl"}/>
          <WingBlank size={"lg"}>
            <InputItem
              {...getFieldProps('password')}
              type="password"
              placeholder="****"
            >密码</InputItem>
          </WingBlank>

          <WhiteSpace size={"xl"}/>
          <WingBlank size={"lg"}>
            <Button type={"primary"} onClick={() => {
              this.submit()
            }}>登录</Button>
          </WingBlank>
        </div>
      </div>
    )
  }
}

export default connect()(createForm()(loginPage))
