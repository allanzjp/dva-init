import React from 'react'
import {Card, Flex, Toast, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Footer, Header, PlaceHolder} from '../components/header'
import styles from "../assets/css/home.less"

class agreementPage extends React.Component {

  state = {
    rows: [],
    info: {},
  };

  submit = (id) => {
    if(!this.state.info.bankName || !this.state.info.cardNum) {
      Toast.info("银行卡或身份证信息不完整，请前往我的信息中完善。")
      return;
    }

    console.log(id)
    let type = '/sign'
    let data = {id: id}
    this.props.dispatch(
      routerRedux.push(
        type, data
      )
    )
  }

  componentDidMount() {
    this.agreement_query()
  }

  //协议模版查询
  agreement_query = () => {
    let pageData = {
      pageNum: 1,
      pageSize: 100,
    };

    let type = 'app/agreements'
    this.props.dispatch({
      type,
      payload: {...pageData},
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          rows: res.data.rows,
        });
        this.info_query()
      }
    })
  };

  info_query = () => {
    let type = 'app/employeeInfo'
    this.props.dispatch({
      type,
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          info: res.data.data,
        });
      }
    })
  }

  render() {
    // const {rows} = this.state;
    const ListItems = this.state.rows.map((item, index) =>
      <WingBlank size="lg" key={item.id}>
        <WhiteSpace size="lg"/>
        <Card className={styles["agreement-card"]}>
          <Card.Header title="文德数慧科技有限公司" style={{fontSize: '16px'}}/>
          <Card.Body className={styles["agreement-card-body"]}>
            <Flex>
              <Flex.Item><PlaceHolder content={'状态'}/></Flex.Item>
              <Flex.Item><PlaceHolder content={item.signStatusDesc}/></Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item><PlaceHolder content={'合同期限'}/></Flex.Item>
              <Flex.Item><PlaceHolder content={`${item.tplExpireYear} 年`}/></Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item><PlaceHolder content={'合同名称'}/></Flex.Item>
              <Flex.Item><PlaceHolder content={item.templateName}/></Flex.Item>
            </Flex>
            <Flex>
              <Flex.Item><PlaceHolder content={'合同编号'}/></Flex.Item>
              <Flex.Item><PlaceHolder content={item.contractNo}/></Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Footer extra={item.signStatus === 0 ?
            <PlaceHolder content={'立即签署'} className={styles["sign-font"]} onClick={() => {this.submit(item.id)}}/>
            : <a href={item.contractFilePath} target="root">点击查看(点击下载)</a>}
          />
        </Card>
      </WingBlank>
    );

    return (
      <div className={styles['animate-route']}>
        <Header/>
        {ListItems.length===0?<WingBlank><Card className={styles["sign-card"]}><PlaceHolder className={styles.fontCenter} content="暂无数据"/></Card></WingBlank>:ListItems}
        <Footer/>
      </div>
    )
  }
}

export default connect()(agreementPage)
