import { Layout, Row, Col, Select } from "antd";
import React, { useEffect, useState } from "react";
const { Header } = Layout;



const DashboardHeader = () => {

    const [refreshInterval, setRefreshInterval] = useState(30000);

    return (

        <Header style={{ color: "white", fontSize: "20px" }}>
            <Row justify="space-between" align="middle">
                <Col>SAP Monitoring Dashboard</Col>
            </Row>
        </Header>
    )
}
export default DashboardHeader;