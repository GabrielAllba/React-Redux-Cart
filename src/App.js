import Cart from './components/Cart/Cart';
import { Fragment } from 'react';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect} from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitital = true;

function App() {

  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {

    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data'
      }))

      const response = await fetch("https://react-cart-d0778-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if(!response.ok){
        throw new Error('Sending cart data failed!')
      }

      dispatch(
        uiActions.showNotification({
          status: "Success",
          title: "Success...",
          message: "Sent cart data successfully",
        })
      );

      const responseData = await response.json()
    }

    if(isInitital){
      isInitital=false;
      return
    }

    sendCartData().catch(error => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "Sending cart data error",
        })
      );
    })
  },[cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}></Notification>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
