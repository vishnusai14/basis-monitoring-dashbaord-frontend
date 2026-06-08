import React, { useState, useEffect } from "react";
import { Table, Card, Modal, Input, DatePicker, Button, Row, Col, Spin } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { Pie } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";
import { createCorrectDateFormat, createUniqueRow } from "../../utils/utilFunction";
import { getJobState } from "../../utils/utilFunction";
import JobLogModal from "./JobLogModal";
import Spinner from "../Spinner/Spinner";
import { jobColumns } from "../../utils/Tables/Columns/JobColumn";
import RefreshCard from "../RefreshCard";
import { getBgJobDetails, getBgJobDetailsSummary } from "../../serverFunction/serverFunctions";

const JobsTab = () => {
    const [jobs, setJobs] = useState([]);
    const [jobLog, setJobLog] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [filterName, setFilterName] = useState("");
    const [filterDate, setFilterDate] = useState(null);
    const [failedCount, setFailedCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [loading, setLoading] = useState(true);


    //Changing the Function (SOAP or ODATA) will require to change the Column Name

    const fetchJobsUsingOdata = (jobname, startDate) => {
        setLoading(true)
        getBgJobDetails(jobname, startDate).then(res => {

            if(res.data) {
                getBgJobDetailsSummary(jobname, startDate).then(res2 => {
                    const uniqueJobs = createUniqueRow(res.data?.d.results || [], "JOBNAME");
                    const correctDataJobRecords = createCorrectDateFormat(uniqueJobs, "Startdate");
                    console.log(correctDataJobRecords);
                    setSuccessCount(res2.data.d.results[0].Successcount || 0);
                    setFailedCount(res2.data.d.results[0].Failedcount || 0);
                    setJobs(correctDataJobRecords);
                }).catch(err => {
                    console.log(err);
                })
            }

        }).catch(err => {
            // Need to implement proper error handling
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });

    }

    const fetchJobs = (jobname, startDate) => {
       

        setLoading(true);
        axios.get("http://localhost:9090/bgData", {
            params: {
                jobName: jobname || "*",
                startDate: startDate || moment().format("YYYYMMDD")
            }
        }).then(res => {
            if (res.data) {
                setFailedCount(res.data.FAILEDJOB);
                setSuccessCount(res.data.SUCCESSJOB);

                const uniqueJobs = createUniqueRow(res.data?.JOBDETAILS?.item || [], "JOBNAME");

                uniqueJobs.forEach(job => {
                    job.JOBSTATUS = getJobState(job.JOBSTATUS);
                });

                console.log("Fetched Job:", uniqueJobs);

                setJobs(uniqueJobs);
            }
        }).catch(err => {
            // Need to implement proper error handling
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });

    }




    useEffect(() => {
        console.log("Fetching jobs data...");
         fetchJobsUsingOdata();
    }, []);

    const jobChartData = {
        labels: ["Failed", "Success"],
        datasets: [
            {
                label: "Jobs Status",
                data: [failedCount, successCount],
                backgroundColor: ["#f44336", "#4caf50"],
            },
        ],
    };

    const handleGetJobs = () => {
        const nameLower = (filterName || "*");
        const dateStr = filterDate ? filterDate.format("YYYYMMDD") : "";
        console.log("Fetching jobs with filters - Name:", nameLower, "Date:", filterDate);
        console.log("Fetching jobs with filters - Name:", nameLower, "Date:", dateStr);
        fetchJobsUsingOdata(nameLower, dateStr);
    };



    console.log(jobLog.length)


    return (
        loading ?
            <Spinner loading={loading} tip={'Loading Jobs'} />
            : (
                <>
                    <RefreshCard title={"Job Overview"} onRefresh={handleGetJobs} >
                        <Row gutter={12} style={{ marginBottom: 12 }} align="middle">
                            <Col xs={24} sm={10}>
                                <Input
                                    placeholder="Enter Job name"
                                    value={filterName}
                                    onChange={(e) => setFilterName(e.target.value)}
                                    size="large"
                                    allowClear
                                />
                            </Col>
                            <Col xs={24} sm={8}>
                                <DatePicker
                                    value={filterDate}
                                    onChange={(d) => setFilterDate(d)}
                                    format="YYYY-MM-DD"
                                    size="large"
                                    style={{ width: '100%' }}
                                    placeholder="Select date (YYYY-MM-DD)"
                                />
                            </Col>
                            <Col xs={24} sm={6}>
                                <Button type="primary" size="large" block onClick={handleGetJobs}>
                                    Get Jobs List
                                </Button>
                            </Col>
                        </Row>
                        <div style={{ maxWidth: 400, margin: '0 auto' }}>
                            <Pie
                                data={jobChartData}
                                height={240}
                                width={400}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </RefreshCard>
                    <Table
                        dataSource={jobs}
                        columns={jobColumns}
                        rowKey="key"
                        loading={loading}
                        onRow={(record) => ({
                            onDoubleClick: () => {
                                setSelectedJob(record);
                            },
                        })}
                    />
                    {selectedJob && (
                        <JobLogModal job={selectedJob} onClose={() => setSelectedJob(null)} />
                    )}
                </>

            )

    );
}

export default JobsTab;

