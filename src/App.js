import React, { useEffect, useState } from "react";
import { Layout, Tabs } from "antd";
import axios from "axios";

import DashboardHeader from "./Components/Header";

import JobsTab from "./Components/BackgroundJobs/JobsTab";
import LocksTab from "./Components/LocksTab";
import ServersTab from "./Components/ServerandWP/ServersTab";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function App() {
  
 
  const [servers, setServers] = useState([]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DashboardHeader />
      <Content style={{ padding: "20px" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Background Jobs" key="1">
            <JobsTab />
          </TabPane>
          <TabPane tab="Locks" key="2">
            <LocksTab  />
          </TabPane>
          <TabPane tab="Server List" key="3">
            <ServersTab />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}

export default App;
