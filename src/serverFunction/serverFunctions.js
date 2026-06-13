import { baseUrl } from "./serverDetails";
import moment from "moment";
import axios from "axios";





export const getBgJobDetails = (jobname, startDate) => {
    const queryJobname = jobname || "*";
    const querystartDate = startDate || moment().format("YYYYMMDD");

    return axios.get(baseUrl + "/api/bgdata", {
        params: {
            jobname: queryJobname,
            startDate: querystartDate
        },
        headers: {
            "X-CSRF-Token": "Fetch"
        }

    });
};

export const getBgJobDetailsSummary = (jobname, startDate) => {
    const queryJobname = jobname || "*";
    const querystartDate = startDate || moment().format("YYYYMMDD");

    return axios.get(baseUrl + "/api/bgdata/get-summary", {
        params: {
            jobname: queryJobname,
            startDate: querystartDate
        },
        headers: {
            "X-CSRF-Token": "Fetch"
        }
    });
};

export const getBgJobLogs = (jobname, jobcount) => {
    return axios.get(baseUrl + "/api/bgdata/get-logs", {
        params: {
            jobname: jobname,
            jobcount: jobcount
        },
        headers: {
            "X-CSRF-Token": "Fetch"
        }
    });
}

export const getLockDetails = () => {
    return axios.get(baseUrl + "/api/lockdetails", {
        headers: {
            "X-CSRF-Token": "Fetch"
        }

    });
}

export const getServerDetails = () => {
    return axios.get(baseUrl + "/api/serverdetails", {
        headers: {
            "X-CSRF-Token": "Fetch"
        }
    });
}

export const getWpDetails = (servername) => {
    return axios.get(baseUrl + "/api/serverdetails/get-wp-details", {
        params: {
            servername: servername
        },
        headers: {
            "X-CSRF-Token": "Fetch"
        }
    });
}

export const getOsInfo = () => {
    return axios.get(baseUrl + "/api/osData/get-info", {
        params: {},
        headers: {
            "X-CSRF-Token": "Fetch"
        }
    });
}

export const getOsProcessInfo = () => {
    return axios.get(baseUrl + "/api/osData/get-process", {
        params: {},
        headers: {
            "X-CSRF-Token": "Fetch"
        }
    });
}