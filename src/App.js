import { useEffect, useState } from 'react'; 
import './App.css'; 
import QRCode from "qrcode";
import { addDoc, collection } from "firebase/firestore";
import { firestore, storage } from "../src/database/firebase"; // Corrected import path

const CreateStudentForm = () => {

  // For QRCode
  const [temp, setTemp] = useState(""); 
  const [word, setWord] = useState(""); 
  const [size, setSize] = useState(400); 
  const [bgColor, setBgColor] = useState("ffffff"); 
  const [qrCode, setQrCode] = useState(""); 


  const [formData1, setFormData1] = useState([]);
  const [formData, setFormData] = useState({
    dateAndTime: "",
    studentEmail: "",
    examRoom: "",
    faculty: "",
    firstName: "",
    lastName: "",
    moduleLeaderEmail: "",
    moduleLeaderName: "",
    moduleName: "",
    phoneNumber: "",
    room: "",
    studentIDNumber: "",
    table: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const fundsCollection = collection(firestore, "onetesting");
      await addDoc(fundsCollection, formData);
      setFormData(...formData1, formData);

      setFormData({
        dateAndTime: "",
        studentEmail: "",
        examRoom: "",
        faculty: "",
        firstName: "",
        lastName: "",
        moduleLeaderEmail: "",
        moduleLeaderName: "",
        moduleName: "",
        phoneNumber: "",
        room: "",
        studentIDNumber: "",
        table: "",
      });
    } catch (error) {
      console.error("Error adding funding opportunity: ", error);
      alert("Error adding funding opportunity. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {/* dateAndTime */}
      <div className="mb-4 col-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dateAndTime"
        >
          Date and Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dateAndTime"
          name="dateAndTime"
          type="text"
          placeholder="Thu Apr 18 10:15:36 GMT+02:00 2024"
          value={formData.dateAndTime}
          onChange={handleChange}
        />
      </div>

      {/* email */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* examRoom */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="examRoom"
        >
          Exam Room
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="examRoom"
          name="examRoom"
          type="text"
          placeholder="Exam Room"
          value={formData.examRoom}
          onChange={handleChange}
        />
      </div>

      {/* faculty */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="faculty"
        >
          Faculty
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="faculty"
          name="faculty"
          type="text"
          placeholder="Faculty"
          value={formData.faculty}
          onChange={handleChange}
        />
      </div>

      {/* firstName */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      {/* lastName */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      {/* moduleLeaderEmail */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="moduleLeaderEmail"
        >
          Module Leader Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="moduleLeaderEmail"
          name="moduleLeaderEmail"
          type="text"
          placeholder="Module Leader Email"
          value={formData.moduleLeaderEmail}
          onChange={handleChange}
        />
      </div>

      {/* moduleLeaderName */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="moduleLeaderName"
        >
          Module Leader Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="moduleLeaderName"
          name="moduleLeaderName"
          type="text"
          placeholder="Module Leader Name"
          value={formData.moduleLeaderName}
          onChange={handleChange}
        />
      </div>

      {/* moduleName */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="moduleName"
        >
          Module Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="moduleName"
          name="moduleName"
          type="text"
          placeholder="Module Name"
          value={formData.moduleName}
          onChange={handleChange}
        />
      </div>

      {/* phoneNumber */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      {/* room */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="room"
        >
          Room
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="room"
          name="room"
          type="text"
          placeholder="Room"
          value={formData.room}
          onChange={handleChange}
        />
      </div>

      {/* studentIDNumber */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="studentIDNumber"
        >
          Student ID Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="studentIDNumber"
          name="studentIDNumber"
          type="text"
          placeholder="Student ID Number"
          value={formData.studentIDNumber}
          onChange={handleChange}
        />
      </div>

      {/* table */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="table"
        >
          Table
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="table"
          name="table"
          type="text"
          placeholder="Table"
          value={formData.table}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateStudentForm;
