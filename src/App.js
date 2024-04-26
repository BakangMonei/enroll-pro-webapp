import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QRCode from "qrcode";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadString } from "firebase/storage";
import { firebaseApp } from "./database/firebase";
import tw from "tailwind-styled-components";
import DownloadButton from "./components/DownloadButton";
import { getFunctions, httpsCallable } from "firebase/functions";
import DeclinedStudents from "./components/DeclinedStudents";

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

const SubmitButton = tw.button`
  w-full
  p-2
  bg-blue-500
  text-white
  font-bold
  rounded-md
  hover:bg-blue-600
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
`;

function App() {
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

  const generateQRCode = async () => {
    const qrCodeData = `Date and Time: ${dateAndTime.toISOString()}\nExam Room: ${examRoom}\nFaculty: ${faculty}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nModule Leader Email: ${moduleLeaderEmail}\nModule Leader Name: ${moduleLeaderName}\nModule Name: ${moduleName}\nPhone Number: ${phoneNumber}\nRoom: ${room}\nStudent Email: ${studentEmail}\nStudent ID Number: ${studentIDNumber}\nTable: ${table}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    return qrCodeImage;
  };

  // const handleSubmit = async (firebaseApp) => {
  //   const qrCodeImage = await generateQRCode();
  //   const firestore = getFirestore(firebaseApp);
  //   const storage = getStorage(firebaseApp);

  //   const userDocRef = await addDoc(collection(firestore, "users"), {
  //     dateAndTime: dateAndTime.toISOString(),
  //     examRoom,
  //     faculty,
  //     firstName,
  //     lastName,
  //     moduleLeaderEmail,
  //     moduleLeaderName,
  //     moduleName,
  //     phoneNumber,
  //     room,
  //     studentEmail,
  //     studentIDNumber,
  //     table,
  //     qrCodeImage,
  //   });

  //   const storageRef = ref(storage, userDocRef.id);
  //   await uploadString(storageRef, qrCodeImage, "data_url");
  // };

  // const functions = getFunctions();

  // const sendEmail = httpsCallable(functions, 'sendEmail');

  const functions = getFunctions();

  const sendEmail = httpsCallable(functions, "sendEmail");

  const handleSubmit = async () => {
    const qrCodeImage = await generateQRCode();
    const firestore = getFirestore();
    const storage = getStorage();
  
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
    });
  
    const storageRef = ref(storage, userDocRef.id);
    await uploadString(storageRef, qrCodeImage, "data_url");
  
    try {
      const result = await sendEmail({
        to: studentEmail,
        subject: "Your Exam Details",
        body: `Dear ${firstName} ${lastName},\n\nYour exam details are as follows:\n\nDate and Time: ${dateAndTime.toISOString()}\nExam Room: ${examRoom}\nFaculty: ${faculty}\nModule Name: ${moduleName}\n\nPlease find attached your QR code.\n\nBest regards,\n[Your Name]`,
        attachments: [
          {
            filename: "qrCode.png",
            type: "image/png",
            content: qrCodeImage,
          },
        ],
      });
  
      console.log(result);
      alert("Form submitted successfully!");
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
        <Label htmlFor="examRoom">Exam Room:</Label>
        <Input
          type="text"
          id="examRoom"
          value={examRoom}
          onChange={(e) => setExamRoom(e.target.value)}
        />

        <Label htmlFor="faculty">Faculty:</Label>
        <Input
          type="text"
          id="faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        />

        <Label htmlFor="firstName">First Name:</Label>
        <Input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <Label htmlFor="lastName">Last Name:</Label>
        <Input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <Label htmlFor="moduleLeaderEmail">Module Leader Email:</Label>
        <Input
          type="email"
          id="moduleLeaderEmail"
          value={moduleLeaderEmail}
          onChange={(e) => setModuleLeaderEmail(e.target.value)}
        />

        <Label htmlFor="moduleLeaderName">Module Leader Name:</Label>
        <Input
          type="text"
          id="moduleLeaderName"
          value={moduleLeaderName}
          onChange={(e) => setModuleLeaderName(e.target.value)}
        />

        <Label htmlFor="moduleName">Module Name:</Label>
        <Input
          type="text"
          id="moduleName"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />

        <Label htmlFor="phoneNumber">Phone Number:</Label>
        <Input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <Label htmlFor="room">Room:</Label>
        <Input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <Label htmlFor="studentEmail">Student Email:</Label>
        <Input
          type="email"
          id="studentEmail"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
        />

        <Label htmlFor="studentIDNumber">Student ID Number:</Label>
        <Input
          type="text"
          id="studentIDNumber"
          value={studentIDNumber}
          onChange={(e) => setStudentIDNumber(e.target.value)}
        />

        <Label htmlFor="table">Table:</Label>
        <Input
          type="text"
          id="table"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />

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

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>

      <DownloadButton />

      <DeclinedStudents />
    </FormContainer>
  );
}

export default App;
