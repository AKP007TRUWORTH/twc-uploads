import React from "react";
import { useRouter } from "next/router";
import { Layout, Typography, Button, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from 'axios'; 
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('antd/es/card'), { ssr: false });

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const appDetails = [
    { key: "1", label: "Package", value: "com.truworth.wellnesscorner" },
    { key: "2", label: "Minimum OS version", value: "26 - Oreo 8.0" },
    { key: "3", label: "Target OS version", value: "34 - Upside Down Cake 14.0" },
    { key: "4", label: "Size", value: "258.18 MB" },
    { key: "5", label: "Supported screens", value: "4" },
    { key: "6", label: "Supported densities", value: "8" },
];

const columns = [
    {
        title: "",
        dataIndex: "label",
        key: "label",
        render: (text) => <Text strong>{text}</Text>,
    },
    {
        title: "",
        dataIndex: "value",
        key: "value",
    },
];

const Detailpage = () => {
    const router = useRouter();
    const { id } = router.query;

    const DownloadFiles = async () => {
        try {
            const response = await axios.get(`/api/download?shortId=${id}`);
            const fileUrl = response.data.url;
            
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = fileUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(error);
            alert('Failed to load file');
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width={250} style={{ background: "#f0f2f5", padding: "16px" }}>
                <Title level={4}>Diawi</Title>
                <Text>About</Text>
                <br />
                <Text>My Device</Text>
                <br />
                <Text>Install</Text>
                <br />
                <Text>Help</Text>
                <br />
                <Text>Website</Text>
                <br />
                <Title level={5} style={{ marginTop: 16 }}>Last Apps</Title>
                <Text>Wellness Corner ({id})</Text>
                <br />
                <Button type="link">Clear last apps</Button>
            </Sider>
            <Layout>
                <Header style={{ background: "#fff", padding: "16px", textAlign: "center" }}>
                    <Title level={3}>Wellness Corner</Title>
                </Header>
                <Content style={{ padding: "24px" }}>
                    <Card title="App Overview" bordered={false}>
                        <p>
                            <Text strong>Wellness Corner</Text>
                        </p>
                        <p>
                            <Text strong>Version: </Text>6.6.1
                        </p>
                        <p>
                            <Text strong>Build: </Text>116
                        </p>
                    </Card>
                    <Card title="Download" bordered={false} style={{ marginTop: 16 }}>
                        <Button
                            type="primary"
                            onClick={DownloadFiles}
                            icon={<DownloadOutlined />}>
                            Download application
                        </Button>
                        <p style={{ marginTop: 8 }}>
                            Open this page in a browser on your Android device to be able to install the app.
                        </p>
                    </Card>
                    <Card title="App Details" bordered={false} style={{ marginTop: 16 }}>
                        <Table columns={columns} dataSource={appDetails} pagination={false} showHeader={false} />
                    </Card>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Detailpage;
