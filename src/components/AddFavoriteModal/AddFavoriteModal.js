import React, { useEffect } from 'react'
import { Modal, Input, Button, Row, Col, Slider, Form } from 'antd'

const AddFavoriteModal = props => {
  const {
    onClose,
    onOk,
    isOpen,
    state,
    setState,
    type = null
  } = props

  const [form] = Form.useForm()

  const changeHandlerName = (event) => {
    const {target: { value }} = event

    setState(prev => ({
      ...prev,
      name: value
    }))
  }

  const sliderHandler = (value) => {
    setState(prev => ({
      ...prev,
      maxResult: value
    }))
  }

  const changeHandlerText = ({ target: { value }}) => {
    setState(prev => ({
      ...prev,
      text: value
    }))
  }

  useEffect(() => {
    form.setFieldsValue({
      text: state.text,
      maxResult: state.maxResult,
      name: state.name
    })
  }, [state])

  const onFinish = () => {
    onOk()
  }

  return (
    <Modal
      title='Сохранить запрос'
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form
        name='favorite-modal'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label='Название'
          name='name'
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите имя',
            },
          ]}
        >
          <Input
            value={state.name}
            onChange={changeHandlerName}
          />
        </Form.Item>

        <Form.Item name='text' label='Запрос'>
          <Input
            readOnly={type ? false : true}
            onChange={changeHandlerText}
          />
        </Form.Item>

        <Form.Item
          label='Максимальное количество'
          name='maxResult'
        >
          <Slider
            min={0}
            max={50}
            onChange={sliderHandler}
          />
        </Form.Item>

        <Col style={{display: 'flex'}}>
          <Form.Item>
            <Button htmlType='button' onClick={onClose}>
              Отмена
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Сохранить
            </Button>
          </Form.Item>
        </Col>

      </Form>
    </Modal>
  )
}

export default AddFavoriteModal