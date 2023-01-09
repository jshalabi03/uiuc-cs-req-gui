import React from "react";
import { useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
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

const CourseSelect = ({
  selectedCourses,
  techElectiveData,
  techCoreData,
  handleCheck,
  handleSelectAll,
}) => {
  //   const orientation_course_names_needed = orientation_course_names.filter(
  //     (course) => !selectedCourses.includes(course)
  //   );
  //   const foundation_course_names_needed = foundation_course_names.filter(
  //     (course) => !selectedCourses.includes(course)
  //   );
  //   const tech_core_courses_needed = techCoreData.filter(
  //     (row) => !selectedCourses.includes(row["Course"])

  return (
    <aside className="course-select">
      <h1 className="course-select-header">Completed Courses</h1>
      <div className="course-selections">
        <CourseSelection
          courseNames={orientation_course_names}
          selectedCourses={selectedCourses}
          handleCheck={handleCheck}
          handleSelectAll={handleSelectAll}
          label="Orientation & Professional Development"
        />
      </div>
    </aside>
  );
};

const CourseSelection = ({
  courseNames,
  selectedCourses,
  handleCheck,
  handleSelectAll,
  label,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="course-selection">
      <div
        className="course-selection-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>{label}</h3>
        {isExpanded ? (
          <FaCaretDown className="course-selection-header-icon" />
        ) : (
          <FaCaretUp className="course-selection-header-icon" />
        )}
      </div>

      {isExpanded && (
        <>
          <input
            type="checkbox"
            value={courseNames}
            onChange={handleSelectAll}
          />
          <label>Select All</label>
          {courseNames.map((courseName) => (
            <div className="course-selection-item" key={courseName}>
              <input
                type="checkbox"
                value={courseName}
                checked={selectedCourses.includes(courseName)}
                onChange={handleCheck}
              />
              <label>{courseName}</label>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CourseSelect;
