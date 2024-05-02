import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firestore } from "../../database/firebase";
import Papa from "papaparse";
import "../../App.css";
const DeclinedStudents = () => {
  const [data, setData] = useState([]);
  const [fileType, setFileType] = useState("csv"); // default file type is csv

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "deleted"));
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setData(fetchedData);
    };

    fetchData();
  }, []);

  const downloadData = () => {
    let fileContent = "";
    if (fileType === "csv") {
      fileContent = Papa.unparse(data);
    } else if (fileType === "txt") {
      fileContent = data.map((item) => JSON.stringify(item)).join("\n");
    } else {
      fileContent = JSON.stringify(data, null, 2);
    }

    const blob = new Blob([fileContent], { type: `text/${fileType}` });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data.${fileType}`;
    a.click();
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  return (
    <div>
      <select value={fileType} onChange={handleFileTypeChange}>
        <option value="csv">CSV</option>
        <option value="txt">TXT</option>
        <option value="json">JSON</option>
      </select>
      <button
        onClick={downloadData}
        className="w-auto bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out"
      >
        Unverified Students
        
      </button>
    </div>
  );
};

export default DeclinedStudents;
