import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../store/axios";
import { getYearsPast } from "../../../utils";

function Search({
  year,
  setyear,
  term,
  setterm,
  handleSearch,
  setlistValue,
  listValue,
  loading,
}) {
  const { register, handleSubmit, errors } = useForm();
  const years = getYearsPast(10);
  const [classes, setclasses] = useState([]);

  useEffect(() => {
    axios.get("/classes").then((res) => {
      setclasses(res.data);
    });
  }, []);

  return (
    <form action="" className="row">
      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">Year</label>
        <div className="">
          <select
            value={year}
            ref={register({ required: true })}
            onChange={(e) => setyear(e.target.value)}
            name="year"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {years &&
              years.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
          </select>
        </div>
        {errors.year && (
          <span className=" form-error text-danger mb-2">
            This field is required
          </span>
        )}
      </div>
      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">Term</label>
        <div className="">
          <select
            value={term}
            ref={register({ required: true })}
            onChange={(e) => setterm(e.target.value)}
            name="term"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            <option value="1">1st</option>
            <option value="1">2rd</option>
            <option value="1">3rd</option>
          </select>
        </div>
      </div>
      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">Class</label>
        <div className="">
          <select
            value={listValue}
            ref={register({ required: true })}
            onChange={(e) => setlistValue(e.target.value)}
            name="term"
            className="form-select"
          >
            <option hidden defaultValue>
              Select
            </option>
            {classes &&
              classes.map((e) => (
                <option key={e.classCode} value={e.classCode}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="col-sm-6 col-mb-4 mb-3">
        <div className="mt-4">
          <button
            disabled={loading}
            onClick={handleSubmit(handleSearch)}
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default Search;
