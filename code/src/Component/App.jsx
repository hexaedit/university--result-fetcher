import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { map1, mustColumn } from "../utils/universalMapper";
export default function App() {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const getData = () => {
    fetch("data/190200040_90_4.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        // console.log(myJson);
        setList(myJson);
        setShow(true);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div style={{ maxWidth: "100%" }}>
      {show && (
        <MaterialTable
          columns={mustColumn(
            [
              "Roll Number",
              "Name",
              "CGPA",
              "Mother&#39;s Name",
              "Father&#39;s Name",
            ],
            map1
          )}
          data={list}
          title="RESULT FETCHER"
        />
      )}
    </div>
  );
}
