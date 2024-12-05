import React, { useState } from 'react';
import './AddPageNumber.css';

interface AddPageNumberProps {
  onClose: () => void;
  onSubmit: (pageNumber: number) => void;
}

const AddPageNumber: React.FC<AddPageNumberProps> = ({ onClose, onSubmit }) => {
  const [pageNumber, setPageNumber] = useState<number | string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setPageNumber(value);
    }
  };

//   const handleSubmit = () => {
//     if (pageNumber && typeof pageNumber === 'number' && pageNumber > 0) {
//       onSubmit(pageNumber);
//       onClose();
//     } else {
//       alert('Please enter a valid page number');
//     }
//   };

  return (
    <div className="addpagenum-dialog">
      <div className="dialog-container">
        <div className="text-container">
          <div className="dialog-heading">Enter Page Number</div>
          <input
            type="text"
            value={pageNumber}
            onChange={handleInputChange}
            className="page-number-input"
            placeholder="Page Number"
          />
        </div>
        <div className="actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          {/* <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AddPageNumber;