import React from "react";
import { Form, Input, Button, Divider, Card } from "antd";
import { useAuth } from "context/auth-context";
import logo from "../assets/logo.svg";
import styled from "@emotion/styled";
import "./index.css";

export const Register = () => {
  // 使用自定义hooks获取登录方法和用户信息
  const { Register, user } = useAuth();
  // 表单验证方法
  const onFinish = (values: any) => {
    console.log("Success:", values);
    const { username, password } = values;

    // 调用登录方法
    Register({ username, password });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="card">
      <Card style={{ width: 500 }} className="mycard" bordered={false}>
        <Header></Header>

        <MyH1>注册</MyH1>
        <Divider></Divider>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="large"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="重复密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="loginBtn"
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
const MyH1 = styled.h1`
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 3rem 0;
  background-size: 8rem;
  width: 100%;
`;
