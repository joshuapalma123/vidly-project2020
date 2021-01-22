import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)} // We race a custom event
      />
    </div>
  );
};

export default SearchBox;
