import { filter } from "../../utilFunction";

export const lockColumns = [
        { 
            title: "Client", 
            dataIndex: "CLIENT", 
            key: "CLIENT",
            ...filter("CLIENT")
        },
        { 
            title: "User", 
            dataIndex: "ZUSER", 
            key: "ZUSER",
            ...filter("ZUSER")
        },
        { 
            title: "Transaction", 
            dataIndex: "TCODE", 
            key: "TCODE",
            ...filter("TCODE")
        },
        { 
            title: "Lock Object", 
            dataIndex: "ZTABLE", 
            key: "ZTABLE",
            ...filter("ZTABLE")
        },
        { 
            title: "Mode", 
            dataIndex: "LOCKMODE", 
            key: "LOCKMODE",
            ...filter("LOCKMODE")
        },
        { 
            title: "Date", 
            dataIndex: "ZDATE", 
            key: "ZDATE",
            ...filter("ZDATE"),
            sorter: (a, b) => new Date(a.ZDATE) - new Date(b.ZDATE),
        },
    ];