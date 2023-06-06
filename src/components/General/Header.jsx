import Logo from "./Logo";
import SearchHeader from "../SearchHeader";
import login_ico from "../../assets/icons/login_ico.svg";
import { CardList, Heart, Bag, PersonCircle } from "react-bootstrap-icons";
// иконки можно найти тут https://icons.getbootstrap.com/ //
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useContext } from "react";
import Ctx from "../../context"







const Header = () => {
    const {user} = useContext(Ctx); 
    const {setModalActive} = useContext(Ctx);
    const {serverGoods} = useContext(Ctx);
    
    const navigate = useNavigate();
    const [likeCnt, setLikeCnt] = useState(0);
    const [cartCnt, setCartCnt] = useState(0);
    useEffect(() => {setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem("rockId"))).length)}, [serverGoods]);
    
    const logIn = (e) => {
        e.preventDefault();
        
      
        setModalActive(true);
        navigate("/profile")
    }


    return <header>
        <Logo />
        <div className="search"><SearchHeader /></div>

        <nav className="header__menu">
            {user && <>
                <Link to="/catalog" title="Каталог" className="badge__el"><CardList />
                <span className="badge__item">{serverGoods.length}</span></Link>

                <Link to="/favorites" title="Избранное" className="badge__el"><Heart />
                <span className="badge__item">{likeCnt}</span></Link>

                <Link to="/cart" title="Корзина" className="badge__el"><Bag />
                <span className="badge__item">{cartCnt}</span></Link>
                <Link to="/profile" title="Профиль"><PersonCircle /></Link>



            </>}
            {!user && <Link to="" title="Войти" className="header__ico" onClick={logIn}><img src={login_ico} className="header__ico" alt="Войти" />Войти</Link>}
        </nav>
    </header>
}

export default Header;