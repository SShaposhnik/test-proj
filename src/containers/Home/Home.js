import React, { useEffect, useState } from 'react'
import {
  Typography,
  Row,
  Col,
  Input,
  Button,
  notification
} from 'antd'
import cx from 'classnames'

import VideosGrid from '../../components/VideosGrid/VideosGrid'
import AddFavoriteModal from '../../components/AddFavoriteModal/AddFavoriteModal'
import { IconFavorite } from 'components/icons'

import { YoutubeService } from 'services'

import './Home.less'

// STORE
import { observer } from 'mobx-react'
import { layoutStore } from 'storages'

const { Title } = Typography
const SEARCH_STATE = {
  text: null,
  name: null,
  maxResult: 12
}

const Home = props => {

  const { loadSavedResult, isOpenFavoriteModal } = layoutStore

  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState(null)
  const [videosState, setVideosState] = useState(SEARCH_STATE)
  console.log(videosState);
  const getVideos = async () => {
    setLoading(true)

    try {
      const { data: { items } } = await YoutubeService.getVideos({
        ...videosState,
        apiKey: process.env.REACT_APP_YOUTUBE_API_KEY
      })

      setVideos(items)

      layoutStore.saveSearch(videosState)
    } catch (error) {
      notification.error({
        message: 'Ошибка при получении видео'
      })
    }

    setLoading(false)
  }

  const changeHandler = (event) => {
    const { target: { value }} = event

    setVideosState(prev => ({
      ...prev,
      text: value
    }))
  }

  const toggleOpenModal = (value) => {
    layoutStore.toggleIsOpenFavoriteModal(value)
  }

  const onSave = () => {
    toggleOpenModal(false)
    layoutStore.saveSearch(videosState)
  }

  const suffix = (
    <Button type='text' onClick={() => toggleOpenModal(true)}>
      <IconFavorite width={20} height={20} fill='blue'/>
    </Button>
  )

  return (
    <div
      className={cx(
        'page--home', {
          'filling-data-results': videos
        }
      )}
    >
      <Row className='page--home__title'>
        <Col span={24} align='center'>
          <Title level={2}>
            Поиск видео
          </Title>
        </Col>
      </Row>
      <Row className='page--home__search-block'>
        <Col className='search'>
          <Input
            className='input'
            placeholder='Что хотите посмотреть?'
            onChange={changeHandler}
            suffix={suffix}
          />
        </Col>
        <Col className='btn'>
          <Button
            type='primary'
            onClick={getVideos}
            disabled={loading || !videosState.text}
          >
            Найти
          </Button>
        </Col>
      </Row>
      <VideosGrid
        videos={videos}
        loading={loading}
        text={videosState.text}
      />

      <AddFavoriteModal
        isOpen={isOpenFavoriteModal}
        onClose={() => toggleOpenModal(false)}
        onOk={onSave}
        state={videosState}
        setState={setVideosState}
      />
    </div>
  )
}

export default observer(Home)