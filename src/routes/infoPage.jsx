import React from 'react'
import {Card, List, Radio, Picker, Button, WingBlank, WhiteSpace, TextareaItem} from 'antd-mobile'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Header} from '../components/header'
import {createForm} from 'rc-form'
import formShape from "rc-form/es/propTypes"
import styles from "../assets/css/home.less"

const genders = [{label: '男', value: 0}, {label: '女', value: 1}]

class bankPage extends React.Component {
  state = {
    gender: 0,
  };

  onChangeGender = (gender) => {
    this.setState({
      gender: gender,
    });
  };

  static propTypes = {
    form: formShape,
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      this.props.dispatch(routerRedux.push('/'))

      // if (!error) {
      //   const {dispatch} = this.props;
      //   dispatch({
      //     type: '/login',
      //     payload: {
      //       mobile: value.mobile,
      //       password: value.password,
      //     }
      //   }).then((res) => {
      //     console.log(res, "res");
      //     if (res && res.code !== 200) {
      //       const str = res.msg;
      //       if (this.state.modes < 3) {
      //         const modes = str.charAt(str.length - 1);
      //         this.setState({
      //           modes: modes,//  this.state.modes + 1
      //           msg: str
      //         })
      //       }
      //     }
      //   })
      // }
    });
  }

  render() {
    const {gender, value2, value3, value4} = this.state;

    return (
      <div className={styles['animate-route']}>
        <Header/>

        <WingBlank size="lg">

          <WhiteSpace size="lg"/>
          <Card className={styles.card}>
            <Card.Header
              title="银行卡信息"
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              // extra={<span>this is extra</span>}
            />
            <Card.Body className={styles.cardBody}>
              <div>6227524803198509</div>
            </Card.Body>
            <Card.Footer content="中国银行" extra={<div></div>}/>
          </Card>

          <WhiteSpace size="lg"/>
          <Card className={styles.card}>
            <Card.Header
              title="身份证号"
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              // extra={<span>this is extra</span>}
            />
            <Card.Body className={styles.cardBody}>
              <div>440961198912183970</div>
            </Card.Body>
          </Card>

          <WhiteSpace size={"xl"}/>
          <Picker
            data={genders}
            value={this.state.gender}
            cols={1}
            onChange={this.onChangeGender}
          >
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker>
        </WingBlank>


      </div>
    )
  }
}

export default connect()(createForm()(bankPage))
