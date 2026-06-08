import { filter } from "../../utilFunction";

export const lockColumns = [
        { 
            title: "Client", 
            dataIndex: "Client", 
            key: "Client",
            ...filter("Client")
        },
        { 
            title: "User", 
            dataIndex: "Zuser", 
            key: "Zuser",
            ...filter("Zuser")
        },
        { 
            title: "Transaction", 
            dataIndex: "Tcode", 
            key: "Tcode",
            ...filter("Tcode")
        },
        { 
            title: "Lock Object", 
            dataIndex: "Ztable", 
            key: "Ztable",
            ...filter("Ztable")
        },
        { 
            title: "Mode", 
            dataIndex: "Lockmode", 
            key: "Lockmode",
            ...filter("Lockmode")
        },
        { 
            title: "Date", 
            dataIndex: "correctStartDate", 
            key: "correctStartDate",
            ...filter("correctStartDate"),
            sorter: (a, b) => new Date(a.correctStartDate) - new Date(b.correctStartDate),
        },
    ];