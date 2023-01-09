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

  const handleCheck = (event) => {
    const course = event.target.value;
    if (event.target.checked) {
      setSelectedCourses([...selectedCourses, course]);
    } else {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    }
  };

  const handleSelectAll = (event) => {
    const courses = event.target.value.split(",");
    if (event.target.checked) {
      setSelectedCourses([...selectedCourses, ...courses]);
    } else {
      setSelectedCourses(selectedCourses.filter((c) => !courses.includes(c)));
    }
  };

  return (
    <div className="body">
      <CourseSelect
        selectedCourses={selectedCourses}
        techElectiveData={techElectiveData}
        techCoreData={techCoreData}
        handleCheck={handleCheck}
        handleSelectAll={handleSelectAll}
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
