import { Progress } from 'antd';
import { formatKbToGiB, formatNumber } from "../../utilFunction";





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

