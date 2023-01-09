import React, { useState, useEffect } from "react";
import "./Body.css";

import CourseSelect from "./CourseSelect/CourseSelect";
import MainContent from "./MainContent.js/MainContent";

import PapaParse from "papaparse";

const Body = () => {
  const API_URL = process.env.APP_API_URL || "http://localhost:3080";

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [techElectiveData, setTechElectiveData] = useState([]);
  const [techCoreData, setTechCoreData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/data/cs-tech-electives.csv`)
      .then((response) => response.text())
      .then((csvData) => {
        const result = PapaParse.parse(csvData, {
          header: true,
          skipEmptyLines: true,
        });
        console.log("te: ", result.data);
        setTechElectiveData(result.data);
      });

    fetch(`${API_URL}/data/cs-tech-core.csv`)
      .then((response) => response.text())
      .then((csvData) => {
        const result = PapaParse.parse(csvData, {
          header: true,
          skipEmptyLines: true,
        });
        console.log("tc: ", result.data);
        setTechCoreData(result.data);
      });
  }, []);

  return (
    <div className="body">
      <CourseSelect
        selectedCourses={selectedCourses}
        techElectiveData={techElectiveData}
        techCoreData={techCoreData}
      />
      <MainContent
        selectedCourses={selectedCourses}
        techElectiveData={techElectiveData}
        techCoreData={techCoreData}
      />
    </div>
  );
};

export default Body;
