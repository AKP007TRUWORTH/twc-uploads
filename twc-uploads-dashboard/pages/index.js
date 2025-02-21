import { useState } from 'react';
import { useRouter } from 'next/router'; 
import Header from '../components/Header';
import Upload from '../components/Upload';
import dynamic from 'next/dynamic';
import axios from 'axios'; 

const Card = dynamic(() => import('antd/es/card'), { ssr: false });

export default function Home() {
  const [uploading, setUploading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [shortId, setShortId] = useState('');
  const router = useRouter();

  const onFileUpload = async (files) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', files[0]);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      setShortId(data.uniqueId);
      setQrCodeUrl(data.qrCodeUrl);
    } catch (error) {
      console.error(error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };
  
  const handleShortIdClick = () => {
    if (shortId) {
      router.push(`/details/${shortId}`);
    }
  };
  const handleViewAllClick = () => {
    router.push('/listApk'); // Redirect to list page
  };
  return (
    <div style={{ padding: 50, margin: 'auto', textAlign: 'center', backgroundColor: '#f4f4f4' }}>
      <Header />
      <div style={{ marginTop: '30px', borderRadius: '8px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
          Development & In-house Apps Wireless Installation
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px' }}>
          The WellnessCorner is a tool for developers to deploy Development and In-house applications directly to the devices.
        </p>
      </div>
      {/* Android Apps Card */}
      <Card style={{ width: 300, textAlign: 'left', marginTop: 20 }}>
        <h1 level={5}>Android apps</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/placeholder-image.png" alt="App Icon" style={{ width: 40, height: 40, marginRight: 10 }} />
          <h1>Wellnes...</h1>
        </div>
        <div style={{ textAlign: 'right', marginTop: 10 }}>
          <h1 onClick={handleViewAllClick} style={{ cursor: 'pointer' }}>View all...</h1>
        </div>
      </Card>
      <h1 style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginBottom: 10, marginTop: 30 }}>
        Upload Your App
      </h1>
      <Upload onFileUpload={onFileUpload} />
      {uploading && <p>Uploading...</p>}
      {shortId && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 20 }}>
          <h1 style={{ fontSize: 14, fontWeight: '500' }}>
            App Uploaded Successfully!
          </h1>
          <h1 style={{ fontSize: 14, fontWeight: '500' }}>
            Share this link:
          </h1>
          <button onClick={handleShortIdClick}>
            {shortId}
          </button>
          <h1 style={{ fontSize: 14, fontWeight: '500', marginTop: 20 }}>
            Scan this QR code to download:
          </h1>
          <img src={qrCodeUrl} alt="Download QR Code" style={{ width: 200, height: 200 }} />
        </div>
      )}
    </div>
  );
}