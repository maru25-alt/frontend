import React, { useEffect } from "react";

import { selectFees } from "../../store/slices/schoolSlice";
import { useSelector } from "react-redux";

function AcademicTab({ user }) {
  const feesSelector = useSelector(selectFees);

  useEffect(() => {}, [user, feesSelector]);

  return (
    <div className="tab__container">
      <div className="row  mb-3">
        <div className="col-4">Class </div>
        <div className="col-6">{user?.classID} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Student Status </div>
        <div className="col-6">{user?.status} </div>
      </div>

      <div className="row  mb-3">
        <div className="col-4">Last School </div>
        <div className="col-6">{user?.LastSchool?.school || "N/A"} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Reason for Leaving last School </div>
        <div className="col-6"> {user?.LastSchool?.reason || "N/A"} </div>
      </div>
    </div>
  );
}

export default AcademicTab;
