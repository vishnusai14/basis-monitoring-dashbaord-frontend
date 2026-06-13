import { filter } from "../../utilFunction";

export const dumpColumns = [
    {
      title: "Date",
      dataIndex: 'correctStartDate',
      key: 'correctStartDate',
      ...filter("correctStartDate"),
      sorter: (a, b) => new Date(a.correctStartDate) - new Date(b.correctStartDate),
    },
    {
      title: "Time",
      dataIndex: 'correctStartTime',
      key: 'correctStartTime',
      ...filter("correctStartTime"),
    },
    {
      title:"User",
      dataIndex: 'Zuser',
      key: 'Zuser',
      ...filter("Zuser"),
      sorter: (a, b) => a.Zuser.localeCompare(b.Zuser),
    },
    {
      title: "Client",
      dataIndex: 'Zclient',
      key: 'Zclient',
      ...filter("Zclient"),
    },
    {
      title: "Host",
      dataIndex: 'Zhost',
      key: 'Zhost',
      ...filter("Zhost"),
    },
    {
      title: "Dumps",
      dataIndex: 'Zdump',
      key: 'Zdump',
    ...filter("Zdump"),
    },
    {
      title: "Programs",
      dataIndex: 'Zprog',
      key: 'Zprog',
      ...filter("Zprog"),
    }
  ];