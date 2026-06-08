import React from "react";
import { Card, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const RefreshCard = ({ title, onRefresh, children }) => {
  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>{title}</span>
          <Button
            type="default"
            icon={<ReloadOutlined />}
            size="small"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={onRefresh}
          />
        </div>
      }
    >
      {children}
    </Card>
  );
};

export default RefreshCard;
