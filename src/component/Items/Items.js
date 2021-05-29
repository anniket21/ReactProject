import React from "react";

import "./Items.css";
import ReactHtmlParser from 'react-html-parser';

const Items = (props) => {
    
 const data=props.data || [];
let rows = "";
Object.keys(data).map(category=>{
    if(data[category].length>0){
        rows += `<tr><td  colspan="2"><b>${category}</b></td></tr>`;
        data[category].map(value=>{
             rows += `<tr class =${!value.stocked ? "outofstock" :""}>
             <td>${value.name}</td>
             <td>${value.price}</td>
             </tr>`
         })
    }
   
})
    return (
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
     {ReactHtmlParser(rows)}
     </tbody>
    </table>
  );
};

export default Items;
/* {data.map(val=>{
          return (
            <tr className={!val.stocked ? "outofstock" :""}>
        <td>{val.name}</td>
        <td>{val.price}</td>
      </tr>
          )
      })}


      
*/