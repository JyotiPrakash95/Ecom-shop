import Style from "./orders.module.css";
import { useEffect, useState } from "react";
import { useValue } from "../../components/context";
import { ref, onValue } from "firebase/database";
import { auth, database } from "../../firebaseInIt";
import Loader from "../../components/loader/Loader";

// orders
function Orders() {
  const [orderItems, setOrderItems] = useState([]);
  const { isLoading, setIsLoading } = useValue();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("User not found");
      return; // Return early if the user is not authenticated
    }

    const userId = user.uid; // current UserID
    const orderRef = ref(database, `myOrders/${userId}`);

    onValue(orderRef, (snapshot) => {
      setIsLoading(true);
      const data = snapshot.val();
      const ordersArray = data ? Object.values(data) : [];
      setOrderItems(ordersArray.reverse());
      setIsLoading(false);
    });
  }, [setIsLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1 className={Style.page_title}>Your Orders Empty</h1>
      <div className={Style.order_container}>
        {orderItems.length === 0 ? (
          <p className={Style.no_order}>{null}</p>
        ) : (
          orderItems.map((order, index) => (
            <div key={index} className={Style.order_item}>
              <div className={Style.order_date}>
                <p>Order placed on: {order.date}</p>
              </div>
              <table className={Style.order_table}>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <td>{item.title}</td>
                      <td>₹{item.price}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.qty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={Style.order_total}>Order Total: ₹{order.total}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Orders;
