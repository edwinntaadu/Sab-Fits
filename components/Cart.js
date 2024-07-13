import formatMoney from "@/lib/formatMoney";
import CartItem from "./CartItem";
import { useUser } from "./User";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import calcTotalPrice from "@/lib/calcTotalPrice";


export default function Cart() {
    const me = useUser();
    if (!me) return null;
    console.log(me);
  return (
    <CartStyles open={true}>
      <header>
        <Supreme>{me.name}&apos;s Cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem) => (<CartItem key={cartItem.id} cartItem={cartItem} />))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  )
}
