import React from "react";

export default function PopUpBorrowGame({ trigger, data }) {
  console.log(trigger);
  if (trigger) {
    return (
      <div className="popup">
        <div>i czarno</div>zielono mi
      </div>
    );
  } else {
    return "";
  }
}
