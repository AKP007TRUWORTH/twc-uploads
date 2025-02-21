import React, { useState, useEffect } from "react";
import { Layout, Typography, List, Avatar } from "antd";
import dynamic from 'next/dynamic';
import axios from 'axios';

const Card = dynamic(() => import('antd/es/card'), { ssr: false });

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const apps = [
    {
        name: "Wellness Corner",
        package: "com.truworth.wellnesscorner",
        platform: "Android",
        version: "6.6.1",
        build: "116",
        uploaded: "7 days ago",
        shortId: "N5X6TY",
        status: "Available",
        installationsLeft: 46,
        expires: "in 5 days",
        statusColor: "green",
    },
    {
        name: "Wellness Corner",
        package: "com.truworth.wellnesscorner",
        platform: "Android",
        version: "6.9",
        build: "115",
        uploaded: "8 days ago",
        shortId: "KrrwT2",
        status: "Not available",
        installationsLeft: 48,
        expires: "3 hours ago",
        statusColor: "red",
    },
    {
        name: "Wellness Corner",
        package: "com.Truworth.Wellness",
        platform: "iOS",
        version: "6.6",
        build: "1.3",
        uploaded: "8 days ago",
        shortId: "iXzFVz",
        status: "Gone",
        installationsLeft: 48,
        expires: "27 hours ago",
        statusColor: "gray",
    },
];

const UploadedApps = () => {

    const [data, setData] = useState([])
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const response = await axios.get('/api/getuploads');
                setUploads(response.data.uploads);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchUploads();
    }, []);

    useEffect(() => {
        const fetchApkFiles = async () => {
            try {
                const response = await axios.get('/api/lists');
                setData(response.data.apkFiles)
            } catch (error) {
                console.error(error);
                alert('Failed to load APK files');
            }
        };
        fetchApkFiles();
    }, []);

    return (
        <Layout style={{ minHeight: "100vh", background: "#f4f4f4" }}>
            <Sider width={300} style={{ background: "#fff", padding: "16px", borderRight: "1px solid #ddd" }}>
                <Title level={4}>
                    FILTER BY APP
                </Title>
                <List
                    dataSource={apps}
                    renderItem={(app) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar shape="square" src="/placeholder.png" />}
                                title={<Text>{app.name}</Text>}
                                description={<Text type="secondary">{app.package}</Text>}
                            />
                        </List.Item>
                    )}
                />
            </Sider>
            <Content style={{ padding: "24px" }}>
                <Title level={2}>Uploaded Apps</Title>
                <List
                    dataSource={apps}
                    renderItem={(app) => (
                        <Card style={{ marginBottom: 16 }}>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" src="/placeholder.png" />}
                                    title={<Text strong>{app.name}</Text>}
                                    description={<Text type="secondary">{app.package}</Text>}
                                />
                                <div>
                                    <Text>PLATFORM: {app.platform}</Text>
                                    <br />
                                    <Text>VERSION: {app.version}</Text>
                                    <br />
                                    <Text>BUILD: {app.build}</Text>
                                    <br />
                                    <Text>UPLOADED: {app.uploaded}</Text>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <Title level={4}>{app.shortId}</Title>
                                    <Text style={{ color: app.statusColor }}>STATUS: {app.status}</Text>
                                    <br />
                                    <Text>INSTALLATIONS LEFT: {app.installationsLeft}</Text>
                                    <br />
                                    <Text>EXPIRES: {app.expires}</Text>
                                </div>
                            </List.Item>
                        </Card>
                    )}
                />
            </Content>
        </Layout>
    );
};

export default UploadedApps;
