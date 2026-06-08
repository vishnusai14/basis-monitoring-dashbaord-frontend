import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { getBgJobLogs } from "../../serverFunction/serverFunctions";
import { createCorrectDateandTime } from "../../utils/utilFunction";

const JobLogModal = ({ job, onClose }) =>   {

     const [jobLog, setJobLog] = useState([]);
     const [loading, setLoading] = useState(true);

     const columns = [
       {
         title: "Date",
         dataIndex: "correctStartDate",
         key: "correctStartDate",
         ellipsis: false,
         width: 100,
       },
       {
         title: "Time",
         dataIndex: "correctStartTime",
         key: "correctStartTime",
         ellipsis: false,
         width: 100,
       },
       {
         title: "Message",
         dataIndex: "Text",
         key: "Text",
      
       },
     ];

     const fetchJobLogs = (jobName, jobCount) => {
           
            if(!jobName || !jobCount) return;
            setLoading(true);
            getBgJobLogs(jobName, jobCount).then(res => {

                const withCorrectDateandTime = createCorrectDateandTime(res.data.d.results, "Enterdate", "Entertime");
                setJobLog(withCorrectDateandTime|| []);
                
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
        }


   

    useEffect(() => {  
        if (job) {
            fetchJobLogs(job.Jobname, job.Jobcount);
        }
     }, [job]);

  return (
    
    <Modal
      title={`Job Logs - ${job?.Jobname}`}
      open={true}
      onCancel={onClose}
      footer={null}
      width={600}
    >
    { loading ? <Spinner loading={loading} tip={'Loading Job Logs'}    /> :

      <Table
        dataSource={jobLog}
        columns={columns}
        rowKey={(record, idx) => idx}
        pagination={true}
        bordered
        size="small"
      />
      }
    </Modal>
  );
}

export default JobLogModal;
