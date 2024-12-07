import React, { useState, useEffect } from 'react';
import './AddPageNumber.css';

interface AddPageNumberProps {
  onClose: () => void;
  onSubmit: (pageNumber: number) => void;
}

const AddPageNumber: React.FC<AddPageNumberProps> = ({ onClose, onSubmit }) => {
  const [pageNumber, setPageNumber] = useState<number>(0); 
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = Number(value); 

    if (!isNaN(numberValue) && numberValue >= 0) {
      setPageNumber(numberValue); 
    }
  };

  useEffect(() => {
    setTotalAmount(pageNumber * 100);
  }, [pageNumber]);

  const handleSubmit = () => {
    if (pageNumber > 0) {
      onSubmit(pageNumber);
      onClose();
    } else {
      alert('Số trang không hợp lệ');
    }
  };

  return (
    <div className="addpagenum-dialog">
      <div className="dialog-container">
        <div className="text-container">
          <div className="dialog-heading">Hãy nhập số trang mà bạn muốn thêm</div>
          <input
            type="number"
            value={pageNumber}
            onChange={handleInputChange}
            className="page-number-input"
            placeholder="Nhập số trang"
          />
          {/* toLocaleString() là để convert number sang string */}
          <h2>Số tiền bạn có: </h2>
          <h2>Tổng tiền thanh toán: {totalAmount.toLocaleString()} đ</h2> 
        </div>
        <div className="actions">
          <button className="cancel-button" onClick={onClose}>
            Hủy
          </button>
          <button className="submit-button" onClick={handleSubmit}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPageNumber;
