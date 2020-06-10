import React from 'react'
import {Button, InputItem, Toast, WhiteSpace, WingBlank} from 'antd-mobile'
import {routerRedux} from 'dva/router'
import {createForm, formShape} from 'rc-form'
import {connect} from 'dva'
import styles from "../assets/css/home.less"
import {Header} from '../components/header'


class loginPage extends React.Component {

  // static propTypes = {
  //   form: formShape,
  // };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      this.login(value)

    });
  }


  //协议模版查询
  login = (value) => {
    let type = 'app/login'
    this.props.dispatch({
      type,
      payload: value,
    }).then(res => {
      if (res.data.code === 200) {
        this.props.dispatch(routerRedux.push('/'))
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
              placeholder="138 0000 0000"
            >手机号码</InputItem>
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
