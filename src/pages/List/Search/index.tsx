import * as React from "react";
import { Input, Select } from "antd";
import "./index.css";
const { Option } = Select;

export interface Users {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface SearchProps {
  users: Users[];
  params: {
    name: string;
    personId: any;
  };
  setParams: (params: SearchProps["params"]) => void;
}

export default function Search({ users, params, setParams }: SearchProps) {
  // 自定义方法区

  return (
    <Input.Group compact className="search">
      <Input
        style={{ width: "70%" }}
        value={params.name}
        placeholder="项目名称"
        prefix="$"
        size="large"
        allowClear
        onChange={(e) => {
          setParams({ ...params, name: e.target.value });
        }}
      />
      <Select
        placeholder="负责人"
        size="large"
        allowClear={true}
        onChange={(val) => {
          setParams({ ...params, personId: val });
        }}
      >
        {users.map((item) => (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </Input.Group>
  );
}
