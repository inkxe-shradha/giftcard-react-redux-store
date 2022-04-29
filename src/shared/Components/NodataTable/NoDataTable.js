import React from "react";

const NoDataTable = ({ type = "received" }) => {
  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>Card Name</th>
          <th>Points</th>
          <th>Card Desc</th>
          <th>{type === "received" ? "Received From" : "Sent To"}</th>
          <th>Issued Date</th>
          <th>Expiry Date</th>
          {type === "received" && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={type === "received" ? "7" : "6"} className="text-center">
            No Gift Card Received
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NoDataTable;
