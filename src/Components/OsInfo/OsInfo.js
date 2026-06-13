import { useEffect, useState, useRef } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Col, Row, Progress, Table, Card, Statistic, Grid, Select, Space } from "antd";
import { Oscolumns, OsProcessColumn } from "../../utils/Tables/Columns/OsInfoColumn";
import { getOsInfo, getOsProcessInfo } from "../../serverFunction/serverFunctions";
import Spinner from "../Spinner/Spinner";



const OsInfo = () => {



    const cardStyle = {
        height: "100%",
        borderRadius: "12px",
    };

    const statisticStyle = {
        textAlign: "center",
    };

    const [loading, setLoading] = useState(true);
    const [osData, setOsData] = useState({});
    const [osProcessData, setOsProcessData] = useState([]);
    const [refreshInterval, setRefreshInterval] = useState(5000); // Default 5 seconds
    const intervalRef = useRef(null);
    const isFirstFetchRef = useRef(true);

    const { systemInfo, cpuInfo, memoryInfo, osInfo, currentLoadInfo, fsSizeInfo } = osData;


    const cpuLoadData = {
        labels: currentLoadInfo?.cpus.map((_, index) => `${index}`),
        datasets: [{
            label: 'CPU Load',
            data: currentLoadInfo?.cpus.map(cpu => parseFloat(cpu.load.toFixed(2))),
            backgroundColor: '#1890ff',
            borderColor: '#0050b3',
            borderWidth: 1,
        }],
    };

    const memoryUsageData = {
        labels: ['Used', 'Available'],
        datasets: [{
            data: [
                parseFloat(memoryInfo?.used / (1024 ** 3)).toFixed(2),
                parseFloat(memoryInfo?.free / (1024 ** 3)).toFixed(2),
            ],
            backgroundColor: ['#1890ff', '#52c41a'],
            borderColor: ['#0050b3', '#274a00'],
            borderWidth: 1,
        }],
    };

    const swapUsageData = {
        labels: ["Used", "Free"],
        datasets: [
            {
                data: [
                    parseFloat(((memoryInfo?.swapused || 0) / (1024 ** 3)).toFixed(2)),
                    parseFloat(((memoryInfo?.swapfree || 0) / (1024 ** 3)).toFixed(2)),
                ],
                backgroundColor: ["#1890ff", "#52c41a"],
                borderColor: ["#0050b3", "#274a00"],
                borderWidth: 1,
            },
        ],
    }


    const fsData = fsSizeInfo?.map(fs => ({
        key: fs.mount,
        mount: fs.mount,
        fs: fs.fs,
        type: fs.type,
        size: parseFloat(fs.size / (1024 ** 3)).toFixed(2),
        used: parseFloat(fs.used / (1024 ** 3)).toFixed(2),
        available: parseFloat(fs.available / (1024 ** 3)).toFixed(2),
        use: fs.use
    }));


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { display: true },
        },
    };


    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                align: "center",
            },
        },
    };



    const cpuLoadOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: "top", align: "center" },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    autoSkip: false
                },
                grid: {
                    display: false
                }
            },
            y: {
                 ticks: {
                    stepSize: 5
                }, 
                type: "linear", 
                beginAtZero: true,
                max: 100,
               

            },
        },
    };


    const fetchOsDatausingOdata = () => {
        if (isFirstFetchRef.current) {
            setLoading(true);
        }
        getOsInfo().then(res => {
            setOsData(res.data.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            if (isFirstFetchRef.current) {
                setLoading(false);
                isFirstFetchRef.current = false;
            }
            getOsProcessInfo().then(res2 => {
                setOsProcessData(res2.data?.data?.list);
            }).catch(err => {
                console.log(err);
            })
        })

    }

    // Cleanup interval on unmount
    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    // Handle initial fetch and set up auto-refresh
    useEffect(() => {
        fetchOsDatausingOdata();
        
        // Set up interval for auto-refresh
        intervalRef.current = setInterval(() => {
            fetchOsDatausingOdata();
        }, refreshInterval);

        // Cleanup previous interval when refreshInterval changes
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [refreshInterval]);

    return (
        loading ? <Spinner /> :
            <div style={{ padding: '24px', background: '#f0f2f5' }}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card title="Refresh Settings" style={cardStyle} bordered={false}>
                            <Space>
                                <span style={{ fontWeight: 'bold' }}>Refresh Interval:</span>
                                <Select
                                    value={refreshInterval}
                                    onChange={(value) => setRefreshInterval(value)}
                                    style={{ width: 200 }}
                                >
                                    <Select.Option value={5000}>5 seconds</Select.Option>
                                    <Select.Option value={10000}>10 seconds</Select.Option>
                                    <Select.Option value={30000}>30 seconds</Select.Option>
                                    <Select.Option value={60000}>1 minute</Select.Option>
                                    <Select.Option value={300000}>5 minutes</Select.Option>
                                </Select>
                            </Space>
                        </Card>
                    </Col>

                    <Col span={24}>
                        <Card title="System Information" style={cardStyle} bordered={false}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} md={6}>
                                    <Statistic title="OS" value={`${osInfo?.distro} ${osInfo?.release}`} />
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                    <Statistic title="Kernel" value={osInfo?.kernel} valueStyle={{ fontSize: '14px' }} />
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                    <Statistic title="Hostname" value={osInfo?.hostname} />
                                </Col>
                                <Col xs={24} sm={12} md={6}>
                                    <Statistic style={statisticStyle} title="Architecture" value={osInfo?.arch} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Row
                        gutter={[24, 24]}
                        justify="center"
                        align="stretch"
                        style={{ width: "100%" }}
                    >

                        {/* CPU INFO */}
                        <Col xs={24} sm={24} md={8} style={{ display: "flex" }}>
                            <Card
                                title="CPU Information"
                                bordered={false}
                                style={{
                                    width: "100%",
                                    borderRadius: "12px",
                                }}

                            >
                                <div
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        textAlign: "center",
                                        gap: "12px",
                                    }}
                                >
                                    <Statistic title="Cores" value={cpuInfo?.cores} />

                                    <Statistic
                                        title="Physical Cores"
                                        value={cpuInfo?.physicalCores}
                                    />

                                    <Statistic
                                        title="Speed"
                                        value={cpuInfo?.speed}
                                        suffix="GHz"
                                    />

                                    <Statistic
                                        title="Brand"
                                        value={cpuInfo?.brand}
                                        valueStyle={{
                                            fontSize: "18px",
                                        }}
                                    />
                                </div>
                            </Card>
                        </Col>

                        {/* SWAP INFO */}
                        <Col xs={24} sm={24} md={8} style={{ display: "flex" }}>
                            <Card
                                title="Swap Information"
                                bordered={false}
                                style={{
                                    width: "100%",
                                    borderRadius: "12px",
                                }}
                            >
                                <div
                                    style={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        textAlign: "center",
                                        gap: "12px",
                                    }}
                                >
                                    <div style={{ height: '250px', width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Doughnut
                                            data={swapUsageData}
                                            options={doughnutOptions}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={8} style={{ display: "flex" }}>
                            <Card
                                title="Memory Information"
                                bordered={false}
                                style={{
                                    width: "100%",
                                    borderRadius: "12px",
                                }}
                            >
                                <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Doughnut data={memoryUsageData} options={doughnutOptions} />
                                </div>
                            </Card>
                        </Col>



                    </Row>

                   
                        <Col span={24}>
                            <Card title="Processes" bordered={false}>
                                <Table
                                    dataSource={osProcessData || []}
                                    columns={OsProcessColumn}
                                    rowKey="pid"
                                    pagination={{ pageSize: 10, showSizeChanger: true }}
                                    // scroll={{ x: 1200, y: 400 }}
                                />
                            </Card>
                        </Col>

                   
                    <Col span={24}>
                        <Card title="CPU Load per Core" bordered={false} style={{ ...cardStyle, width: "100%" }}>
                            <div style={{ height: '300px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Bar data={cpuLoadData} options={cpuLoadOptions} />
                            </div>
                        </Card>
                    </Col>









                    <Col span={24}>
                        <Card title="Disk Information" bordered={false}>
                            <Table dataSource={fsData} columns={Oscolumns} pagination={false} />
                        </Card>
                    </Col>
                </Row>
            </div>
    );
};

export default OsInfo;