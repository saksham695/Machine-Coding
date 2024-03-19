import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import {
  checkUncheckAll,
  checkUncheckSectionItems,
  checkUncheckStudents,
  sampleData,
} from "./utils";

function App() {
  const [studentsData, setStudentsData] = useState(sampleData);

  const onClassChanged = (event, classIndex) => {
    const checkedStatus = event.target.checked;
    setStudentsData((prev) => {
      const newState = checkUncheckAll(prev, checkedStatus);
      return newState;
    });
  };

  const onSectionChanged = (event, classIndex, sectionIndex) => {
    const checkedStatus = event.target.checked;
    // Current Checkbox state update
    const studentsStateCopy = [...studentsData];
    // studentsStateCopy[classIndex][sectionIndex] = checkedStatus;
    const transformedObject = checkUncheckSectionItems(
      studentsStateCopy,
      checkedStatus,
      sectionIndex
    );
    setStudentsData(transformedObject);
  };

  const onStudentChanged = (event, schoolIndex, sectionIndex, studentIndex) => {
    const checkedStatus = event.target.checked;
    const studentsStateCopy = [...studentsData];
    // studentsStateCopy[schoolIndex][sectionIndex][studentIndex] = checkedStatus
    const transformedObject = checkUncheckStudents(
      studentsStateCopy,
      checkedStatus,
      sectionIndex,
      studentIndex
    );
    setStudentsData(transformedObject);
  };

  return (
    <div className="App">
      <div>
        {studentsData.map((classItem, schoolIndex) => {
          return (
            <div>
              <div style={{ display: "flex" }}>
                <input
                  type={"checkbox"}
                  checked={classItem.isChecked}
                  onChange={(event) => onClassChanged(event, schoolIndex)}
                />
                <div>{classItem.schoolClass}</div>
              </div>
              <div style={{ marginLeft: "10px" }}>
                {classItem.classSections.map((sectionItem, sectionIndex) => {
                  return (
                    <div>
                      <div style={{ display: "flex" }}>
                        <input
                          type={"checkbox"}
                          checked={sectionItem.isChecked}
                          onChange={(e) =>
                            onSectionChanged(e, schoolIndex, sectionIndex)
                          }
                        />
                        <div>{sectionItem.sectionName}</div>
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        {sectionItem.students.map(
                          (studentsItem, studentsIndex) => {
                            return (
                              <div
                                style={{ display: "flex", marginLeft: "10px" }}
                              >
                                <input
                                  type={"checkbox"}
                                  checked={studentsItem.isChecked}
                                  onChange={(e) =>
                                    onStudentChanged(
                                      e,
                                      schoolIndex,
                                      sectionIndex,
                                      studentsIndex
                                    )
                                  }
                                />
                                <div>{studentsItem.studentsName}</div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
