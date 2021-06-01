import Home from "../components/Home"
import PaymentForm from "../components/PaymentForm"
import ShoppingCart from "../components/ShoppingCart"
import ShoppingRecord from "../components/ShoppingRecord"
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
    {
        path: "/shoppingRecord",
        exact: true,
        component: ShoppingRecord,
    },
]

export default routes