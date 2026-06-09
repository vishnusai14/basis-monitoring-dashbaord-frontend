import { Input, Button } from "antd";
import moment from "moment";

export const parseSapDate =  (sapDateStr) =>  {
  // Extract the number inside /Date(...)/ 
  const timestamp = parseInt(sapDateStr.replace(/[^0-9]/g, ""), 10);
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
}

export const parseSapTime = (sapTimeStr) => {
    const duration = moment.duration(sapTimeStr);
    const formattedTime = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
    return formattedTime;
}

export const getServerState = (state) => {
 
    switch (state) {  
        case 1:
            return "Active";
        case 2:
            return "Hibernate";
        case 3:
            return "Shutdown";
        case 4:
            return "Stopped";
        default:
            return "Unknown";
    }

}


export const getJobState = (state) => {
    switch (state) {
        case "F":
            return "Finished";
        default:
            return "Cancelled";
    }
}




export const filter = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Button
        type="primary"
        onClick={() => confirm()}
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : "",
});

export const createUniqueRow = (record, idx) => {

    if (Array.isArray(record)) {
        const uniqueRecord = record.map((itm, index) => ({
            ...itm,
            key: `${itm[idx] || index}-${index}`,
        }));

        return uniqueRecord;
    }else {
        return record;
    }
}

export const createCorrectDateFormat = (record, col) => {
    if(Array.isArray(record)) {
        const withCorrectDateFormat = record.map((itm, idx) => ({
            ...itm,
            correctStartDate: parseSapDate(itm[col])
        }));

        return withCorrectDateFormat;
    }else {
        return record;
    }
}

export const createCorrectTimeFormat = (record, col) => {
    if(Array.isArray(record)) {
        const withCorrectTimeFormat = record.map((itm, idx) => ({
            ...itm,
            correctStartTime: parseSapTime(itm[col])
        }));
        return withCorrectTimeFormat;
    }else {
        return record;
    }
}

export const createCorrectDateandTime = (record, col1, col2) => {
    const withCorrectDate = createCorrectDateFormat(record, col1);
    const withCorrectDateandTime = createCorrectTimeFormat(withCorrectDate, col2);
    return withCorrectDateandTime;
}


export const formatKbToGiB = (kb) => `${(kb / 1024 / 1024).toFixed(2)} GB`;

export const formatNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
};

export const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const retryRequest = async (
    apiCall,
    retries = 5,
    retryDelay = 1000
) => {

    for (let attempt = 1; attempt <= retries; attempt++) {

        try {

            const response = await apiCall();

            return response;

        } catch (err) {

            console.log(`Attempt ${attempt} failed`);

            // Last retry
            if (attempt === retries) {
                throw err;
            }

            // wait before retry
            await delay(retryDelay);
        }
    }
};