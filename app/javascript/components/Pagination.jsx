import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({total, current, switchPage}) => {

  return (
    <div className="pagination">
      {current > 2 && <p tabIndex={0} onClick={() => switchPage(1)}>{1}</p>}
      {current > 2 && <p className="ellipses">...</p>}
      {current > 1 && <p tabIndex={0} onClick={() => switchPage(current - 1)}>{current - 1}</p>}
      <p className="current">{current}</p>
      {total - current > 1 && <p tabIndex={0} onClick={() => switchPage(current + 1)}>{current + 1}</p>}
      {total - current > 2 && <p className="ellipses">...</p>}
      {total !== current && <p tabIndex={0} onClick={() => switchPage(total)}>{total}</p>}
    </div>
  )
}

export default Pagination;