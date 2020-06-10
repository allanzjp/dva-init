import React from 'react'
import {Card, Flex, List, Radio, Picker, Button, WingBlank, WhiteSpace, TextareaItem} from 'antd-mobile'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Header} from '../components/header'
import {createForm} from 'rc-form'
import formShape from "rc-form/es/propTypes"
import styles from "../assets/css/home.less"

const genders = [{label: '男', value: 0}, {label: '女', value: 1}]

const PlaceHolder = ({ className = '', content, ...restProps }) => (
  <div className={`${className} ${styles.placeholder}`} {...restProps}>{content}</div>
);

class agreementPage extends React.Component {
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
              title="文德数慧科技有限公司"
              // extra={<span>this is extra</span>}
            />
            <Card.Body className={styles["card-body"]}>
              <Flex>
                <Flex.Item><PlaceHolder className={styles["agreement-status"]} content={'状态'}/></Flex.Item>
                <Flex.Item><PlaceHolder content={'待签署'}></PlaceHolder></Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item><PlaceHolder content={'合同期限'}/></Flex.Item>
                <Flex.Item><PlaceHolder content={'3'}></PlaceHolder></Flex.Item>
              </Flex>
              <Flex>
                <Flex.Item><PlaceHolder content={'合同编号'}/></Flex.Item>
                <Flex.Item><PlaceHolder content={'3'}></PlaceHolder></Flex.Item>
              </Flex>
            </Card.Body>
            <Card.Footer extra={<div>待签署</div>}/>
          </Card>

        </WingBlank>


      </div>
    )
  }
}

export default connect()(createForm()(agreementPage))
