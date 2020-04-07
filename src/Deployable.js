import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HeartOutlined } from "@ant-design/icons";
import { Typography, Divider, Badge, Menu, Card } from "antd";
import _ from "lodash";

const { Title, Paragraph, Text } = Typography;

const Deployable = ({ deployable }) => {
  const Activity = (e) => {
    switch (e.status) {
      case "online":
        return <Badge status="success" />;
      default:
        return <Badge status="default" />;
    }
  };

  return (
    <Wrapper>
      <div className="site-card-border-less-wrapper">
        <Card title="Name" bordered={false} className="card">
          <p style={{ margin: "4px" }}>{deployable.name}</p>
        </Card>
      </div>
      <div className="site-card-border-less-wrapper">
        <Card title="Api" bordered={false} className="card">
          <p style={{ margin: "4px" }}>{deployable.api}</p>
        </Card>
      </div>
      <div className="site-card-border-less-wrapper">
        <Card title="Active" bordered={false} className="card">
          <p style={{ margin: "4px" }}>
            {deployable.is_active ? "true" : "false"}
          </p>
        </Card>
      </div>
      <div className="site-card-border-less-wrapper">
        <Card title="Requires Api Key" bordered={false} className="card">
          <p style={{ margin: "4px" }}>
            {deployable.requires_api_key ? "true" : "false"}
          </p>
        </Card>
      </div>
      <div className="site-card-border-less-wrapper">
        <Card title="Servers" bordered={false} className="card">
          {deployable.upstream_servers.map((upstream) =>
            upstream.map((server) => (
              <div className="p" key={server.address}>
                <Activity status={server.status} /> {server.address}
                <div className="border">{server.version} </div>
                <div className="border">
                  <HeartOutlined />
                  <div className="space">{server.health}</div>
                </div>
              </div>
            ))
          )}
        </Card>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .card {
    width: 300px;
    height: 140px;
    box-shadow: 2px 2px 6px 0px gainsboro;
    margin: 20px;
  }
  .p {
    display: flex;
    margin: 4px;

    align-items: center;
  }
  .border {
    display: flex;
    font-size: 0.8em;
    margin-left: 15px;
    align-items: center;
    color: #a9a9a9;
    border-radius: 12px;
    border: 2px solid gainsboro;
    padding: 6px;
  }
  .space {
    margin-left: 4px;
  }
`;

export default Deployable;
