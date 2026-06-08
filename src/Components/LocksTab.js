import React, { useEffect, useState } from "react";
import { Table, Card, Modal } from "antd";
import axios from "axios";
import { createCorrectDateFormat, createUniqueRow } from "../utils/utilFunction";
import Spinner from "./Spinner/Spinner";
import { lockColumns } from "../utils/Tables/Columns/LockColumn";
import RefreshCard from "./RefreshCard";
import { getLockDetails } from "../serverFunction/serverFunctions";

const LocksTab = () => {
    const [locks, setLocks] = useState([]);
    const [selectedLock, setSelectedLock] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchLocksUsingOdata = () => {
        setLoading(true)
        getLockDetails().then(res => {
            console.log(res);
            const uniqueLocks = createUniqueRow(res.data?.d.results || [], " ZTABLE");
            const withCorrectedDates = createCorrectDateFormat(uniqueLocks, "Zdate");
            setLocks(withCorrectedDates);



        }).catch(err => {
            // Need to implement proper error handling
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });

    }

    const fetchLocks = () => {
        setLoading(true);
        axios.get("http://localhost:9090/lockdata")
            .then(res => {
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
        fetchLocksUsingOdata();
    }, []);

    return (
        loading ? <Spinner loading={loading} tip={"Loading Locks"} /> :
            <>

                <RefreshCard title={"Locks Overview"} onRefresh={fetchLocksUsingOdata} >
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
