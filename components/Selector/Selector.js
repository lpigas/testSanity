import React from "react";

function Selector({ data, foundValue }) {
  return (
    <select name="select" onChange={(e) => foundValue(e.target.value)}>
      {data &&
        data.map((options) => (
          <option key={options._id} value={options.currency}>
            {options.currency}
          </option>
        ))}
    </select>
  );
}

export default Selector;
