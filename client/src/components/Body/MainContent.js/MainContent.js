import React from "react";
import {
  orientation_course_names,
  foundation_course_names,
  advanced_elective_course_names,
} from "../CourseSelect/CourseSelect";
import "./MainContent.css";

const MainContent = ({ selectedCourses, techElectiveData, techCoreData }) => {
  return (
    <div className="main-content">
      <h1>Degree Progress</h1>
      <CoursesNeeded
        label="Orientation/Development"
        courseNames={orientation_course_names}
        selectedCourses={selectedCourses}
      />
      <CoursesNeeded
        label="Foundational Math/Science"
        courseNames={foundation_course_names}
        selectedCourses={selectedCourses}
      />
      <CoursesNeeded
        label="Technical Core"
        courseNames={techCoreData.map((row) => `${row["Course"]}`)}
        selectedCourses={selectedCourses}
      />
      <ElectivesNeeded
        techElectiveData={techElectiveData}
        selectedCourses={selectedCourses}
      />
      <CoursesNeeded
        label="Advanced Electives"
        courseNames={advanced_elective_course_names}
        selectedCourses={selectedCourses}
      />
    </div>
  );
};

const CoursesNeeded = ({ label, courseNames, selectedCourses }) => {
  if (
    label === "Orientation/Development" &&
    selectedCourses.includes("ENG 100") &&
    (selectedCourses.includes("CS 210") || selectedCourses.includes("CS 211"))
  ) {
    return <></>;
  }
  return orientation_course_names.filter(
    (course) => !selectedCourses.includes(course)
  ).length === 0 ? (
    <></>
  ) : (
    <div className="courses-needed">
      <h2>{label}</h2>
      <ul>
        {courseNames
          .filter((course) => !selectedCourses.includes(course))
          .map((course) => (
            <li key={course}>{course}</li>
          ))}
      </ul>
    </div>
  );
};

const ElectivesNeeded = ({ techElectiveData, selectedCourses }) => {
  const te_courses = techElectiveData.map((row) => row["Course"]);
  const has_6 =
    te_courses.filter((course) => selectedCourses.includes(course)).length >= 6;

  return (
    <div className="courses-needed">
      <h2>Tech Elective Requirements</h2>
    </div>
  );
};

export default MainContent;
