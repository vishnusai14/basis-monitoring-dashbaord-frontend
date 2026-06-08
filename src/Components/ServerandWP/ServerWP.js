import React, { useEffect, useState } from "react";
import { Modal, Table, Row, Col, Card } from "antd";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const ServerWP = ({ server, wpDetails }) => {
    const grouped = wpDetails.reduce((acc, wp) => {
        if (!acc[wp.WP_TYP]) acc[wp.WP_TYP] = [];
        acc[wp.WP_TYP].push(wp);
        return acc;
    }, {});

    const chartData = Object.entries(grouped).map(([type, list]) => {
        const total = list.length;
        const used = list.filter(wp => wp.WP_STATUS !== "Waiting").length;
        const free = total - used;

        return {
            type,
            data: {
                labels: ["Used", "Free"],
                datasets: [
                    {
                        data: [used, free],
                        backgroundColor: ["#f44336", "#4caf50"],
                    },
                ],
            },
            usedList: list.filter(wp => wp.WP_STATUS !== "Waiting"),
        };
    });


    return (
        <Row gutter={16}>
            {chartData.map(({ type, data, usedList }) => (
                <Col span={12} key={type}>
                    <Card title={`Work Process: ${type}`}>
                        <div style={{ width: 200, height: 200, margin: "0 auto" }}>
                            <Pie data={data} options={{ maintainAspectRatio: false }} />
                        </div>
                        <Table
                            dataSource={usedList}
                            rowKey="WP_PID"
                            columns={[
                                { title: "PID", dataIndex: "WP_PID" },
                                { title: "Status", dataIndex: "WP_STATUS" },
                                { title: "Report", dataIndex: "WP_REPORT" },
                                { title: "User", dataIndex: "WP_BNAME" },
                            ]}
                            pagination={false}
                            size="small"
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};
export default ServerWP;
