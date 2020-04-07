import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Typography, Divider, Badge, Menu, Card, Avatar } from "antd";
import _ from "lodash";
import Deployable from "./Deployable";

const { Title, Paragraph, Text } = Typography;
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

const Products = ({ deployables, products, product }) => {
  const [deployable, setDeployable] = useState();
  const [current, setCurrent] = useState(product.deployables[0]);
  const [color, setColor] = useState(ColorList[0]);

  console.log(current);

  // Handle switching deployables
  const handleClick = (e) => {
    console.log(e);
    var specific_deployable = deployables.map((deploy) => {
      if (deploy.name === e.key) {
        setDeployable(deploy);
      }
    });
    setCurrent(e);
  };

  // Initiate deployable for Deployable.js component
  if (!deployable) {
    var specific_deployable = deployables.map((deploy) => {
      if (deploy.name === product.deployables[0]) {
        setDeployable(deploy);
      }
    });
  }

  const Activity = () => {
    switch (product.state) {
      case "active":
        return <Badge status="success" />;
      default:
        return <Badge status="default" />;
    }
  };

  // console.log(product.deployables[0], product.deployables);

  return (
    <Wrapper>
      <div className="product-information">
        <Typography>
          <Title level={4} className="product-title">
            <Activity />
            {product.product_name}
          </Title>
          <Paragraph style={{ marginLeft: "14px" }}>
            {product.organization_name}
          </Paragraph>
        </Typography>
      </div>
      <div style={{ marginTop: "20px" }}></div>
      <Title level={4} className="product-subtitle">
        Tenants
      </Title>
      <div className="tenants">
        {product.tenants.map((tenant) => (
          <div className="tenant-information">
            <Avatar icon={<UserOutlined />} />
            <div style={{ marginLeft: "8px" }}>{tenant}</div>
          </div>
        ))}
      </div>
      <Divider />
      <Title level={4} className="product-subtitle">
        Deployables
      </Title>
      <div>
        {product.deployables[0] ? (
          <Menu
            onClick={handleClick}
            defaultSelectedKeys={current}
            defaultOpenKeys={current}
            className="product-menu"
            mode="horizontal"
          >
            {product.deployables.map((depl) => (
              <Menu.Item key={depl}>{depl}</Menu.Item>
            ))}
          </Menu>
        ) : (
          <Menu
            onClick={handleClick}
            className="product-menu"
            mode="horizontal"
          >
            <Menu.Item>No Deployables</Menu.Item>
          </Menu>
        )}
      </div>
      {deployable ? <Deployable deployable={deployable} /> : <div></div>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .card {
    width: 300px;
    margin: 20px;
    box-shadow: 2px 2px 6px 0px gainsboro;
  }
  .product-menu {
    .ant-menu-item {
      color: #ff7f50;
      :hover {
        border-bottom: 2px solid #ff7f50;
      }
    }
    .ant-menu-item-selected {
      border-bottom: 2px solid #ff7f50;
    }
  }
  .product-title {
    display: flex;
    color: #212121;
    align-items: center;
  }
  .product-subtitle {
    display: flex;
    font-size: 16px;
    margin-top: 10px;
    padding-bottom: 10px;
    margin-left: 10px;
    color: #212121;
    align-items: center;
  }
  .product-information {
    display: flex;
    background-color: #ffd4c4;
    width: 100%;
    padding: 20px;
  }
  .tenants {
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;
  }
  .tenant-information {
    display: flex;
    margin-right: 10px;
    margin-bottom: 10px;
    align-items: center;
  }
`;

export default Products;
