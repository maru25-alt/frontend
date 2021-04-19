import React from "react";
import { monthYear } from "../../data";
//import moment from "moment";
//import axios from "../../store/axios";

const date = new Date();
const month = date.getMonth();
var year = date.getFullYear();
//var daysInMonth = new Date(year, month + 1, 0).getDate();
//var start = new Date(year, month, 1);

function AttendanceTabs() {
  // const [dates, setdates] = useState([]);
  // const [datas, setdatas] = useState([]);

  // useEffect(() => {
  //   let arr = [];
  //   let d = [];
  //   for (var i = 0; i < daysInMonth; i++) {
  //     arr.push(moment(start).add(i, "day").format("dd D MMM YYYY"));
  //     d.push(Math.floor(Math.random() * Math.floor(100)));
  //   }
  //   setdates(arr);
  // }, []);

  // useEffect(() => {
  //   axios.get("/count/attendance").then((res) => {
  //     setdatas(res.data.map((e) => e.value));
  //   });
  // }, []);

  return (
    <div>
      <h3 className="mb-5">
        Attendance Report for {monthYear[month]?.name} {year}
      </h3>
    </div>
  );
}

export default AttendanceTabs;
