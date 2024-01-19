import Style from "./cart.module.css";
import { useEffect } from "react";
import { useValue } from "../../components/context";
import { ref, get } from "firebase/database";
import { database, auth } from "../../firebaseInIt";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

// cart
function Cart() {
  const {
    cartItems,
    setCartItems,
    cartTotal,
    setCartTotal,
    handleRemove,
    handleAdd,
    handleDecrease,
    placeOrder,
    isLoading,
    setIsLoading,
  } = useValue();

  /** ------------------ Fetches data from database ------------------ **/
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("user not found ", user);
      return; // Return early if the user is not authenticated
    }

    const userId = user.uid;
    const cartRef = ref(database, `usersCarts/${userId}/myCart`);
    const cartTotalRef = ref(database, `usersCarts/${userId}/cartTotal`);

    const fetchCartData = async () => {
      setIsLoading(true);
      try {
        const [cartSnapshot, cartTotalSnapshot] = await Promise.all([
          get(cartRef),
          get(cartTotalRef),
        ]);
        if (cartSnapshot.exists() && cartTotalSnapshot.exists()) {
          const cartData = cartSnapshot.val();
          const cartItemsArray = Object.values(cartData);
          const cartTotalValue = cartTotalSnapshot.val();

          setCartItems(cartItemsArray);
          setCartTotal(cartTotalValue);
        } else {
          setCartItems([]);
          setCartTotal(0);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
      setIsLoading(false);
    };
    fetchCartData();
  }, [setCartItems, setCartTotal, setIsLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={Style.container}>
      {cartItems.length === 0 ? (
        <p className={Style.cartEmpty}>Cart is Empty! </p>
      ) : (
        <>
          <div className={Style.infoContainer}>
            <h1>Cart</h1>
            {cartTotal === undefined || cartTotal === 0 ? (
              ""
            ) : (
              <div className={Style.orderDiv}>
                <h2>Total: ₹{cartTotal}</h2>
                <br />
                <button onClick={() => placeOrder()} className={Style.orderBtn}>
                  Purchase
                </button>
              </div>
            )}
          </div>
          <ul className={Style.itemList}>
            {cartItems.map((item) => (
              <li key={item.id} className={Style.item}>
                <div className={Style.itemImage}>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className={Style.itemDetails}>
                  <h3>{item.title}</h3>
                  <div className={Style.quantityControls}>
                    {" "}
                    <p>Price: ₹{item.price}</p>
                    <div>
                      <button
                        className={Style.decreaseButton}
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <span className={Style.quantity}>{item.qty}</span>
                      <button
                        className={Style.increaseButton}
                        onClick={() => handleAdd(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={Style.removeButton}
                    onClick={() => handleRemove(item)}
                  >
                    Remove From Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Cart;
