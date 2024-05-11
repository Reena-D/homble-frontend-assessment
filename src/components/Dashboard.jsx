import React, { useState, useEffect } from 'react';
import axios from "axios";

const Dashboard = () => {

    const [products, setProducts] = useState();

    const fetchProducts = async () => {      
          try {
              const {data} = await axios.get(`https://frontend-assessment-server.onrender.com/api/dashboard`);            
              setProducts(data);
              console.log(data);
          }catch (err) {
              console.log(err);
          };      
      };
  
      useEffect(() =>{        
          fetchProducts();
      },[])

      const handleSortId= async () =>{
        const {data} = await axios.get(`https://frontend-assessment-server.onrender.com/api/dashboard`);
        setProducts(data)
      }
      const handleSortName= async () =>{
        const {data} = await axios.get(`https://frontend-assessment-server.onrender.com/api/dashboard`);
        data.sort((a, b) => a.name.localeCompare(b.name))
        setProducts(data)
      }

      const handleSortPrice= async () =>{
        const {data} = await axios.get(`https://frontend-assessment-server.onrender.com/api/dashboard`);
        data.sort((a,b) => a.selling_price - b.selling_price)
        setProducts(data)
      }

  return (
    <div>
     <input type='text' className='w-80 p-3 bg-zinc-300 outline-none rounded-md m-8' placeholder='Search Product Name or Id'/>
      <div className="App">
        <button onClick={handleSortId} className='m-8 bg-red-300 rounded-lg h-10 w-32'>Sort By Id</button>
        <button onClick={handleSortName} className='m-8 bg-red-300 rounded-lg h-10 w-32'>Sort By Name</button>
        <button onClick={handleSortPrice} className='m-8 bg-red-300 rounded-lg h-10 w-32'>Sort By Price</button>
            <table className='table'>
                <tr className='m-2 p-2 text-orange-500'>
                    <th></th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Selling Price</th>
                </tr>
                {products?.map((val, key) => {
                    return (
                        <tr key={key} className='font-semibold'>
                            <input type="checkbox" className=''/>
                            <td className='px-5'>{val.id}</td>
                            <td className='px-5'>{val.name}</td>
                            <td className='px-5'>₹{val.selling_price}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    </div>
  )
}

export default Dashboard
