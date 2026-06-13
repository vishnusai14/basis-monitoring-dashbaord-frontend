import React, { useState, useMemo, useEffect } from 'react';
import { Table, Input, Button, Space, Tooltip, DatePicker, Row, Col } from 'antd';
import { FilterOutlined, SortAscendingOutlined, SortDescendingOutlined, ClearOutlined } from '@ant-design/icons';
import { dumpColumns } from "../../utils/Tables/Columns/DumpColumn";
import RefreshCard from '../RefreshCard';
import { getDumpsList } from '../../serverFunction/serverFunctions';
import { createCorrectDateandTime, createUniqueRow } from '../../utils/utilFunction';
import Spinner from '../Spinner/Spinner';



const DumpInfo = () => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dumps, setDumps] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        Zdate: '',
        Ztime: '',
        Zuser: '',
        Zclient: '',
        Zhost: '',
        Zdump: '',
        Zprog: ''
    });

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascend'
    });

    const fetchDumpUsingOdata = () => {
        setLoading(true)
        getDumpsList(startDate, endDate).then(res => {
            console.log(res);
            const uniqueDumps = createUniqueRow(res.data?.d.results || [], "Zclient");
            const withCorrectedDates = createCorrectDateandTime(uniqueDumps, "Zdate", "Ztime");
            setDumps(withCorrectedDates);



        }).catch(err => {
            // Need to implement proper error handling
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });

    }





    const handleGetDumps = () => {
        fetchDumpUsingOdata()
    }



    useEffect(() => {
        fetchDumpUsingOdata();
    }, [])


    return (

        loading ? <Spinner /> :

            <div className="dump-info-container">
                <RefreshCard title={"Job Overview"} onRefresh={handleGetDumps}>

                    <Row gutter={12} style={{ marginBottom: 12 }} align="middle">
                        <Col xs={24} sm={10}>
                            <DatePicker
                                value={startDate}
                                onChange={(d) => setStartDate(d)}
                                format="YYYY-MM-DD"
                                size="large"
                                style={{ width: '100%' }}
                                placeholder="Select Start date (YYYY-MM-DD)"
                            />
                        </Col>
                        <Col xs={24} sm={8}>
                            <DatePicker
                                value={endDate}
                                onChange={(d) => setEndDate(d)}
                                format="YYYY-MM-DD"
                                size="large"
                                style={{ width: '100%' }}
                                placeholder="Select End Data date (YYYY-MM-DD)"
                            />
                        </Col>
                        <Col xs={24} sm={6}>
                            <Button type="primary" size="large" block onClick={handleGetDumps}>
                                Get Dumps List
                            </Button>
                        </Col>
                    </Row>

                    <Table
                        columns={dumpColumns}
                        dataSource={dumps}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1000 }}
                        bordered
                    />
                </RefreshCard>

            </div>
    );
};

export default DumpInfo;
