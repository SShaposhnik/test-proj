import React from 'react'
import { Form, Input, Button, Row, Col, notification} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Redirect } from 'react-router'

import { STORAGE_KEYS } from 'utils'
import authData from '../../authData.json'
// STORE
import { observer } from 'mobx-react'
import { authStore } from 'storages'

import './Auth.less'

const { AUTH } = STORAGE_KEYS
const Auth = props => {
  const {
    history
  } = props

  const { isAuth } = authStore

  const onFinish = (values) => {
    const { userName, password } = values
    const userData = authData.users.find(user => user.login === userName)

    if (!userData) {
      return notification.error({
        message: 'Такого пользователя не существует!'
      })
    }

    if (userData.password === password) {
      notification.success({
        message: `Здравствуйте ${userData.name}`
      })

      authStore.loginSuccess('12345', userData)
      history.push('/')
    } else {
      notification.error({
        message: 'Ошибка авторизации, пароль не верный'
      })
    }
  }

  if (isAuth) {
    return <Redirect to='/'/>
  }

  return (
    <Row align='center' justify='center'>
      <Col span={24}>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className='login-form__container'>
            <Form.Item
              name='userName'
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите имя пользователя',
                },
              ]}
            >
              <Input
                name='userName'
                prefix={<UserOutlined className='site-form-item-icon'/>}
                placeholder='Имя пользователя'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите пароль',
                },
              ]}
            >
              <Input
                name='password'
                prefix={<LockOutlined className='site-form-item-icon'/>}
                type='password'
                placeholder='Пароль'
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType='submit' className='login-form-button'>
                Войти
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

export default observer(Auth)