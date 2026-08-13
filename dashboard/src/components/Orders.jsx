import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://zerodha-stxd.onrender.com/orders"
        );

        console.log("Orders received:", response.data);

        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

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
              <li
                key={order._id}
                className="order-item"
              >
                <strong>{order.name}</strong> -{" "}
                {order.mode} {order.qty} shares @ ₹
                {order.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;