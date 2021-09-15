import React from "react";
import { Form, Input, Button, Card, Divider } from "antd";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import logo from "../assets/logo.svg";
import "./index.css";

export default function Login() {
  // 使用自定义hooks获取登录方法和用户信息
  const { onLogin, user } = useAuth();

  // 表单验证方法
  const onFinish = (values: any) => {
    console.log("Success:", values);
    const { username, password } = values;

    // 调用登录方法
    onLogin({ username, password });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card style={{ width: 500 }} bordered={false}>
      <Header></Header>
      <MyH1>登录</MyH1>
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

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="loginBtn"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
const MyH1 = styled.h1`
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 3rem 0;
  background-size: 8rem;
  width: 100%;
`;
