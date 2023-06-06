import { HouseFill, CardList, Heart, Bag, PersonCircle } from "react-bootstrap-icons";
// иконки можно найти тут https://icons.getbootstrap.com/ //
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import login_ico from "../../assets/icons/login_ico.svg";
import { useContext } from "react";
import Ctx from "../../context"


const MobileAddCart = () => {
    const { user } = useContext(Ctx);

    return (
        <div className="mobile__add__cart">
        <button className="mobile__add__cart__btn">Добавить в корзину</button>
        </div>
    )
}






export default MobileAddCart;