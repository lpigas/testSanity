import React from "react";
import { useStateContext } from "../../context/StateContext";

function Selector({ data }) {
  const {setTotalExchange, totalExchange} = useStateContext()
  return (
    <select name="select" onChange={(e) => setTotalExchange(e.target.value)} defaultValue={totalExchange}>
      {data &&
        data.map((options) => (
          <option key={options._id} value={options.currency} >
            {options.currency} 
          </option>
        ))}
    </select>
  );
}

export default Selector;
