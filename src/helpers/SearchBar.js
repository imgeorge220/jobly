import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = evt => {
    const { value } = evt.target;
    setSearch(value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    handleSearch(search);
  }

  return (
    <form className="form-inline mb-3" onSubmit={handleSubmit}>
      <input className="form-control-lg flex-grow-1"
        type="search"
        name="search"
        value={search}
        placeholder="Search"
        onChange={handleChange} />
      <button className="btn btn-primary btn-lg my-2 my-sm-0" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;