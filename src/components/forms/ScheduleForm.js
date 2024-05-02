import React, { useState } from "react";
import QRCode from "qrcode";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, uploadBytes } from "firebase/storage";
import { firebaseApp } from "../../database/firebase";
import tw from "tailwind-styled-components";
import DownloadButton from "../buttons/DownloadButton";
import DeclinedStudents from "../buttons/DeclinedStudents";
import axios from "axios";

const FormContainer = tw.div`
  w-full
  max-w-md
  mx-auto
  bg-white
  p-8
  rounded-xl
  shadow-md
  mt-16
`;

const Label = tw.label`
  block
  text-gray-700
  font-bold
  mb-1
`;

const Input = tw.input`
  w-full
  p-2
  border
  border-gray-300
  rounded-md
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
`;

const DateInput = tw(Input)`
  bg-gray-200
  text-gray-500
`;

const ImageInput = tw.input`
  w-full
  p-2
  border
  border-gray-300
  rounded-md
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:border-blue-500
`;

const ScheduleForm = () => {
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [examRoom, setExamRoom] = useState("");
  const [faculty, setFaculty] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [moduleLeaderEmail, setModuleLeaderEmail] = useState("");
  const [moduleLeaderName, setModuleLeaderName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [room, setRoom] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentIDNumber, setStudentIDNumber] = useState("");
  const [table, setTable] = useState("");
  const [image, setImage] = useState(null); // Add image state
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePictureUrl(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const generateQRCode = async () => {
    const qrCodeData = `Date and Time: ${dateAndTime.toISOString()}\nExam Room: ${examRoom}\nFaculty: ${faculty}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nModule Leader Email: ${moduleLeaderEmail}\nModule Leader Name: ${moduleLeaderName}\nModule Name: ${moduleName}\nPhone Number: ${phoneNumber}\nRoom: ${room}\nStudent Email: ${studentEmail}\nStudent ID Number: ${studentIDNumber}\nTable: ${table}\nProfile Picture: ${studentIDNumber}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    return qrCodeImage;
  };

  const handleSubmit = async () => {
    const qrCodeImage = await generateQRCode();
    const firestore = getFirestore();
    const storage = getStorage();

    // Upload image to Firebase Storage
    const imageRef = ref(
      storage,
      `profile_picturesssss/${studentIDNumber}.jpg`
    );
    await uploadBytes(imageRef, image);

    const userDocRef = await addDoc(collection(firestore, "users"), {
      dateAndTime: dateAndTime.toISOString(),
      examRoom,
      faculty,
      firstName,
      lastName,
      moduleLeaderEmail,
      moduleLeaderName,
      moduleName,
      phoneNumber,
      room,
      studentEmail,
      studentIDNumber,
      table,
      qrCodeImage,
      profilePicture: `profile_picturesssss/${studentIDNumber}.jpg`, // Store image path in Firestore
      profilePictureUrl: profilePictureUrl, // Store profile picture URL in Firestore
    });

    const storageRef = ref(storage, userDocRef.id);
    await uploadString(storageRef, qrCodeImage, "data_url");

    // Sending email with input data and image
    const emailData = {
      to: studentEmail,
      subject: "Exam Schedule",
      text: `Your exam schedule details:\n
        \nDate and Time: ${dateAndTime.toISOString()}\nExam Room: ${examRoom}
        \nFaculty: ${faculty} \nFirst Name: ${firstName} \nLast Name: ${lastName}
        \nLecture Email: ${moduleLeaderEmail} \nLecture Name: ${moduleLeaderName}
        \nCourse ${moduleName}\nPhone Number: ${phoneNumber}
        \nRoom: ${room}\nStudent ID Number: ${studentIDNumber}
        \nTable: ${table}
        \nThe QRCode: `,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrCodeImage.split(",")[1], // Base64 encoded string
          encoding: "base64", // Specify encoding
          contentType: "image/png",
        },
      ],
    };

    try {
      // Send email
      await axios.post("http://localhost:3001/send-email", emailData);
      alert("Email sent successfully");
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setDateAndTime(new Date());
    setExamRoom("");
    setFaculty("");
    setFirstName("");
    setLastName("");
    setModuleLeaderEmail("");
    setModuleLeaderName("");
    setModuleName("");
    setPhoneNumber("");
    setRoom("");
    setStudentEmail("");
    setStudentIDNumber("");
    setTable("");
    setProfilePictureUrl("");
    setImage(null); // Reset image state
  };

  return (
    <FormContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(firebaseApp);
        }}
      >
        <h1 className="text-center font-sans text text-2xl">
          Schedule An Exam
        </h1>

        <div className="w-full md:w-1/2 px-4 mb-4 item-center justify-center">
          <Label htmlFor="image">Profile Picture:</Label>
          <ImageInput
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {profilePictureUrl && (
            <img
              src={profilePictureUrl}
              alt="Profile Picture"
              className="w-24 h-24 object-cover rounded-full mt-2"
            />
          )}
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="examRoom">Exam Block:</Label>
            <Input
              type="text"
              id="examRoom"
              value={examRoom}
              onChange={(e) => setExamRoom(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="faculty">Faculty:</Label>
            <Input
              type="text"
              id="faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="firstName">First Name:</Label>
            <Input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="lastName">Last Name:</Label>
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="moduleLeaderEmail">Lecture Email:</Label>
            <Input
              type="email"
              id="moduleLeaderEmail"
              value={moduleLeaderEmail}
              onChange={(e) => setModuleLeaderEmail(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="moduleLeaderName">Lecture Names:</Label>
            <Input
              type="text"
              id="moduleLeaderName"
              value={moduleLeaderName}
              onChange={(e) => setModuleLeaderName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="moduleName">Module Name:</Label>
            <Input
              type="text"
              id="moduleName"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="phoneNumber">Phone Number:</Label>
            <Input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="room">Room:</Label>
            <Input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="studentEmail">Student Email:</Label>
            <Input
              type="email"
              id="studentEmail"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="studentIDNumber">Student ID Number:</Label>
            <Input
              type="text"
              id="studentIDNumber"
              value={studentIDNumber}
              onChange={(e) => setStudentIDNumber(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="table">Table:</Label>
            <Input
              type="text"
              id="table"
              value={table}
              onChange={(e) => setTable(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <Label htmlFor="dateAndTime">Date and Time:</Label>
            <DateInput
              type="datetime-local"
              id="dateAndTime"
              value={dateAndTime.toLocaleString("en-CA", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
              onChange={(e) => setDateAndTime(new Date(e.target.value))}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md"
          >
            Schedule Exam
          </button>
        </div>
      </form>

      <div className="w-auto flex  mt-3">
        <DownloadButton />
        <DeclinedStudents />
      </div>
    </FormContainer>
  );
};

export default ScheduleForm;
