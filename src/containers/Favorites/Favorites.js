import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Typography } from 'antd'
import { EditOutlined, DeleteOutlined} from '@ant-design/icons'

import AddFavoriteModal from '../../components/AddFavoriteModal/AddFavoriteModal'

import './Favorites.less'

// STORE
import { observer } from 'mobx-react'
import { layoutStore } from 'storages'

const { Title } = Typography
const SEARCH_STATE = {
  text: null,
  name: null,
  maxResult: 12
}

const Favorites = () => {
  const [videosState, setVideosState] = useState(SEARCH_STATE)
  const { getSavedResult, isOpenFavoriteModal, getSaveState } = layoutStore
  console.log(getSavedResult);
  const removeSaveItem = (index) => {
    layoutStore.removeSearchItem(index)
  }

  const doSearch = (item, index) => {
    setVideosState({...item, index})
    toggleOpenModal(true)
  }

  const toggleOpenModal = (value) => {
    layoutStore.toggleIsOpenFavoriteModal(value)
  }

  const onSave = () => {
    toggleOpenModal(false)
    layoutStore.updateSearchItems(videosState)
  }

  return (
    <div className='page--favorites'>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2}>
            Избранное
          </Title>
        </Col>
        {
          getSavedResult.length === 0 && (
            <Col span={24}>
              В сохраненном пусто :(
            </Col>
          )
        }
        <Col span={24}>
          {
            getSavedResult.map((item, index) => (
              <Col span={20}>
                <div className='item-content'>
                  <div className='favorites-cart'>
                    <div className='favorites-cart__title'>
                      {item.name}
                    </div>
                    <div className='favorites-cart__control'>
                      <Button onClick={() => layoutStore.setSearchState(item)}>
                        <Link to='/home'>
                          Выполнить
                        </Link>
                      </Button>
                      <Button
                        icon={<EditOutlined />}
                        type='primary'
                        onClick={() => doSearch(item, index)}
                      />
                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => removeSaveItem(index)}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            ))
          }
        </Col>
      </Row>

      <AddFavoriteModal
        type='change'
        isOpen={isOpenFavoriteModal}
        onClose={() => toggleOpenModal(false)}
        onOk={onSave}
        state={videosState}
        setState={setVideosState}
      />
    </div>
  )
}

export default observer(Favorites)