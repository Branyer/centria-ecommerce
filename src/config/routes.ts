import Home from "../components/Home"
import PaymentForm from "../components/PaymentForm"
import ShoppingCart from "../components/ShoppingCart"
import IRoute from "../interfaces/route"

const routes: IRoute[] = [
    {
        path: "/",
        exact: true,
        component: Home,
    },
    {
        path: "/paymentForm",
        exact: true,
        component: PaymentForm,
    },
    {
        path: "/shoppingCart",
        exact: true,
        component: ShoppingCart,
    },
]

export default routes