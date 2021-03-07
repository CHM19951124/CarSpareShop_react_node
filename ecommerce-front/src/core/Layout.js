import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <img src={"/mark1.png"}></img>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
