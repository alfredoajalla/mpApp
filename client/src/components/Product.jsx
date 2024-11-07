import "./Product.css";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from "axios";
import { useState } from "react";

function Product() {
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago('TEST-PUBLIC-KEY', {
    locale: "es-AR"
  });

  const createPreference = async () => {
    try {
      const response = await axios.post("https://vcvmod-ip-138-121-106-252.tunnelmole.net/create_preference", {
        title: "choclito de la puna",
        quantity: 1,
        price: 1000,
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error)
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className="card-product-container">
      <div className="card-product">
        <div className="card">
          <img src="https://plus.unsplash.com/premium_photo-1664299124175-e2c793325bfa?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Product Image" />
          <h3>Choclito de la puna</h3>
          <p className="price">$1000</p>
          <button onClick={handleBuy}>Comprar</button>
          {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />}

        </div>
      </div>
    </div>
  )
}

export default Product