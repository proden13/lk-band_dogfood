import Logo from "./Logo";
import SearchHeader from "../SearchHeader";
import login_ico from "../../assets/icons/login_ico.svg";
import { Link } from "react-router-dom";
import { 
    Folder2, 
    Star, 
    Cart4, 
    PersonSquare, 
    BoxArrowInRight
} from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import Search from "../Search";

const Header = ({user, setModalActive, setGoods, serverGoods}) => {
    
    const navigate = useNavigate();
    const [likeCnt, setLikeCnt] = useState(0);
    const [cartCnt, setCartCnt] = useState(0);
    useEffect(() => {setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem("rockId"))).length)}, [serverGoods]);
    const logIn = (e) => {
        e.preventDefault();
        //setUser("lk-band")
        //localStorage.setItem("rockUser", "lk-band");
        setModalActive(true);
        navigate("/profile")
    }

    return <header>
        <Logo/>
    
        <div className="search">
            <SearchHeader arr={serverGoods} upd={setGoods} />
        </div>
        <nav className="header__menu">
            {/* Если пользователь === true */}
            {user && <>
                <Link to="/catalog" title="Каталог">
                    <Folder2/>
                </Link>
                <Link to="/" title="Избранное">
                    <Star/>
                </Link>
                <Link to="/" title="Корзина">
                    <Cart4/>
                </Link>
                <Link to="/profile" title="Профиль">
                    <PersonSquare/>
                </Link>
            </>}
            {!user && <a href="" onClick={logIn} title="Войти">
                <BoxArrowInRight/>
            </a>}
        </nav>
    </header>
}

export default Header;