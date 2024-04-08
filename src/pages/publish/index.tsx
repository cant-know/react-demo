/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import { getArticleById, postCreateArticleAPI, updateArticleById } from '../../apis/article'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { SetStateAction, useEffect, useState } from 'react'

import type { RadioChangeEvent } from 'antd/es/radio'
import { useChannel } from '../../hooks/useChannel'

const { Option } = Select

const Publish = () => {

  const channelList = useChannel()

  const onFinish = (formData: { title: string; channel_id: string; content: string }) => {
    const {title, channel_id, content} = formData
    const reqData = {
      title,
      content,
      channel_id,
      cover: {
        type: imageType, //封面模式
        images: fileList.map(item => {
          if(item.response){
            return item.response.data.url
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return item.url
          }
        }) //图片列表
      }
    }
    if(articleId){
      updateArticleById({...reqData,id: articleId})
    } else {
      postCreateArticleAPI(reqData)
    }
  }

  const [fileList, setFileList] = useState([{response:{data:{url:''}}}])
  const onUploadChange = (value: { fileList: SetStateAction<{ response: { data: { url: string } } }[]> }) => {
    setFileList(value.fileList)
    console.log(value, 'value')
    console.log(fileList, '11')
  }

  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e: RadioChangeEvent) => {
    setImageType(e.target.value)
  }

  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()
  useEffect(() => {
    const getArticleDetail = async () => {
      const res = await getArticleById(articleId as string)
      form.setFieldValue(null,{
        ...res.data.data,
        type: res.data.data.cover.type
      })
      setImageType(res.data.data.cover.type)
      setFileList(res.data.data.cover.images.map((url:string) => {
        return { url }
      }))
    }
    if(articleId){
      getArticleDetail()
    }
  },[articleId,form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '编辑' : '创建'}文章` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          name='form'
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* @ts-ignore */}
            {imageType > 0 && <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                maxCount={imageType}
                fileList={fileList}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange={onUploadChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* pnpm i react-quill@2.0.0-beta.2 */}
            {/* 严格模式下富文本编辑器会出现两次 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish