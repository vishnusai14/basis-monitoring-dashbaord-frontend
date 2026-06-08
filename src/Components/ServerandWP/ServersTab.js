import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import { Line } from "react-chartjs-2";
import ServerWP from "./ServerWP";
import axios from "axios";
import { createUniqueRow } from "../../utils/utilFunction";
import Spinner from "../Spinner/Spinner";
import { getServerState } from "../../utils/utilFunction";
import { serverColumns } from "../../utils/Tables/Columns/ServerColumn";
import RefreshCard from "../RefreshCard";

const ServersTab = () => {
    const [selectedServer, setSelectedServer] = useState(null);
    const [servers, setServers] = useState([]);
    const [serverWpDetails, setServerWpDetails] = useState([]);
    const [loading, setLoading] = useState(true);



    const serverChartData = {
        labels: servers.map(s => s.instance),
        datasets: [
            {
                label: "Server Status",
                data: servers.map(s => (s.status === "Active" ? 1 : 0)),
                borderColor: "#2196f3",
                fill: false,
            },
        ],
    };


    const fetchServers = () => {
        setLoading(true);
        axios.get("http://localhost:9090/serverwp")
            .then(res => {
                const uniqueServers = createUniqueRow(res.data?.LIST?.item || [], "NAME");
                uniqueServers.forEach(server => {
                    server.decodedState = getServerState(server.decodedState);
                });
                setServers(uniqueServers);
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
    }


    const fetchServerWpDetails = (record) => {
        axios.get("http://localhost:9090/serverwp/get-wp-details", {
            params: { serverName: record.NAME }
        })
            .then(res => {
                setSelectedServer(record);
                setServerWpDetails(res.data.WPLIST.item || []);
                console.log("Fetched WP Details for Server:", record.NAME, res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchServers();
    }, []);

    return (
        loading ? <Spinner loading={loading} tip={"Loading Servers"} /> :
            <>
                <RefreshCard title={"Instance Overview"} onRefresh={fetchServers} >
                    <Table
                        dataSource={servers}
                        columns={serverColumns}
                        rowKey="key"
                        onRow={(record) => ({
                            onDoubleClick: () => fetchServerWpDetails(record),
                        })}
                    />
                </RefreshCard>

                {
                    selectedServer && <Card title={`Work Processes for ${selectedServer.NAME}`}>
                        <ServerWP server={selectedServer} wpDetails={serverWpDetails} />
                    </Card>
                }


            </>
    );
}

export default ServersTab;
