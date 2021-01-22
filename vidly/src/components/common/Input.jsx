import React from "react";

//The destructured props can be pass as a props for more cleaner code writing by using ({})
const Input = ({ name, label, error, ...rest }) => {
  return (
    //Reusing the component to reduce code duplication
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />

      {/* For bootstrap error message */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
