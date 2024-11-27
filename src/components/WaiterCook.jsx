import React, { useState } from "react";
import OrderCard from "./OrderCard";
import Plusbutton from "./Plusbutton";


export function WaiterCook() {


  return (
    <>
     
      <div style={{ display: "flex", gap: "50px" }}>
        <Plusbutton  />
       
          <OrderCard />
          <OrderCard />
      
      </div>
    </>
  );
}
