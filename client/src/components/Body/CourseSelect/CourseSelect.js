import React from "react";
import "./CourseSelect.css";

const orientation_course_names = ["ENG 100", "CS 210", "CS 211"];
const foundation_course_names = [
  "MATH 221",
  "MATH 231",
  "MATH 241",
  "MATH 257/415/416",
  "PHYS 211",
  "PHYS 212",
  "NST Elective",
];
const advanced_elective_course_names = [
  "Advanced elective #1",
  "Advanced elective #2",
];

const CourseSelect = ({ selectedCourses, techElectiveData, techCoreData }) => {
  const orientation_course_names_needed = orientation_course_names.filter(
    (course) => !selectedCourses.includes(course)
  );
  const foundation_course_names_needed = foundation_course_names.filter(
    (course) => !selectedCourses.includes(course)
  );
  const tech_core_courses_needed = techCoreData.filter(
    (row) => !selectedCourses.includes(row["Course"])
  );

  return (
    <aside className="course-select">
      <h1 className="course-select-header">Completed Courses</h1>
      <div className="course-selections">
        {/* <button
          onClick={() => {
            console.log("ocn: ", orientation_course_names_needed);
            console.log("fcn: ", foundation_course_names_needed);
            console.log("tccn: ", tech_core_courses_needed);
          }}
        >
          log
        </button> */}
      </div>
    </aside>
  );
};

const CourseSelection = ({ courseNames, selectedCourses, handleCheck }) => {
  return (
    <div className="course-selection">
      {courseNames.map((courseName) => (
        <div className="course-selection-item">
          <input
            type="checkbox"
            checked={selectedCourses.includes(courseName)}
            onChange={() => handleCheck(courseName)}
          />
          <label>{courseName}</label>
        </div>
      ))}
    </div>
  );
};

export default CourseSelect;
