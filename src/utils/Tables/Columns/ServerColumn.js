export const serverColumns = [
    { title: "AS Instance", dataIndex: "NAME", key: "NAME" },
    { title: "Host Name", dataIndex: "HOST", key: "HOST" },
    { title: "Service", dataIndex: "SERV", key: "SERV" },
    {
        title: "Status",
        dataIndex: "decodedState",
        key: "decodedState",
        render: (text) => {
            const status = (text || "").toLowerCase();
            let backgroundColor = "#f0f0f0";
            let color = "#000";
            if (status === "active") {
                backgroundColor = "#f6ffed";
                color = "#389e0d";
            } else if (status === "hibernate") {
                backgroundColor = "#fff7e6";
                color = "#d48806";
            } else if (status === "stopped") {
                backgroundColor = "#fff1f0";
                color = "#cf1322";
            } else if (status === "shutdown") {
                backgroundColor = "#fff1f0";
                color = "#a8071a";
            } else {
                backgroundColor = "#f5f5f5";
                color = "#595959";
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
        },
    },
];