import {baseUrl} from "./serverDetails";
import moment from "moment";
import axios from "axios";





export const getBgJobDetails = (jobname, startDate) => {
    const queryJobname = jobname || "*";
    const querystartDate = startDate || moment().format("YYYYMMDD");
    
    return axios.get(baseUrl + "/bgdata", {
        params: {
            jobname: queryJobname,
            startDate: querystartDate
        },

    });
};

export const getBgJobDetailsSummary = (jobname, startDate) => {
    const queryJobname = jobname || "*";
    const querystartDate = startDate || moment().format("YYYYMMDD");
    
    return axios.get(baseUrl + "/bgdata/get-summary", {
        params: {
            jobname: queryJobname,
            startDate: querystartDate
        },

    });
};

export const getBgJobLogs = (jobname, jobcount) => {
     return axios.get(baseUrl + "/bgdata/get-logs", {
        params: {
            jobname: jobname,
            jobcount: jobcount
        },

    });
}

export const getLockDetails = () => {
    return axios.get(baseUrl + "/lockdetails", {

    });
}

export const getServerDetails = () => {
    return axios.get(baseUrl+ "/serverdetails", {});
}

export const getWpDetails = (servername) => {
    return axios.get(baseUrl+ "/serverdetails/get-wp-details", {
        params: {
            servername: servername
        },
    });
}

export const getOsInfo = () => {
    return axios.get(baseUrl + "/osInfo", {
        params: {},
    });
}