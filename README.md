# **CO3001 - Smart Student Printing Service**

## **Objective**
 HCMUT_SSPS is a web-based application designed to provide an efficient printing service for students at Ho Chi Minh City University of Technology. The system enables student to print document easily, track printing activities, and manage printers on campus.

## **Contributors**
1.	Huynh Nga (2252508)
2.	Ha Kien Hoa (2252225)
3.	Ho Khanh Nam (2252500)
4.	Ha Chi Quyen (2152933)
5.	Hoang Duc Chinh (2252093)


## **Description**
- SSPS provides features for the students to meet the printing needs at the university. Students can upload document files, select a printer, and configure printing options, such as page size (e.g., A3, A4), pages to print, single-/double-sided, number of copies, etc. Moreover, students can view personal printing history for a specific period, and pay for additional pages through the system's integration with online payment platform.
- Student Printing Service Officer (SPSO) can use SSPS to manage the operation of printers system. The SPSO can manage printers by adding, deleting, enabling, or disabling devices, and configuring the details, such as ID, model, brand, and location. Additionally, SPSO can access printing logs, filtered by student, printer, or time period, in order to monitor activity and resolve issues.

## **Technology stack**
- Front-end: React.js, Typescript
- Back-end: Node.js, Express.js
- Database: MySQL

## **Getting Started**
### **Prerequisites**
- Make sure to install [`Node.js`](https://nodejs.org/en) for getting access to npm packages and running both React.js in Front-end and Node.js in Backend
- Make sure to install [`MySQL Installer`](https://dev.mysql.com/downloads/installer/) and [`MySQL Workbench`](https://dev.mysql.com/downloads/workbench/) in order to run the sspsdatabase.sql file and set up the database
### **Installation**
+ Clone or download all the files in the repository
```c
git clone https://github.com/namhk4311/CO3001-SSPS.git
```
+ Initialize the Front-end:
  + Navigate to the project directory: 
  
  ```c
  cd CO3001-SSPS\frontend
  ```
  + Install the the neccessary package: 
  ```c
  npm install
  ```
  + To run React.js, run in command line: 
   ```c
   npm run dev
   ```
  + Then click on the link http://localhost:5173/ to view webpage in the browser
+ Initialize the Back-end:
  + In another tab of terminal/command prompt, navigate to the project directory: 
  ```c
  cd CO3001-SSPS\backend
  ```
  + Install the the neccessary package: 
  ```c
  npm install
  ```
  + To run NodeJs server, run in the command line: 
  ```c
  npm start
  ```
+ Initialize the database:
    + Create database by executing the query in the file [`sspsdatabase.sql`](./sspsdatabase.sql)
    + To login the system, you can use any user account (role: student/admin) with the email and password here:

      | No. | Email                        | Password   |
      | --- | ---------------------------  | ---------- |
      | 1   | nam.hokhanhcs22@hcmut.edu.vn | 123456789  |
      | 2   | hoa.hasagi@hcmut.edu.vn      | 123456789  |
      | 3   | quyen.ha38@hcmut.edu.vn      | 123456789  |
      | 4   | nga.huynh@hcmut.edu.vn       | 123456789  |
      | 5   | chinh.hoang@hcmut.edu.vn     | 123456789  |
      | 6   | admin1@hcmut.edu.vn          | 123456789  |
      | 7   | admin2@hcmut.edu.vn          | 123456789  |
      | 8   | admin3@hcmut.edu.vn          | 123456789  |