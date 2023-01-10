import React from "react";
import {
  orientation_course_names,
  foundation_course_names,
  advanced_elective_course_names,
} from "../CourseSelect/CourseSelect";
import "./MainContent.css";
import Confetti from "react-confetti";

const MainContent = ({ selectedCourses, techElectiveData, techCoreData }) => {
  const all_reqs_completed =
    orientation_course_names.filter(
      (course) => !selectedCourses.includes(course)
    ).length === 0 &&
    foundation_course_names.filter(
      (course) => !selectedCourses.includes(course)
    ).length === 0 &&
    advanced_elective_course_names.filter(
      (course) => !selectedCourses.includes(course)
    ).length === 0 &&
    techCoreData
      .map((row) => `${row["Course"]}`)
      .filter((course) => !selectedCourses.includes(course)).length === 0 &&
    [
      ...new Set(
        techElectiveData
          .map((row) => row["Course"])
          .filter((course) => selectedCourses.includes(course))
      ),
    ].length >= 6 &&
    techElectiveData.some((row) => {
      const category = row["Category"];
      if (category == "Team Project Course List") return false;
      const category_courses = techElectiveData
        .filter((row) => row["Category"] === category)
        .map((row) => row["Course"])
        .filter((course) => selectedCourses.includes(course));
      return [...new Set(category_courses)].length >= 3;
    }) &&
    techElectiveData.some(
      (row) =>
        row["Category"] === "Team Project Course List" &&
        selectedCourses.includes(row["Course"])
    );
  return (
    <div className="main-content">
      {all_reqs_completed ? (
        <>
          <h1 className="req-complete-header">All Requirements Complete!</h1>
          <Confetti />
        </>
      ) : (
        <h1>Degree Progress</h1>
      )}
      <CoursesNeeded
        label="Orientation & Development"
        courseNames={orientation_course_names}
        selectedCourses={selectedCourses}
      />
      <CoursesNeeded
        label="Foundational Math & Science"
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
  return (
    <div className="courses-needed">
      <h2>{label}</h2>
      {courseNames.filter((course) => !selectedCourses.includes(course))
        .length === 0 ? (
        <p>All {label} requirements completed!</p>
      ) : (
        <ul className="courses-needed-list">
          {courseNames
            .filter((course) => !selectedCourses.includes(course))
            .map((course) => (
              <li key={course}>{course}</li>
            ))}
        </ul>
      )}
    </div>
  );
};

const ElectivesNeeded = ({ techElectiveData, selectedCourses }) => {
  const te_courses = techElectiveData.map((row) => row["Course"]);
  const has_6 =
    [
      ...new Set(
        te_courses.filter((course) => selectedCourses.includes(course))
      ),
    ].length >= 6;

  const has_3_in_one_category = techElectiveData.some((row) => {
    const category = row["Category"];
    if (category == "Team Project Course List") return false;
    const category_courses = techElectiveData
      .filter((row) => row["Category"] === category)
      .map((row) => row["Course"])
      .filter((course) => selectedCourses.includes(course));
    return [...new Set(category_courses)].length >= 3;
  });

  const has_team = techElectiveData.some(
    (row) =>
      row["Category"] === "Team Project Course List" &&
      selectedCourses.includes(row["Course"])
  );

  if (has_6 && has_3_in_one_category && has_team) {
    return (
      <div className="courses-needed">
        <h2>Tech Elective Requirements</h2>
        <p>All tech elective requirements completed!</p>
      </div>
    );
  }

  return (
    <div className="courses-needed">
      <h2>Tech Elective Requirements</h2>
      {!has_6 ? (
        <div className="te-req">
          <h3>Must have at least six technical electives</h3>
        </div>
      ) : (
        <></>
      )}
      {!has_3_in_one_category ? (
        <div className="te-req">
          <h3>Must have three techincal electives from the same focus group</h3>
        </div>
      ) : (
        <></>
      )}
      {!has_team ? (
        <div className="te-req">
          <h3>Must have a team project techincal elective</h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainContent;
