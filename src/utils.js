export const sampleData = [
  {
    schoolClass: "Class 9",
    isChecked: false,
    classSections: [
      {
        sectionName: "Section A",
        isChecked: false,
        students: [
          {
            studentsName: "Saksham",
            isChecked: false,
          },
          {
            studentsName: "Mohammad",
            isChecked: false,
          },
          {
            studentsName: "Suman",
            isChecked: false,
          },
          {
            studentsName: "Divya",
            isChecked: false,
          },
        ],
      },
      {
        sectionName: "Section B",
        isChecked: false,
        students: [
          {
            studentsName: "Saksham",
            isChecked: false,
          },
          {
            studentsName: "Mohammad",
            isChecked: false,
          },
          {
            studentsName: "Suman",
            isChecked: false,
          },
          {
            studentsName: "Divya",
            isChecked: false,
          },
        ],
      },
      {
        sectionName: "Section C",
        isChecked: false,
        students: [
          {
            studentsName: "Saksham",
            isChecked: false,
          },
          {
            studentsName: "Mohammad",
            isChecked: false,
          },
          {
            studentsName: "Suman",
            isChecked: false,
          },
          {
            studentsName: "Divya",
            isChecked: false,
          },
        ],
      },
    ],
  },
];



export const checkUncheckAll = (prev, checkedStatus) => {
  return prev.map((classItem) => {
    return {
      ...classItem,
      isChecked: checkedStatus,
      classSections: classItem.classSections.map((sectionItem) => {
        return {
          ...sectionItem,
          isChecked: checkedStatus,
          students: sectionItem.students.map((student) => {
            return {
              ...student,
              isChecked: checkedStatus,
            };
          }),
        };
      }),
    };
  });
};

export const checkUncheckSectionItems = (prev, checkedStatus, selectIndex) => {
  let isAllSectionChecked = true;
  const updatedData = prev.map((classItem) => {
    return {
      ...classItem,
      classSections: classItem.classSections.map(
        (sectionItem, sectionIndex) => {
          if (selectIndex === sectionIndex) {
            isAllSectionChecked = isAllSectionChecked && !sectionItem.isChecked;
          } else {
            isAllSectionChecked = isAllSectionChecked && sectionItem.isChecked;
          }
          return {
            ...sectionItem,
            isChecked:
              selectIndex === sectionIndex
                ? checkedStatus
                : sectionItem.isChecked,
            students: sectionItem.students.map((student) => {
              return selectIndex === sectionIndex
                ? {
                    ...student,
                    isChecked: checkedStatus,
                  }
                : {
                    ...student,
                  };
            }),
          };
        }
      ),
    };
  });

  updatedData[0].isChecked = isAllSectionChecked;

  return updatedData;
};

export const checkUncheckStudents = (
  prev,
  checkedStatus,
  selectedSectionIndex,
  selectedStudentIndex
) => {
  const updatedData = prev.map((classItem) => {
    let isAllSectionChecked = true;
    const classData = {
      ...classItem,
      classSections: classItem.classSections.map(
        (sectionItem, sectionIndex) => {
          let isStudentsChecked = true;
          const sectionData = {
            ...sectionItem,
            students: sectionItem.students.map((student, studentIndex) => {
              if (
                selectedSectionIndex === sectionIndex &&
                studentIndex === selectedStudentIndex
              ) {
                isStudentsChecked = isStudentsChecked && !student.isChecked;
              } else {
                isStudentsChecked = isStudentsChecked && student.isChecked;
              }
              return selectedSectionIndex === sectionIndex &&
                studentIndex === selectedStudentIndex
                ? {
                    ...student,
                    isChecked: checkedStatus,
                  }
                : {
                    ...student,
                  };
            }),
          };
          sectionData.isChecked = isStudentsChecked;
          isAllSectionChecked = isAllSectionChecked && sectionData.isChecked;
          return sectionData;
        }
      ),
    };
    classData.isChecked = isAllSectionChecked;
    return classData;
  });

  return updatedData;
};
