import { useEffect, useState } from "react";
import "./App.css";
import QRCode from "qrcode";
import { addDoc, collection } from "firebase/firestore";
import { firestore, storage } from "../src/database/firebase"; // Corrected import path
import { ref, uploadString } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";

function App() {
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
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");

  // Changing the URL only when the user
  useEffect(() => {
    generateQRCode(formData);
  }, [formData, size, bgColor]);

  // Function to generate QR Code
  const generateQRCode = async (formData) => {
    try {
      const qrData = JSON.stringify(formData);
      const generatedQRCode = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: "H",
      });
      setQrCode(generatedQRCode);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fundsCollection = collection(firestore, "onetesting");
      await addDoc(fundsCollection, formData);

      // Generate QR code image data URL
      const qrData = JSON.stringify(formData);
      const generatedQRCode = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: "H",
        width: size,
        height: size,
        color: {
          dark: "#" + bgColor,
          light: "#ffffff",
        },
      });

      // Upload QR code image URL to Firebase Storage
      const storageRef = ref(storage, `qrcodess/${formData.studentEmail}.png`);
      await uploadString(storageRef, generatedQRCode, "data_url");

      // Get download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Store download URL in Firestore
      const docRef = await addDoc(collection(firestore, "downloadURLs"), {
        downloadURL,
        formData,
      });

      // Clear form data
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

      // Send email to the user with the download URL
      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.studentEmail,
          downloadURL, // Include the download URL in the email payload
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }

      // Clear form data and QR code
      setFormData({
        /* Reset form data */
      });
      setQrCode(""); // Clear QR code
    } catch (error) {
      console.error("Error generating and uploading QR code:", error);
      alert("Error generating and uploading QR code. Please try again.");
    }
  };

  return (
    <div className="App">
      <div className="border border-red-500 p-10">
        <div className="output-box mt-2">
          <img src={qrCode} alt="" />
          {/* <a href={qrCode} download="QRCode">
        <button type="button">Download</button>
      </a> */}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Render form inputs */}
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {key}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`Enter ${key}`}
                value={formData[key]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        <div className="flex p-5">
          <div className="flex flex-auto">
            <h5>Background Color:</h5>
            <input
              type="color"
              onChange={(e) => {
                setBgColor(e.target.value.substring(1));
              }}
            />
          </div>

          <div className="flex flex-auto">
            <h5>Dimension:</h5>
            <input
              type="range"
              min="200"
              max="600"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
        </div>

        <button type="submit" className="bg-red-500 border border-black text-white" onClick={handleSubmit}>
          Send Email
        </button>
      </div>
    </div>
  );
}

export default App;
