import { baseUrl, password, userName } from "./serverDetails";
import axios from "axios";
import moment from "moment";



export const getBgJobDetails = (jobname, startDate) => {
    const queryJobname = jobname || "*";
    const querystartDate = startDate || moment().format("YYYYMMDD");

    const urlString = baseUrl + "/BgJobDetailsSet"

    const url = new URL(urlString);
    console.log(url.toString());
    url.searchParams.append("jobName", queryJobname);
    url.searchParams.append("startDate", querystartDate);
    
    return axios.get(baseUrl + "/BgJobDetailsSet", {
        params: {
            jobname: queryJobname,
            startDate: querystartDate
        },
        auth: {
            username: userName,
            password: password
        },
        headers: {
            "Accept": "application/json"
        }
    });
};

export const getBgJobDetailsSummary = (jobname, startDate) => {
    const queryJobname = jobname || "*";
    const querystartDate = startDate || moment().format("YYYYMMDD");

    return axios.get(baseUrl + "/BgJobDetailsSummarySet", {
        params: {
            jobname: queryJobname,
            startDate: querystartDate
        },
        auth: {
            username: userName,
            password: password
        },
        headers: {
            "Accept": "application/json"
        }
    });
}

export const getBgJobLogs = (jobname, jobcount) => {
    return axios.get(baseUrl + "/BgJobLogDetailsSet", {
        params : {
            jobname: jobname,
            jobcount: jobcount
        },
        auth : {
            username: userName,
            password: password
        },
        headers: {
            "Accept": "application/json"
        }
    })
}

