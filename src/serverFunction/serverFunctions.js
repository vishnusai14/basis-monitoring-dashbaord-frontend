import { baseUrl } from "./serverDetails";
import axios from "axios";
import moment from "moment";



export const getBgJobDetails = (jobname, startDate) => {
    const queryJobname = jobname || "*";
    const querystartDate = startDate || moment().format("YYYYMMDD");
    
    return axios.get(baseUrl + "/bgdata", {
        params: {
            jobname: queryJobname,
            startDate: querystartDate
        },
        headers: {
            "Accept": "application/json"
        }
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
        headers: {
            "Accept": "application/json"
        }
    });
};

export const getBgJobLogs = (jobname, jobcount) => {
     return axios.get(baseUrl + "/bgdata/get-logs", {
        params: {
            jobname: jobname,
            jobcount: jobcount
        },
        headers: {
            "Accept": "application/json"
        }
    });
}

export const getLockDetails = () => {
    return axios.get(baseUrl + "/lockdetails", {
        headers : {
            "Accept" : "application/json"
        }
    });
}

export const getServerDetails = () => {
    return axios.get(baseUrl + "/serverdetails", {
        headers: {
            "Accept": "application/json"
        }
    });
}

export const getWpDetails = (servername) => {
         return axios.get(baseUrl + "/serverdetails/get-wp-details", {
        params: {
            servername: servername
        },
        headers: {
            "Accept": "application/json"
        }
    });
}