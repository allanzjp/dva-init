import React from 'react'
import {Card, Flex, Toast, List, Radio, Picker, Button, WingBlank, WhiteSpace, TextareaItem} from 'antd-mobile'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Header, PlaceHolder} from '../components/header'
import {createForm} from 'rc-form'
import formShape from "rc-form/es/propTypes"
import styles from "../assets/css/home.less"

const genders = [{label: '男', value: 0}, {label: '女', value: 1}]

class agreementPage extends React.Component {

  state = {
    rows: [],
  };

  submit = (id) => {
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
      employeeId: 11,
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
      } else {
        Toast.fail(res.data.msg)
      }
    })
  };

  render() {
    // const {rows} = this.state;
    const ListItems = this.state.rows.map((item, index) =>
      <WingBlank size="lg" key={item.id}>
        <WhiteSpace size="lg"/>
        <Card className={styles["agreement-card"]}>
          <Card.Header title="文德数慧科技有限公司" style={{fontSize: '16px'}} // extra={<span>this is extra</span>}
          />
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
          <Card.Footer
            extra={<PlaceHolder content={'立即签署'} className={styles["sign-font"]} onClick={() => {this.submit(item.id)}}/>}/>
        </Card>
      </WingBlank>
    );

    return (
      <div className={styles['animate-route']}>
        <Header/>
        {ListItems}
      </div>
    )
  }
}

export default connect()(agreementPage)
