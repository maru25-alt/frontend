import React from "react";
import { useForm } from "react-hook-form";

function CreatNotice({
  date,
  setdate,
  title,
  settitle,
  handleCreate,
  loading,
  description,
  setdescription,
}) {
  const { register, handleSubmit, errors } = useForm();

  const handleCancel = (e) => {
    e.preventDefault();
    setdate("");
    settitle("");
    setdescription("");
  };

  return (
    <div className="content__container mb-5">
      <h3>Create A Notice</h3>
      <form className="row" action="">
        <div className="col-md-6 mb-5">
          <label className="form-label">Title</label>
          <input
            type="text"
            ref={register({ required: true })}
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="form-control py-4"
            name="title"
          />
          {errors.title && (
            <div className="text-danger">This field is required</div>
          )}
        </div>
        <div className="col-md-6 mb-5">
          <label className="form-label">Date</label>
          <input
            type="date"
            value={date}
            ref={register({ required: true })}
            onChange={(e) => setdate(e.target.value)}
            className="form-control py-4"
            name="date"
          />
          {errors.date && (
            <div className="text-danger">This field is required</div>
          )}
        </div>
        <div className="col-md-12 mb-5">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            rows={5}
            className="form-control"
            name="description"
          />
        </div>
        {/* <div className="col-md-6 mb-5">
                        <label  
                           className="form-label">
                            Created By
                        </label>
                        <input 
                            type="text" 
                            ref={register({ required: true})} 
                            value={createdby}
                            onChange={e => setcreatedby(e.target.value)}
                            className="form-control  py-4" 
                            name="createdby"/>
                    </div>  */}
        <div className="row">
          <div className="col-2">
            <button
              disabled={loading}
              onClick={handleSubmit(handleCreate)}
              className="btn blue__btn"
            >
              Create
            </button>
          </div>
          <div className="col-2">
            <button
              disabled={loading}
              onClick={handleCancel}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatNotice;
