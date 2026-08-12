import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const { orders: contextOrders } = useContext(GeneralContext);
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://zerodha-clone-agsc.onrender.com/orders");
        // Assuming response.data is an array of orders
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // Merge backend orders with newly added orders from context
  useEffect(() => {
    // Filter out duplicates based on 'id' in case context already has them
    const allOrders = [...orders, ...contextOrders.filter(o => !orders.some(existing => existing.id === o.id))];
    setOrders(allOrders);
  }, [contextOrders]);

  return (
    <div className="orders">
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          <h2>Your Orders</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <strong>{order.name}</strong> - {order.mode} {order.qty} shares @ ₹{order.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;
