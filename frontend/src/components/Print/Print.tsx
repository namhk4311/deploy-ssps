import React from 'react';
import { useRef, useState } from 'react';
import './Print.css';

interface MetaInfo {
  Name: string,
  Number_of_pages: number,
  PrID: number,
  numCopies: number,
  printingColor: string,
  pageSide: string, 
  sizePage: string,
  layout: string,
  oddEven: string
}



interface PrintDialogProps {
  onClose: () => void;
  onContinue: () => void;
  setMetafile: React.Dispatch<React.SetStateAction<MetaInfo>>;
}

// add File Upload props

interface FileUploadAreaProps {
  setMetafile: React.Dispatch<React.SetStateAction<MetaInfo>>;
}

const PrintDialog: React.FC<PrintDialogProps> = ({ onClose, onContinue, setMetafile }) => {
  return (
    <div className="print-dialog">
      <div className="dialog-container">
        <div className="text-container">
          <h2 className="dialog-heading">Tạo lệnh in</h2>
          <p className="dialog-description">
            Tải file lên để thực hiện in tại một trong các máy in có sẵn
          </p>
        </div>
        {/* <TabNavigation /> */}
        <FileUploadArea setMetafile={setMetafile} />
        <DialogActions onClose={onClose} onContinue={onContinue} setMetafile={setMetafile} />
      </div>
    </div>
  );
};

// const TabNavigation: React.FC = () => {
//   return (
//     <div className="tab-navigation">
//       <button className="tab active">Tải lên một tập tin</button>
//       <button className="tab">Các tập tin gần đây</button>
//       <button className="tab">Google Drive</button>
//     </div>
//   );
// };


const FileUploadArea: React.FC<FileUploadAreaProps> = ({setMetafile}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMetafile(prev => {
        if (e.target.files) return {...prev, Name: e.target.files[0].name}
        return prev;
      })
      console.log('name file', e.target.files[0].name);
      setUploadedFile(e.target.files[0]);
    }
  };

  // Handle file drop
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  // Prevent default behavior for drag-over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="file-upload-area"
      onClick={() => fileInputRef.current?.click()} // Simulate file input click
      onDrop={handleFileDrop} // Handle file drop
      onDragOver={handleDragOver} // Allow drag-over
    >
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hide the actual input
        onChange={handleFileSelect}
      />
      <div className="upload-icon">
        <img src="/image/upload.png" alt="Upload" />
      </div>
      {uploadedFile ? (
        <p className="upload-text">File uploaded: {uploadedFile.name}</p>
      ) : (
        <p className="upload-text">
          Click to browse or drag and drop a file here to upload.
        </p>
      )}
    </div>
  );
};

const DialogActions: React.FC<PrintDialogProps> = ({ onClose, onContinue}) => {
  return (
    <div className="dialog-actions">
      <button className="cancel-button" onClick={onClose}>Hủy</button>
      <button className="continue-button" onClick={onContinue} >Tiếp tục</button>
    </div>
  );
};

export default PrintDialog;
