import * as qs from "qs";
import List from "./List";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Card, Typography } from "antd";

import { cleanObj } from "../../utils/index";
import { useDebounce, useMount } from "utils/customHook";
import { useHttp } from "utils/http";

const BigList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<null | Error>(null);

  // 从封装好的useHttphooks中获取http封装好的请求方法;
  const https = useHttp();

  // 函数的防抖
  const debanceParams = useDebounce(params, 500);

  useEffect(() => {
    setIsLoading(true);
    https("projects", { data: cleanObj(debanceParams) })
      .then(setList)
      .catch(setErr)
      .finally(() => {
        setIsLoading(false);
      });
  }, [debanceParams]);

  useMount(() => {
    https("users").then(setUsers);
  });

  return (
    <div>
      <Card hoverable>
        <Search users={users} params={params} setParams={setParams}></Search>
        {/* {err ? (
          <Typography.Text type={"danger"}>{err.message}</Typography.Text>
        ) : null} */}
        <List users={users} dataSource={list} loading={isLoading}></List>
      </Card>
    </div>
  );
};

export default BigList;
