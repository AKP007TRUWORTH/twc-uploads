import { useDropzone } from 'react-dropzone';

const Upload = ({ onFileUpload }) => {
  // Set up the dropzone with the necessary handlers
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onFileUpload(acceptedFiles), // Pass the accepted files to the parent onFileUpload function
    accept: '.ipa, .apk', // Allow only .ipa or .apk files
  });

  return (
    <div
     {...getRootProps()} 
     style={{width: '60%',height: '200px',border: '2px dashed #00aaff', backgroundColor: '#f9f9f9',display: 'flex',
      justifyContent: 'center',alignItems: 'center',cursor: 'pointer',
    }}>
  <input {...getInputProps()} />
  <p style={{textAlign: 'center', color: '#000000',  fontSize: '18px', }}>
    Drag and drop your .ipa/.apk files here or click to select
  </p>
</div>
  );
};

export default Upload;
