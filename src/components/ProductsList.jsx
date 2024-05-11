import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import Modal from './Modal';


export const LoadingCard = () => {
  return (
      <div class="px-3 py-3 m-2 my-5 border-solid bg-white rounded-xl shadow-md gap-3 h-100">
          <div class="w-full h-64 bg-gray-300 rounded-xl animate-pulse"></div>
          <div class="px-6 py-4 items-center">
              <div class="font-regular text-xl mb-2 w-20 h-4 bg-gray-300 animate-pulse"></div>
          </div>
      </div>
  );
};

const ProductsList = ({id}) => {

    const [products, setProducts] =useState();
    const [loading, setLoading] = useState();
    const [open, setOpen] = useState(false);
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        allergen_info: ''
      });
    

    const fetchProducts = async () => {
      setLoading(true);
      setTimeout( async() => {
        try {
            const {data} = await axios.get(`https://frontend-assessment-server.onrender.com/api/products`);
            data.sort((a,b) => a.selling_price - b.selling_price)
            setProducts(data);
          setLoading(false);
            console.log(data);
        }catch (err) {
            console.log(err);
        };
      }, 3000);
    };

    useEffect(() =>{
        setLoading(true);
        fetchProducts();
    },[])

   
    const handleClose = () => {
        setOpen(false);
    };
 
    const handleAddProduct = () => {
        setOpen(true);
    };

    const handleAdd = async (e) => {
      e.preventDefault();
  
      const response = await fetch(`https://frontend-assessment-server.onrender.com/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
     // const result = await response.json();
      console.log(response);
      console.log(productData);
  
      if (response.ok) {
        alert('Product Created Successfully');
        handleClose();
      } else {
        alert('Failed to create product');
      }
    };
    

  return (
    <>
    <div>

      {loading === false &&

    <div className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 '>
       
      {
        products?.map((product) =>{
      return (
        <div className='px-3 py-3 m-2 my-5 border-solid bg-white rounded-lg shadow-md gap-3'>
            <Link to={`/products/${product.id}`}>
           <img className='rounded-2xl h-21 w-21' src={product.productImage} alt={product}/>
           <p className=' text-xl font-semibold p-3 font-sans'>
            {product.name}
            <span className='text-xl font-semibold p-4 text-green-600 font-sans'>₹{product.selling_price}</span>
           </p>
           </Link>
        </div>
      
           )
        })
      }
    </div>
}

{loading === true && (
    <div className="grid grid-cols-3 gap-4 content-start ">
    {products?.map(num => {return <LoadingCard />})}
    </div>
)}  
{ loading === false &&
      <>
    <button className="bg-[#f3de34] m-10 w-40 h-12 rounded-lg font-medium text-lg" onClick={handleAddProduct}>Add Product</button>
     <Modal className="" isOpen={open} onClose={handleClose}>
     <button className="bg-slate-400 w-5 rounded-sm" type="close" onClick={handleClose} >X</button>

      <div className="flex flex-col m-4 py-5 gap-3">
    
        <input className="m-2 p-5 outline" type="text" placeholder='Product Name'
        
        name="name"
        value={productData.name}
        onChange={(event) => setProductData({ ...productData, name: event.target.value })}
      />
      <input
        className="m-2 p-5 outline" type="text" placeholder='Product Description'
        name="description"
        value={productData.description}
        onChange={(event) => setProductData({ ...productData, description: event.target.value })}
      />
      <input
        className="m-2 p-5 outline" type="text" placeholder='Product Allergen-Info'
        name="description"
        value={productData.allergen_info}
        onChange={(event) => setProductData({ ...productData, allergen_info: event.target.value })}
      />
            <div className='grid justify-items-end m-3'>
            <button className="bg-[#3b8eca] w-40 h-12 rounded-lg font-medium text-lg " type="button" onClick={handleAdd}>Add</button>
            </div>
            </div>
        </Modal>
        </>
        }     
       
   </div> 
   </>
  )
}

export default ProductsList;
