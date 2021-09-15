import * as React from "react";
import { Table, TableProps } from "antd";
import "./index.css";
import { Users } from "../Search";
import dayjs from "dayjs";

interface Projects {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Projects> {
  users: Users[];
}

export default function List({ users, ...props }: ListProps) {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },

        {
          title: "部门",
          dataIndex: "organization",
          sorter: (a, b) => a.organization.localeCompare(b.organization),
        },

        {
          title: "负责人",
          render(value, item) {
            return (
              <span>
                {users.find((user: Users) => user.id === item.personId)?.name ||
                  "没有数据"}
              </span>
            );
          },
        },

        {
          title: "创建时间",
          render(value, item) {
            return (
              <span>
                {item.created
                  ? dayjs(item.created).format("YYYY--MM--DD")
                  : "没有数据"}
              </span>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
}
