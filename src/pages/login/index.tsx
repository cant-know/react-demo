import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '../../assets/react.svg'
import { useDispatch } from 'react-redux'
import { reqLogin } from '../../store/modules/user';
import { useNavigate } from 'react-router-dom'

export type FieldType = {
  mobile?: string;
  code?: string;
};

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = (values: FieldType) => {
    dispatch(reqLogin(values) as never)
    navigate('/')
    message.success('登录成功')
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={onFinish}validateTrigger="onBlur">
        <Form.Item<FieldType>
          name="mobile"
          rules={[
            { required: true, message: '请输入手机号!' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确!' }
          ]}
        >
          <Input placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item<FieldType>
          name="code"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input placeholder='246810' />
        </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login