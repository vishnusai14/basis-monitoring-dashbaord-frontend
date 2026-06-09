import React, { useMemo, useEffect, useState } from 'react';
import { Card, Row, Col, Table, Statistic, Divider } from 'antd';
import { Bar, Doughnut } from 'react-chartjs-2';
import { formatKbToGiB, formatNumber, retryRequest }  from "../../utils/utilFunction";
import {

Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Tooltip,
Legend,
} from 'chart.js';
import { getOsInfo } from '../../serverFunction/serverFunctions';
import { osColumns, fsColumns } from "../../utils/Tables/Columns/OsInfoColumn";
import Spinner from '../Spinner/Spinner';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);



const OsInfo = () => {


const [fsData, setfsData] = useState([]);
const [osProps, setOsProps] = useState([]);
const [loading, setLoading] = useState(true);
const [osMap, setosMap] = useState([]);



const totalMemKb = formatNumber(osMap.TotalVisibleMemorySize);
const freeMemKb = formatNumber(osMap.FreePhysicalMemory);

const swapKb = formatNumber(osMap.TotalSwapSpaceSize);
const freeSwapInPage = formatNumber(osMap.FreeSpaceInPagingFiles);
const usedMemKb = Math.max(totalMemKb - freeMemKb, 0);
const usedSwap = Math.max(swapKb - freeSwapInPage , 0);

const totalMemSwapkb = totalMemKb + swapKb;

const loadAverage = [
    formatNumber(osMap.LoadAverageOneMinute),
    formatNumber(osMap.LoadAverageFiveMinute),
    formatNumber(osMap.LoadAverageFifteenMinute),
];

const fsChartLabels = fsData.slice(0, 6).map((item) => item.mountPoint);
const fsChartUsed = fsData.slice(0, 6).map((item) => item.used);
const fsChartTotal = fsData.slice(0, 6).map((item) => item.total);

const memoryChartData = {
    labels: ['Used', 'Free', 'Available'],
    datasets: [
        {
            label: 'Memory (KB)',
            data: [usedMemKb, freeMemKb,  usedSwap , totalMemSwapkb],
            backgroundColor: ['#1890ff', '#ff0feb' , '#52c41a', '#faad14'],
        },
    ],
};

const loadChartData = {
    labels: ['1 min', '5 min', '15 min'],
    datasets: [
        {
            label: 'Load Average',
            data: loadAverage,
            backgroundColor: ['#722ed1', '#13c2c2', '#f5222d'],
        },
    ],
};

const fsChartData = {
    labels: fsChartLabels,
    datasets: [
        {
            label: 'Used',
            data: fsChartUsed,
            backgroundColor: '#1890ff',
        },
        {
            label: 'Total',
            data: fsChartTotal,
            backgroundColor: '#d9d9d9',
        },
    ],
};

const fetchOsInfo = async () => {
    try {
        setLoading(true);
        const response = await retryRequest(
            () => getOsInfo(),
            5,
            2500
        );

        setfsData(response.data.fsData);
        setOsProps(response.data.osprops);
        const osMap = Object.fromEntries(response.data.osprops.map(({ mName, mValue }) => [mName, mValue]));
        setosMap(osMap);
        console.log(response.data);
    }catch (err) {
        console.log(err);
    }
    finally {
        setLoading(false);
    } 
}

useEffect(() => {
   fetchOsInfo();
}, [])

return (

    loading ? <Spinner /> : 
    <>
    <div>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="OS Name" value={osMap.Name || 'N/A'} />
                    <Divider />
                    <Statistic title="Version" value={osMap.Version || 'N/A'} />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="CPU Count" value={osMap['CPU Count'] || 0} />
                    <Divider />
                    <Statistic title="CPU Idle" value={`${osMap['CPU Idle'] || 0}%`} />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="Memory Total" value={formatKbToGiB(totalMemKb)} />
                    <Divider />
                    <Statistic title="Memory Free" value={formatKbToGiB(freeMemKb)} />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card>
                    <Statistic title="Swap Total" value={formatKbToGiB(swapKb)} />
                    <Divider />
                    <Statistic title="Available Swap" value={formatKbToGiB(freeSwapInPage)} />
                </Card>
            </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} lg={12}>
                <Card title="Memory Distribution">
                    <Doughnut data={memoryChartData} />
                </Card>
            </Col>
            <Col xs={24} lg={12}>
                <Card title="Load Average">
                    <Bar data={loadChartData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} height={220} />
                </Card>
            </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} lg={24}>
                <Card title="Filesystem Usage">
                    <Bar data={fsChartData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} height={250} />
                </Card>
            </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} lg={12}>
                <Card title="OS Properties">
                    <Table
                        dataSource={osProps}
                        columns={osColumns}
                        rowKey="mName"
                        pagination={false}
                        size="small"
                    />
                </Card>
            </Col>
            <Col xs={24} lg={12}>
                <Card title="Filesystem Details">
                    <Table
                        dataSource={fsData}
                        columns={fsColumns}
                        rowKey="mountPoint"
                        pagination={false}
                        size="small"
                    />
                </Card>
            </Col>
        </Row>
    </div>
    </>
    
);
};

export default OsInfo;