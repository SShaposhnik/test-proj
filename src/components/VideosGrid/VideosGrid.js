import React, { useState } from 'react'
import { Row, Col, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import cx from 'classnames'

import { IconGrid, IconBurger } from 'components/icons'

import './VideosGrid.less'

const loader = <LoadingOutlined style={{ fontSize: 100 }} spin />

const VideosGrid = props => {
  const {
    loading = true,
    videos,
    text
  } = props

  const [activeGridType, setActiveGridType] = useState('lines')

  if (loading) {
    return (
      <div className='videogrid-loader'>
        {loader}
      </div>
    )
  }

  return (
    <Row gutter={[24, 24]} style={{display: !videos && 'none', width: '100%'}}>
      <Col span={12}>
          Видео по запросу <strong>"{text}"</strong>
      </Col>
      <Col span={12} className='grid-options-btn'>
        <Button
          className={cx(
            'btn', {
              'active-type': activeGridType === 'lines'
            }
          )}
          onClick={() => setActiveGridType('lines')}
        >
          <IconBurger width={24} heiht={24}/>
        </Button>
        <Button
          className={cx(
            'btn', {
              'active-type': activeGridType === 'grid'
            }
          )}
          onClick={() => setActiveGridType('grid')}
        >
          <IconGrid width={20} heiht={20}/>
        </Button>
      </Col>
      {
        videos?.map(video => (
          <Col
            span={activeGridType === 'grid' ? 6 : 24}
            className='flex jcc'
          >
            <div
              className={cx(
              'videos-cart', {
                'lines-type': activeGridType === 'lines'
              }
            )}
            >
              <div className='videos-cart__image'>
                <img
                  className='img'
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.thumbnails.title}
                />
              </div>
              <div className='videos-cart__content'>
                <div className='videos-cart__content_title'>
                  <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target='_blank'>
                    {video.snippet.title}
                  </a>
                </div>
                <div className='videos-cart__content_description'>
                  {video.snippet.description}
                </div>
              </div>
            </div>
          </Col>
        ))
      }
    </Row>
  )
}

export default VideosGrid