import React from 'react'
import styles from "../assets/css/home.less"
import {Button, Card, Flex, Toast, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Header, PlaceHolder} from '../components/header'


class signPage extends React.Component {
  state = {
    id: '',
    record: {},
    info: {},
  };

  componentDidMount() {
    let state = this.props.location.state
    this.sign_record_query(state.id)
  }

  sign_record_query = (id) => {
    let pageData = {
      pageNum: 1,
      pageSize: 100,
      id: id,
    };

    let type = 'app/agreement'
    this.props.dispatch({
      type,
      payload: {...pageData},
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          record: res.data.data,
        });
      } else {
        // Toast.fail(res.data.msg)
      }
    })

    type = 'app/employeeInfo'
    this.props.dispatch({
      type,
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          info: res.data.data,
        });
      } else {
        Toast.fail(res.data.msg)
      }
    })
  };

  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
      this.props.dispatch(routerRedux.push('/'))
    });
  }

  goAuth = () => {
    console.log('auth')
    let {pathname} = this.props.location
    let type = 'app/getAuthUrl'
    this.props.dispatch({
      type,
      payload: {
        returnUrl: pathname,
      }
    }).then(res => {
      if (res.data.code === 200) {
        window.location.href = res.data.url
      } else {
        Toast.fail(res.data.msg)
      }
    })
  }

  goSign = () => {
    console.log('goSign')
    let {pathname} = this.props.location
    let {contractNo} = this.state.record
    let type = 'app/getSignUrl'
    this.props.dispatch({
      type,
      payload: {
        returnUrl: pathname,
        contractNo: contractNo,
      }
    }).then(res => {
      if (res.data.code === 200) {
        window.location.href = res.data.url
      } else {
        Toast.fail(res.data.msg)
      }
    })
  }

  render() {
    return (
      <div className={styles['animate-route']}>
        <Header/>

        <WingBlank size="lg">
          <WhiteSpace size="lg"/>
          <Card className={styles["sign-card"]}>
            <PlaceHolder content={`合同编号: ${this.state.record.contractNo}`}/>
            <PlaceHolder content={`合同名称: ${this.state.record.templateName}`}/>
          </Card>

          <WhiteSpace size="lg"/>
          <Card className={styles["sign-card"]}>
            <PlaceHolder content={`姓名: ${this.state.record.employeeName}`}/>
          </Card>

          <WhiteSpace size="lg"/>
          <Card className={styles["sign-card"]}>
            <PlaceHolder content={`证件类型: ${this.state.info.cardType}`}/>
            <PlaceHolder content={`身份证号: ${this.state.info.cardNum}`}/>
          </Card>

          <WhiteSpace size="lg"/>
          <Card className={styles["sign-card"]}>
            <PlaceHolder content={`银行名称: ${this.state.info.bankName}`}/>
            <PlaceHolder content={`银行卡号: ${this.state.info.bankCard}`}/>
            <Flex>
              <Flex.Item>
                <PlaceHolder content={`身份认证`}/>
              </Flex.Item>
              <Flex.Item/>
              <Flex.Item/>
              <Flex.Item/>
              <Flex.Item>
                <PlaceHolder className={styles["sign-font"]} content={`去认证`} onClick={() => {
                  this.goAuth()
                }}/>
              </Flex.Item>
            </Flex>
          </Card>

          <WhiteSpace/>
          <Button onClick={() => this.goSign()}>开始电签</Button>
        </WingBlank>

      </div>
    )
  }
}

export default connect()(signPage)
