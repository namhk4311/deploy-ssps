import React from 'react';
import { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib'; 
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
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

// add File Upload props

interface FileUploadAreaProps {
  setMetafile: React.Dispatch<React.SetStateAction<MetaInfo>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const PrintDialog: React.FC<PrintDialogProps> = ({ onClose, onContinue, setMetafile, setTotalPages }) => {
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
        <FileUploadArea setMetafile={setMetafile} setTotalPages={setTotalPages} />
        <DialogActions onClose={onClose} onContinue={onContinue} setMetafile={setMetafile} setTotalPages={setTotalPages} />
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


const FileUploadArea: React.FC<FileUploadAreaProps> = ({setMetafile, setTotalPages}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  // const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setMetafile(prev => {
  //       if (e.target.files) {
  //         return {...prev, Name: e.target.files[0].name}
  //       }
  //       return prev;
  //     })
  //     console.log('name file', e.target.files[0].name);
  //     setUploadedFile(e.target.files[0]);
  //   }
  // };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);

      // Extract PDF page count
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const numPages = pdfDoc.getPages().length;

      // Update metafile with the number of pages
      setTotalPages(numPages); //???????????????????????
      setMetafile(prev => ({
        ...prev,
        Name: file.name,
        Number_of_pages: numPages,  // Set the page count
      }));
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
