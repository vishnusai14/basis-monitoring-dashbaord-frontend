import { Spin } from "antd";


const Spinner = ({ loading, tip }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>   
            <Spin spinning={loading} tip={tip} size="large" />
        </div>
    );
}       

export default Spinner;