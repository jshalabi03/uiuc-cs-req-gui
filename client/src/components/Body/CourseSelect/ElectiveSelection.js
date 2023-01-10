import React from "react";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import "./CourseSelect.css";
import "./ElectiveSelection.css";

const ElectiveSelection = ({
  selectedCourses,
  techElectiveData,
  handleCheck,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const electiveCategories = [
    ...new Set(techElectiveData.map((row) => row["Category"])),
  ];

  const electiveCourses = [
    ...new Set(techElectiveData.map((row) => row["Course"])),
  ];

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="course-selection">
      <div
        className="course-selection-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>Technical Electives</h3>
        {isExpanded ? (
          <FaCaretDown className="course-selection-header-icon" />
        ) : (
          <FaCaretUp className="course-selection-header-icon" />
        )}
      </div>

      {isExpanded && (
        <div className="elective-selection-body">
          <input
            type="text"
            placeholder="Add TE"
            value={searchQuery}
            onChange={handleQueryChange}
          />
          <ul>
            {searchQuery &&
              electiveCourses
                .filter((course) =>
                  `${course}${
                    techElectiveData.find((row) => row["Course"] === course)[
                      "Name"
                    ]
                  }`
                    .toLowerCase()
                    .includes(searchQuery.replace(" ", "").toLowerCase())
                )
                .slice(0, 5)
                .map((course) => (
                  <div className="course-selection-item" key={course}>
                    <input
                      type="checkbox"
                      value={course}
                      checked={selectedCourses.includes(course)}
                      onChange={(e) => {
                        handleCheck(e);
                        setSearchQuery("");
                      }}
                    />
                    <label>
                      {course} -{" "}
                      {
                        techElectiveData.find(
                          (row) => row["Course"] === course
                        )["Name"]
                      }{" "}
                    </label>
                  </div>
                ))}
          </ul>
          {electiveCategories.map((category) => (
            <div className="elective-category" key={category}>
              <h4>{category}</h4>
              {techElectiveData
                .filter((row) => row["Category"] === category)
                .filter((row) => selectedCourses.includes(row["Course"]))
                .map((row) => (
                  <div className="course-selection-item" key={row["Course"]}>
                    <input
                      type="checkbox"
                      value={row["Course"]}
                      checked={selectedCourses.includes(row["Course"])}
                      onChange={handleCheck}
                    />
                    <label>
                      {row["Course"]} - {row["Name"]}
                    </label>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectiveSelection;
