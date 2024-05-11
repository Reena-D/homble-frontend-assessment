import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const {id} = useParams();

  const toggle = () => {
    setOpen(!open);
  };
  const toggle1 = () => {
    setOpen1(!open1);
  };
  const toggle2 = () => {
    setOpen2(!open2);
  };

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`https://frontend-assessment-server.onrender.com/api/products/${id}`);
      const product = await response.json();
      setProduct(product);      
    }

    fetchProduct();   
  }, [id]);

  if (!product) {
    return <div className="m-5 text-lg font-semibold text-blue-700">Loading...</div>
  }

  return (
    <div className="m-5">
      
    <Link to={"/products"} className=" bg-red-400 text-lg font-medium p-3 rounded-lg">Go Back</Link>
    

    <div className="grid lg:grid-cols-3 m-20 gap-2">
      <img className="rounded-2xl h-21 w-21" src={product.productImage} alt="product_image" />
      <div className="flex flex-col ">
      <h1 className="text-2xl font-semibold font-sans px-3 py-3 m-2 my-5 border-solid bg-white rounded-lg shadow-md gap-3">{product.name}</h1>
      <div className="px-3 py-3 m-2 my-5 border-solid bg-white rounded-lg shadow-md gap-3">
        <p className=" font-semibold text-xl">Product Description:</p>
        <span className="text-lg">{product.description}
        <button onClick={toggle} className="text-sky-800 m-2 ">View More</button>
    {open && (
      <div className="toggle">
        <h4>More Info</h4>
      </div>
    )}
      </span>
      </div>
      <div className="px-3 py-3 m-2 my-5 border-solid bg-white rounded-lg shadow-md gap-3">
        <p className=" font-semibold text-xl">Allergen Info:</p>
        <span className="text-lg">{product.allergen_info}
        <button onClick={toggle1} className="text-sky-800 m-2 ">View More</button>
    {open1 && (
      <div className="toggle">
        <h4>More Info</h4>
      </div>
    )}
      </span>
      </div>
      <div className="px-3 py-3 m-2 my-5 border-solid bg-white rounded-lg shadow-md gap-3">
        <p className=" font-semibold text-xl">Cooking Instruction:</p>
        <span className="text-lg">{product.cooking_instruction}
        <button onClick={toggle2} className="text-sky-800 m-2 ">View More</button>
    {open2 && (
      <div className="toggle">
        <h4>More Info</h4>
      </div>
    )}
      </span>
      </div>
      </div>
      <div className="px-3 py-3 m-2 my-5 border-solid bg-white rounded-lg shadow-md gap-3 flex h-12">
        <p className=" font-semibold text-xl">Price:</p>
        <span className="text-xl text-green-600 font-medium">₹{product.selling_price}
      </span>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;