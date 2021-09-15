import { useAuth } from "context/auth-context";
import React from "react";
import BigList from "./List";
import { Modal, Button, notification, Dropdown, Menu } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { ReactComponent as SoftWarelogo } from "../assets/software-logo.svg";
import "./index.css";

export default function AuthenicatedApp() {
  const { logout, user } = useAuth();

  const { confirm } = Modal;
  const onLogout = () => {
    confirm({
      title: "你确定要退出嘛？",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        logout();
        notification["success"]({
          message: "已退出",
        });
      },
      onCancel() {
        notification["success"]({
          message: "已取消退出",
        });
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item className="Item">
        <Button
          type="primary"
          danger={true}
          shape="round"
          size="large"
          onClick={onLogout}
        >
          登出按钮
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <MostContainer>
      <PageHeader>
        <Item>
          <SoftWarelogo
            width={"24rem"}
            color={"rgb(38,132,255)"}
          ></SoftWarelogo>
        </Item>
        <Item>项目</Item>
        <Item>用户</Item>

        <MyDropDown overlay={menu} placement="bottomCenter" arrow>
          <Item>你好！{user?.name}</Item>
        </MyDropDown>
      </PageHeader>

      <Main>
        <BigList></BigList>
      </Main>
    </MostContainer>
  );
}

const Item = styled.div`
  margin-right: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
`;

const MostContainer = styled.div`
  width: 1400px;
  height: 100vh;
`;

const MyDropDown = styled(Dropdown)`
  position: fixed;
  right: 60px;
  top: 60px;
`;

const PageHeader = styled.header`
  height: 6rem;
  background-color: blueviolet;
  box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.4);
  margin-top: 50px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  border-radius: 20px 20px 0 0;
`;

const Main = styled.main`
  height: calc(100vh-6rem);
  box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.4);
`;
