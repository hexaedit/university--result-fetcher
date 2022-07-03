export const map1 = {
  // "DMC Number":"DMC"
  "Mother&#39;s Name": "MotherName",
  "Father&#39;s Name": "FatherName",
  Name: "Name",
  CGPA: "CGPA",
  "Roll Number": "RollNumber",
};
export const mustColumn = (arr, map) =>
  arr.map((e) => ({ title: map[e], field: e }));
