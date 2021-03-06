import React, { useEffect } from 'react'
import {
  Modal,
  Input,
  Button,
  Col,
  Slider,
  Form,
  Select
} from 'antd'

import { FILTERS } from 'constants/filterValue'
const { Option } = Select

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

  const nameChangeHandler = (event) => {
    const {target: { value }} = event

    setState(prev => ({
      ...prev,
      name: value
    }))
  }

  const sliderChangeHandler = (value) => {
    setState(prev => ({
      ...prev,
      maxResult: value
    }))
  }

  const textChangeHandler = ({ target: { value }}) => {
    setState(prev => ({
      ...prev,
      text: value
    }))
  }

  const selectChangeHandler = (value) => {
    setState(prev => ({
      ...prev,
      filter: value
    }))
  }

  useEffect(() => {
    form.setFieldsValue({
      text: state.text,
      maxResult: state.maxResult,
      name: state.name,
      filter: state.filter
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
            onChange={nameChangeHandler}
          />
        </Form.Item>

        <Form.Item
          name='text'
          label='Запрос'
        >
          <Input
            readOnly={!type}
            onChange={textChangeHandler}
          />
        </Form.Item>

        <Form.Item
          label='Максимальное количество'
          name='maxResult'
        >
          <Slider
            min={0}
            max={50}
            onChange={sliderChangeHandler}
          />
        </Form.Item>

        <Form.Item label='Сортировать по'>
          <Select
            value={state.filter}
            onChange={selectChangeHandler}
          >
            {
              FILTERS.map(filter => (
                <Option value={filter}>
                  {filter}
                </Option>
              ))
            }
          </Select>
        </Form.Item>

        <Col style={{display: 'flex', justifyContent: 'space-between'}}>
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