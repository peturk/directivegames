import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Menu, Badge, Spin } from "antd";
import { CodeSandboxOutlined } from "@ant-design/icons";
import Product from "./Product";
import _ from "lodash";
import "./App.css";

const { SubMenu } = Menu;

const App = () => {
  const [deployables, setDeployables] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [current, setCurrent] = useState();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://devnorth.dg-api.com/api-router/");
      const data = await response.json();
      setDeployables([...data.deployables]);
      setProducts([...data.products]);
      setProduct([...data.products][0]);
    }
    fetchData();
  }, []);

  const handleClick = (e) => {
    var specific_product = products.map((prod) => {
      if (prod.product_name === e.key) {
        setProduct(prod);
      }
    });
    setCurrent(e);
  };

  if (!products[0]?.product_name || !product || !deployables) {
    return <Spin className="spin" />;
  }

  const Activity = (e) => {
    switch (e.state) {
      case "active":
        return <Badge status="success" />;
      default:
        return <Badge status="default" />;
    }
  };

  return (
    <Wrapper>
      <Menu
        onClick={handleClick}
        className="menu"
        defaultSelectedKeys={[products[0]?.product_name]}
        defaultOpenKeys={[products[0]?.product_name]}
        mode="inline"
      >
        <SubMenu
          key={[products[0]?.product_name]}
          title={
            <span>
              <CodeSandboxOutlined />
              <span>Products</span>
            </span>
          }
        >
          {products.map((product) => (
            <Menu.Item key={[product.product_name]}>
              {console.log(product)}
              <Activity state={product.state} /> {product.product_name}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      <Product
        key={product.product_name}
        deployables={deployables}
        products={products}
        product={product}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  .spin {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }
  .menu {
    width: 256px;
    height: 100vh;
    .ant-menu-submenu-title {
      color: #ff7f50;
    }
    .ant-menu-item {
      color: #ff7f50;
      ::after {
        border-right: 3px solid #ff7f50;
      }
    }
    .ant-menu-item-selected {
      background-color: #fff6f5;
    }
    .ant-menu-submenu-vertical
      > .ant-menu-submenu-title:hover
      .ant-menu-submenu-arrow::after,
    .ant-menu-submenu-vertical-left
      > .ant-menu-submenu-title:hover
      .ant-menu-submenu-arrow::after,
    .ant-menu-submenu-vertical-right
      > .ant-menu-submenu-title:hover
      .ant-menu-submenu-arrow::after,
    .ant-menu-submenu-inline
      > .ant-menu-submenu-title:hover
      .ant-menu-submenu-arrow::after,
    .ant-menu-submenu-vertical
      > .ant-menu-submenu-title:hover
      .ant-menu-submenu-arrow::before,
    .ant-menu-submenu-vertical-left
      > .ant-menu-submenu-title:hover
      .ant-menu-submenu-arrow::before,
    .ant-menu-submenu-vertical-right
      > .ant-menu-submenu-title:hover
      .ant-menu-submenu-arrow::before,
    .ant-menu-submenu-inline
      > .ant-menu-submenu-title:hover
      .ant-menu-submenu-arrow::before {
      background: #ff7f50;
    }
  }
`;

export default App;
