import { Progress } from 'antd';
import { filter, formatKbToGiB, formatNumber } from "../../utilFunction";





export const osColumns = [
    {
        title: 'Property',
        dataIndex: 'mName',
        key: 'mName',
        width: 220,
    },
    {
        title: 'Type',
        dataIndex: 'mType',
        key: 'mType',
        width: 180,
    },
    {
        title: 'Value',
        dataIndex: 'mValue',
        key: 'mValue',
        render: (value, record) => {
            if (record.mName === 'TotalVisibleMemorySize' || record.mName === 'FreePhysicalMemory' || record.mName === 'mAvailablePhysicalMemory' || record.mName === 'TotalSwapSpaceSize') {
                return `${formatKbToGiB(formatNumber(value))} (${value})`;
            }
            return value;
        },
    },
];

export const fsColumns = [
    {
        title: 'Mount Point',
        dataIndex: 'mountPoint',
        key: 'mountPoint',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (value) => `${value} KB`,
    },
    {
        title: 'Available',
        dataIndex: 'available',
        key: 'available',
        render: (value) => `${value} KB`,
    },
    {
        title: 'Used',
        dataIndex: 'used',
        key: 'used',
        render: (value) => `${value} KB`,
    },
    {
        title: 'Usage',
        key: 'usage',
        render: (_, record) => {
            const total = record.total || 1;
            const used = record.used || 0;
            const percent = Math.round((used / total) * 100);
            return <Progress percent={percent} size="small" />;
        },
    },
];

export const Oscolumns = [
    { title: 'Mount Point', dataIndex: 'mount', key: 'mount' },
    { title: 'File System', dataIndex: 'fs', key: 'fs' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { title: 'Used', dataIndex: 'used', key: 'used' },
    { title: 'Available', dataIndex: 'available', key: 'available' },
    {
        title: 'Usage',
        dataIndex: 'use',
        key: 'use',
        render: (use) => {


            const percent = parseFloat(use);

            let status = "success";
            let strokeColor = "#52c41a";

            if (percent >= 90) {
                status = "exception";
                strokeColor = "#ff4d4f";
            } else if (percent >= 50) {
                status = "active";
                strokeColor = "#faad14";
            }

            return (
                <Progress
                    percent={percent}
                    status={status}
                    strokeColor={strokeColor}
                    size="small"
                />
            );


        },
    },
];




export const OsProcessColumn = [
        { title: "PID", dataIndex: "pid", key: "pid", sorter: (a, b) => a.pid - b.pid },
        { title: "PPID", dataIndex: "parentPid", key: "parentPid", sorter: (a, b) => a.parentPid - b.parentPid },
        { title: "Name", dataIndex: "name", key: "name", sorter: (a, b) => (a.name || "").localeCompare(b.name || "") },
        { title: "User", dataIndex: "user", key: "user", ...filter("user")},
        { title: "CPU (%)", dataIndex: "cpu", key: "cpu", sorter: (a, b) => (a.cpu || 0) - (b.cpu || 0), render: v => Number(v || 0).toFixed(2) },
        { title: "MEM (%)", dataIndex: "mem", key: "mem", sorter: (a, b) => (a.mem || 0) - (b.mem || 0), render: v => Number(v || 0).toFixed(2) },
        { title: "Started", dataIndex: "started", key: "started", sorter: (a, b) => new Date(a.started) - new Date(b.started) },
        {
            title: "Command",
            dataIndex: "command",
            key: "command",
            render: text => <div style={{ maxWidth: 320, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{text}</div>,
        },
    ];
