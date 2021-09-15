import React, { Fragment, useState } from "react";
import Login from "./login";
import { Register } from "./register";
import { Button } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import "./index.css";
import styled from "@emotion/styled";
import left from "../assets/left.svg";
import right from "../assets/right.svg";

export const UnAuthenicatedApp = () => {
  const [isRegister, setIsRehister] = useState(false);

  return (
    <Container>
      <Backgroud></Backgroud>
      {isRegister ? <Register></Register> : <Login></Login>}
      <Button
        className="changeBtn"
        type="primary"
        shape="round"
        icon={isRegister ? <LeftCircleOutlined /> : <RightCircleOutlined />}
        size="large"
        ghost={true}
        onClick={() => {
          setIsRehister(!isRegister);
        }}
      >
        {isRegister ? "已经有账号了？直接登录" : "没有账号？去注册一个"}
      </Button>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Backgroud = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
