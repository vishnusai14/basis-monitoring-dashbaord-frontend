import React, { useEffect, useState } from "react";
import { Table, Card, Modal } from "antd";
import axios from "axios";
import { createUniqueRow } from "../utils/utilFunction";
import Spinner from "./Spinner/Spinner";
import { lockColumns } from "../utils/Tables/Columns/LockColumn";
import RefreshCard from "./RefreshCard";

const LocksTab = () => {
    const [locks, setLocks] = useState([]);
    const [selectedLock, setSelectedLock] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const fetchLocks = () => {
        setLoading(true);
        axios.get("http://localhost:9090/lockdata")
            .then(res => {
                console.log("Fetched Lock:", res.data);
                const uniqueLock = createUniqueRow(res.data?.LOCKDETAILS?.item || [], "ZTABLE");
                setLocks(uniqueLock);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    } 


    useEffect(() => {
        fetchLocks();
    }, []);

    return (
        loading ? <Spinner loading={loading} tip={"Loading Locks"}  /> :
        <>

            <RefreshCard title={"Locks Overview"} onRefresh={fetchLocks} >
                <Table
                    dataSource={locks}
                    columns={lockColumns}
                    rowKey="key"
                />
            </RefreshCard>

        </>
    );
}

export default LocksTab;
