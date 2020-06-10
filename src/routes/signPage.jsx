import React from 'react'
import styles from "../assets/css/home.less"
import {Button, Card, Flex, Toast, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Header, PlaceHolder, formatSearch} from '../components/header'


class signPage extends React.Component {
  state = {
    id: '',
    record: {},
    info: {},
  };

  componentDidMount() {
    let tmpId = ''
    if(this.props.location.state) {
      tmpId = this.props.location.state.id
    } else {
      let {search} = this.props.location
      let searchMap = formatSearch(search)
      tmpId = Number(searchMap.id)
    }

    this.setState({
      id: tmpId
    })
    this.sign_record_query(tmpId)
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
        // Toast.fail(res.data.msg)
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
    let {origin, pathname} = window.location
    // let {pathname} = this.props.location
    // console.log(pathname)
    let type = 'app/getAuthUrl'
    this.props.dispatch({
      type,
      payload: {
        returnUrl: origin + pathname + '?id=' + this.state.id,
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
    if(this.state.record.isAuth==='N'){
      Toast.fail("请先完成个人认证再进行电签")
    }

    let {pathname} = this.props.location
    let {contractNo} = this.state.record
    let type = 'app/getSignUrl'
    this.props.dispatch({
      type,
      payload: {
        returnUrl: origin + '/agreement',
        contractNo: contractNo,
      }
    }).then(res => {
      if (res.data.code === 200) {
        window.location.href = res.data.url
      } else {
        // Toast.fail(res.data.msg)
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
            <PlaceHolder content={`证件类型: ${this.state.info.cardType===1?'身份证':'其他证件类型'}`}/>
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
                {this.state.record.isAuth==='N'?<PlaceHolder className={styles["sign-font"]} content={`去认证`} onClick={() => {this.goAuth()}}/>:''}
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
