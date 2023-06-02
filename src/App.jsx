/*
    Зачем здесь LS?
    Когда я запускаю программу, я сразу хочу видеть данные
    Но сервер говорит - у тебя нет токена, значит тебя нет, значит данных не будет (ИБ)

    Я вошла в систему и получила токен, поработала с данными и выключила React

    Когда я зайду снова - мне снова прийдется авторизоваться (чтобы получить токен)

    Что делать?

    Создавать переменную
    token="ey1242325..."

    При работе с облачными ресурсами (github) можно скомпроментировать свой токен и робот, получивший токен может обрушить нам всю БД

    Что делать?
    Созранить его в браузер

    localStorage.getItem("token")

    UserName и userId в ls можно и не хранить - можно принимать решение о том, что должно, а что не должно быть в LS самостоятельно

    Если у меня есть токен и он хр в переменной, а инф-я об имени пользователя нужна только в ЛК => Открыть страницу профиля и отправляем запрос на получение данных о пользователе, после чего отображаем их
*/

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// компоненты (кусочки кода, которые используются многократно)
import { Header, Footer } from "./components/General";
import Modal from "./components/Modal";
import Search from "./components/Search";


import Promo from "./components/Promo/Promo";
import PromoLukovnikov from "./components/PromoLukovnikov/PromoLukovnikov";
import PromoFlex from "./components/PromoFlex/PromoFlex";
import banner_pic_1 from "./assets/images/banner_pic_1.png";
import banner_pic_2 from "./assets/images/banner_pic_2.png";
import banner_pic_3 from "./assets/images/banner_pic_3.png";
import banner_pic_4 from "./assets/images/banner_pic_4.png";
import banner_pic_5 from "./assets/images/banner_pic_5.png";
import banner_pic_6 from "./assets/images/banner_pic_6.png";
import cardsData from "./assets/data"; //data.json//


// страницы - отдельный компонент со своим набором компонентов
import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Card from "./components/Card";
import Favorites from "./pages/Favorites"

/*
    TODO: проработать материал с лекции:
    - Изменить ссылки на Link внутри Logo и Footer
    - После входа перенаправлять пользователя на страница профиля (useNavigate)
    - В подвал добавить ссылку на Draft
*/

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("rockUser"));
    const [token, setToken] = useState(localStorage.getItem("rockToken"));
    const [userId, setUserId] = useState(localStorage.getItem("rockId"));
    // Товары из БД
    const [serverGoods, setServerGoods] = useState([]);
    // Товары для поиска и филтрации
    const [goods, setGoods] = useState(serverGoods);

    const [modalActive, setModalActive] = useState(false);

    // useEffect срабатывает каждый раз, когда компонент создался или перерисовался
    useEffect(() => {
        if (token) {
            fetch("https://api.react-learning.ru/products", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setServerGoods(data.products);
                    // setServerGoods(data.products.sort((a,b) => new Date (b.created_at).getTime() - new Date (a.created_at).getTime()));
                })
        }
    }, [token])

    useEffect(() => {
        if (!goods.length) {
            //console.log("товары с сервера подгрузились");
            setGoods(serverGoods);
        }
    }, [serverGoods]);

    // useEffect(() => {
    //     console.log("Модалка изменилась")
    // }, [modalActive])

    useEffect(() => {
        console.log("User was changed")
        if (user) {
            setToken(localStorage.getItem("rockToken"));
            setUserId(localStorage.getItem("rockId"));
        }
        else {
            setToken("");
            setUserId("");
        }
        console.log("U ", user);
        console.log("t ", token);
    }, [user]);

    return (
        <React.Fragment>

            <Header
                user={user}
                setModalActive={setModalActive}
                setGoods={setGoods}
                serverGoods={serverGoods} />
            {/* <MobileMenu user={user} setModalActive={setModalActive} /> */}
            <main>

                <Search arr={serverGoods} upd={setGoods} />
                {/*SPA - Single Page Application */}
                {/*
            <nav>
                <Link to="/"> Главная</Link>
                <Link to="/catalog"> Каталог</Link>
                <Link to="/draft"> Старый код</Link>
            </nav>*/}

                <Routes>
                    <Route path="/" element={<Main />} />

                    <Route path="/catalog" element={<Catalog goods={goods} setServerGoods={setServerGoods} serverGoods={serverGoods} />} />

                    <Route path="/draft" element={<Draft />} />

                    <Route path="/profile" element={<Profile user={user} setUser={setUser} color="yellow" />} />

                    <Route path="/product/:id" element={<Product token={token} />} />

                    <Route path="/favorites" element={<Favorites goods={goods} userId={userId} setServerGoods={setServerGoods} />} />
                </Routes>

                <PromoFlex type="lg" header="Подарок за первый заказ!" text="Лёгкое говяжье — пластины" pic={banner_pic_1} />
                <Card img={goods[0]?.pictures} name={goods[0]?.name} price={goods[0]?.price} _id={goods[0]?._id} discount={goods[0]?.discount} likes={goods[0]?.likes} />
                <Card img={goods[1]?.pictures} name={goods[1]?.name} price={goods[1]?.price} _id={goods[1]?._id} discount={goods[1]?.discount} likes={goods[1]?.likes} />
                <Card img={goods[2]?.pictures} name={goods[2]?.name} price={goods[2]?.price} _id={goods[2]?._id} discount={goods[2]?.discount} likes={goods[2]?.likes} />
                <Card img={goods[3]?.pictures} name={goods[3]?.name} price={goods[3]?.price} _id={goods[3]?._id} discount={goods[3]?.discount} likes={goods[3]?.likes} />


                <PromoFlex header="Наборы для дрессировки" text="от 840 ₽" pic={banner_pic_6} />
                <PromoFlex header="Микс масел" text="пищевая здоровая натуральная добавка" pic={banner_pic_3} />

                <Card img={goods[4]?.pictures} name={goods[4]?.name} price={goods[4]?.price} _id={goods[4]?._id} discount={goods[4]?.discount} />
                <Card img={goods[5]?.pictures} name={goods[5]?.name} price={goods[5]?.price} _id={goods[5]?._id} discount={goods[5]?.discount} />
                <Card img={goods[6]?.pictures} name={goods[6]?.name} price={goods[6]?.price} _id={goods[6]?._id} discount={goods[6]?.discount} />
                <Card img={goods[7]?.pictures} name={goods[7]?.name} price={goods[7]?.price} _id={goods[7]?._id} discount={goods[7]?.discount} />

                <PromoFlex header="Рога северного оленя" text="от 10 до 30 кг" pic={banner_pic_2} />
                <PromoFlex header="Слипы из шеи индейки" text="100 % натуральное" pic={banner_pic_4} />

                <Card img={goods[8]?.pictures} name={goods[8]?.name} price={goods[8]?.price} _id={goods[8]?._id} discount={goods[8]?.discount} />
                <Card img={goods[9]?.pictures} name={goods[9]?.name} price={goods[9]?.price} _id={goods[9]?._id} discount={goods[9]?.discount} />
                <Card img={goods[10]?.pictures} name={goods[10]?.name} price={goods[10]?.price} _id={goods[10]?._id} discount={goods[10]?.discount} />
                <Card img={goods[11]?.pictures} name={goods[11]?.name} price={goods[11]?.price} _id={goods[11]?._id} discount={goods[11]?.discount} />


                <PromoFlex type="lg" header="Подарок за десятый заказ!" text="Лёгкое говяжье — кубики" pic={banner_pic_5} />

            </main>

            <Footer />
            <Modal active={modalActive} setActive={setModalActive} setUser={setUser} />
        </React.Fragment>
    )
}

export default App;