import { filter } from "../../utilFunction";

export const jobColumns = [
    {
        title: "Job Name",
        dataIndex: "Jobname",
        key: "Jobname",
        ...filter("Jobname"),
        sorter: (a, b) => a.Jobname.localeCompare(b.Jobname),
    },
    {
        title: "Status",
        dataIndex: "Jobstatus",
        key: "Jobstatus",
        render: (text) => {
            const status = (text || "").toLowerCase();
            let backgroundColor = "#f0f0f0";
            let color = "#000";
            if (status === "f") {
                backgroundColor = "#f6ffed";
                color = "#389e0d";
            } else {
                backgroundColor = "#fff1f0";
                color = "#cf1322";
            }
            return (
                <span style={{
                    backgroundColor,
                    color,
                    padding: "4px 8px",
                    borderRadius: 4,
                    fontWeight: 500,
                    display: "inline-block",
                }}>
                    {text}
                </span>
            );
        }, ...filter("Jobstatus")
    },
    {
        title: "Execution Date",
        dataIndex: "correctStartDate",
        key: "correctStartDate",
        ...filter("correctStartDate"),
        sorter: (a, b) => new Date(a.correctStartDate) - new Date(b.correctStartDate),
    },
    {
        title: "Logs",
        dataIndex: "Joblog",
        key: "Joblog"
    },
    {
        title: "Job No",
        dataIndex: "Jobcount",
        key: "Jobcount",
        ...filter("Jobcount"),
        sorter: (a, b) => a.Jobcount - b.Jobcount
    },
];