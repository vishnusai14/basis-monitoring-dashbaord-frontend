import React, { useEffect, useState } from "react";
import { Modal, Table, Row, Col, Card } from "antd";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const ServerWP = ({ server, wpDetails }) => {
    const grouped = wpDetails.reduce((acc, wp) => {
        if (!acc[wp.WpTyp]) acc[wp.WpTyp] = [];
        acc[wp.WpTyp].push(wp);
        return acc;
    }, {});

    const chartData = Object.entries(grouped).map(([type, list]) => {
        const total = list.length;
        const used = list.filter(wp => wp.WpStatus !== "Waiting").length;
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
            usedList: list.filter(wp => wp.WpStatus !== "Waiting"),
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
                            rowKey="WpPid"
                            columns={[
                                { title: "PID", dataIndex: "WpPid" },
                                { title: "Status", dataIndex: "WpStatus" },
                                { title: "Report", dataIndex: "WpReport" },
                                { title: "User", dataIndex: "WpBname" },
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
