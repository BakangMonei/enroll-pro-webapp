import React, { useState } from "react";
import QRCode from "qrcode";
import { firestore, storage } from "./database/firebase"; // Import Firestore and Storage from firebase.js

const Form = () => {
  const [dateAndTime, setDateAndTime] = useState("");
  const [email, setEmail] = useState("");
  const [examRoom, setExamRoom] = useState("");
  const [faculty, setFaculty] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [moduleLeaderEmail, setModuleLeaderEmail] = useState("");
  const [moduleLeaderName, setModuleLeaderName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [room, setRoom] = useState("");
  const [studentIDNumber, setStudentIDNumber] = useState("");
  const [table, setTable] = useState("");

  const handleChange = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {/* dateAndTime */}
        <div className="mb-4">
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
            value={dateAndTime}
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
            value={email}
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
            value={examRoom}
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
            value={faculty}
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
            value={firstName}
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
            value={lastName}
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
            value={moduleLeaderEmail}
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
            value={moduleLeaderName}
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
            value={moduleName}
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
            value={phoneNumber}
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
            value={room}
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
            value={studentIDNumber}
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
            value={table}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
