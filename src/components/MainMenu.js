import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      className="main-menu"
    >
      <Menu.Item>
        <Link to="/">Inicio</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/netflix">Netflix</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/tareas">Tareas</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/acerca-de">Acerca de...</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MainMenu;
