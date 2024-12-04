-- Create the database
CREATE DATABASE IF NOT EXISTS ssps_database;
USE ssps_database;


-- USER table
CREATE TABLE USER (
    ID INT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    F_Name VARCHAR(100) NOT NULL,
    M_name VARCHAR(100),
    L_Name VARCHAR(100),
    Role ENUM('student', 'spso') NOT NULL,
    LastLogin DATETIME DEFAULT CURRENT_TIMESTAMP()
);

alter table USER 
modify L_Name VARCHAR(100);

-- SPSO table
CREATE TABLE SPSO (
    ID INT PRIMARY KEY,
    FOREIGN KEY (ID) REFERENCES USER(ID) ON DELETE CASCADE
);

-- STUDENT table
CREATE TABLE STUDENT (
    ID INT PRIMARY KEY,
    Available_Pages INT NOT NULL DEFAULT 0,
    FOREIGN KEY (ID) REFERENCES USER(ID) ON DELETE CASCADE,
    CHECK (Available_Pages >= 0)
);

-- DOCUMENT table
CREATE TABLE DOCUMENT (
    DocumentID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Format VARCHAR(50) NOT NULL,
    Number_of_pages INT NOT NULL
);

-- PRINTER table
CREATE TABLE PRINTER (
    PrID INT AUTO_INCREMENT PRIMARY KEY,
    Status ENUM('Available', 'In Use', 'Out of Service') NOT NULL DEFAULT 'Available',
    Campus VARCHAR(50) NOT NULL,
    Building VARCHAR(50) NOT NULL,
    Floor VARCHAR(50) NOT NULL,
    Model VARCHAR(100) NOT NULL,
    Short_description TEXT,
    Brand VARCHAR(50) NOT NULL,
    DocumentID INT,
    FOREIGN KEY (DocumentID) REFERENCES DOCUMENT(DocumentID) ON DELETE SET NULL
);

-- PURCHASE_ORDER table
CREATE TABLE PURCHASE_ORDER (
    PurID INT AUTO_INCREMENT PRIMARY KEY,
    Date DATE NOT NULL,
    Type_of_page VARCHAR(50) NOT NULL,
    Number_of_buying_pages INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    studentID INT UNIQUE NOT NULL,
    FOREIGN KEY (studentID) REFERENCES STUDENT(ID) ON DELETE CASCADE
);

-- PRINT_ORDER table
CREATE TABLE PRINT_ORDER (
    PrOID INT AUTO_INCREMENT PRIMARY KEY,
    Start_time DATETIME NOT NULL,
    End_time DATETIME,
    Cancel_time DATETIME,
    Number_of_copies INT NOT NULL,
    Printing_color VARCHAR(20) NOT NULL,
    Page_side ENUM('One-sided', 'Double-sided') NOT NULL DEFAULT 'One-sided',
    Type_of_page VARCHAR(50) NOT NULL,
    Size_of_page VARCHAR(50) NOT NULL,
    studentID INT UNIQUE NOT NULL,
    DocumentID INT UNIQUE NOT NULL,
    FOREIGN KEY (studentID) REFERENCES STUDENT(ID),
    FOREIGN KEY (DocumentID) REFERENCES DOCUMENT(DocumentID)
);

DELIMITER $$
CREATE TRIGGER updateUser 
AFTER INSERT ON USER
FOR EACH ROW 
BEGIN
	IF NEW.Role = 'student' THEN
		INSERT INTO STUDENT (ID, Available_Pages)
        VALUES (NEW.ID, 0);
	ELSEIF NEW.Role = 'spso' THEN
		INSERT INTO SPSO (ID)
        VALUES (NEW.ID);
	END IF;
END$$

DELIMITER ;


INSERT INTO USER (ID, Email, Password, F_Name, M_Name, L_Name, Role) 
VALUES 
(2252500, 'nam.hokhanhcs22@hcmut.edu.vn', '123', 'Nam', 'Khanh', 'Ho', 'student');

INSERT INTO USER (ID, Email, Password, F_Name, Role)
VALUES 
(1, 'admin@hcmut.edu.vn', '123', 'admin', 'spso');

INSERT INTO PRINTER (Campus, Building, Floor, Model, Short_description, Brand, DocumentID)
VALUES
('1', 'B1', '1', 'Epson L3250', 'In màu; 2 mặt; In A4, A5, A6', 'Epson', null),
('1', 'B4', '4', 'CANON LBP 6030', 'In thuờng; 2 mặt; In A4, A5', 'CANON', null),
('2', 'H6', '3', 'BROTHER MFC-L2701DW', 'In màu; 2 mặt; In A4, A5, A6', 'BROTHER', null),
('1', 'A4', '3', 'HP Laser MFP 139FNW', 'In màu; 2 mặt; In A4, A5, A6', 'HP', null),
('2', 'H3', '2', 'CANON LBP 6030', 'In thuờng; 2 mặt; In A4, A5', 'CANON', null),
('2', 'H1', '4', 'CANON PIXMA GM2070', 'In màu; 2 mặt; In A4, A5', 'CANON', null);

select * from USER;
select * from STUDENT;
select * from SPSO;

