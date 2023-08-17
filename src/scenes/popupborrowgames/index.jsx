import React from "react";
import Popup from "reactjs-popup";

export default function PopUpBorrowGame({ trigger, data }) {
  console.log(trigger);
  console.log(data);

  return (
    <div
      style={{
        height: "auto",
        width: "auto",
        border: "1px solid black",
        backgroundcolor: "red",
        color: "black",
      }}
    >
      <div className="window">{data}</div>
    </div>
  );
  //   if (trigger) {
  //     return (
  //       <Popup>
  //         <div>{data}</div>
  //       </Popup>
  //     );
  //   } else {
  //     return "";
  //   }
}
