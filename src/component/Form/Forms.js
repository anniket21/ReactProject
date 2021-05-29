import React, { useEffect, useState } from 'react';
import axios  from 'axios';
import Items from '../Items/Items';
import './Forms.css';



const Forms = ()=>{
const [items,setItems]=useState({});
const [filteredItems,setFilteredItem]=useState({});
useEffect(()=>{
    axios.get("http://my-json-server.typicode.com/habilelabs/fake-products/products").
 then(response=>{
    const data =response.data || [];
    const tempItems = {};
    data.forEach(val=>{
        let category= val.category || "";
         if(!tempItems[category]){
            tempItems[category] = [] 
         }
         tempItems[category].push(val)
    })
    setItems(tempItems);
    setFilteredItem(tempItems);
     
 })
 .catch(error=>{
     console.log("error",error);
 })
},[])
const searchItems = (e) => {
    let val = e.target.value.toLowerCase();
    let newItems = { ...items };
    let [category1,category2]= Object.keys(newItems);
    let categoryArray1 = [...newItems[category1]];
    let categoryArray2 = [...newItems[category2]];
    categoryArray1 =   categoryArray1.filter( (item) => {
        return (item.name.toLowerCase().indexOf(val) != -1)
      });
     
      categoryArray2 = categoryArray2.filter( (item) => {
        return (item.name.toLowerCase().indexOf(val) != -1)
      });
     
    newItems= {...newItems,[category1]:categoryArray1,[category2]:categoryArray2};
    setFilteredItem({...newItems})
}
const filterInStockItems=(e)=>{
 
        let checked = e.target.checked;
        let newItems = { ...items };
        if(checked){
          
            let [category1,category2]= Object.keys(newItems);
            let categoryArray1 = [...newItems[category1]];
            let categoryArray2 = [...newItems[category2]];
            categoryArray1 =   categoryArray1.filter( (item) => {
                return (item.stocked)
              });
             
              categoryArray2 = categoryArray2.filter( (item) => {
                return (item.stocked)
              });
             
            newItems= {...newItems,[category1]:categoryArray1,[category2]:categoryArray2};
            
    
        }
        setFilteredItem({...newItems})
}

return(
    <>
    <div className="forms">
<form>
<input type="text"
 placeholder="Search..."   
 onKeyUp = {searchItems}

 />
 <br></br>
<input type="checkbox"
  id=""
    onChange={filterInStockItems}
    />
 <label id="label">Only shown product in stock</label>
</form>
</div>
 <Items data={filteredItems}/>
</>
);
} 

export default Forms;

