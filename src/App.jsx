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
import { Header, Footer, MobileMenu } from "./components/General";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Ctx from "./context";


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
    const [product, setProduct] = useState({});
    // Товары из БД
    const [serverGoods, setServerGoods] = useState([]);
    // Товары для поиска и филтрации
    const [goods, setGoods] = useState(serverGoods);

    const [modalActive, setModalActive] = useState(false);
    const [modalReviewActive, setModalReviewActive] = useState(false);
    const [addProductFormActive, setAddProductFormActive] = useState(false);
    const [editProductFormActive, setEditProductFormActive] = useState(false);



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
         <Ctx.Provider value={{
            goods,
            setGoods,
            serverGoods,
            setServerGoods,
            // news,
            // setServerNews,
            token,
            modalActive,
            setModalActive,
            user,
            setUser,
            userId,
            // newsBlock,
            // text,
            // setText,
            modalReviewActive,
            setModalReviewActive,
            product,
            setProduct,
            addProductFormActive,
            setAddProductFormActive,
            editProductFormActive,
            setEditProductFormActive
           }}>
        <React.Fragment>
            <Header />
           
            <main>
                <Routes>
                    {!user && <>
                        <Route path="/*" element={<Main />} />
                    </>}

                    {user && <>
                        <Route path="/" element={<Main />} />
                        {/*<Route path="/add" element={<Add />}/>*/}

                        <Route path="/catalog" element={<Catalog />} />

                        <Route path="/draft" element={<Draft />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </>}
                </Routes>
            </main>
            <Footer />
            <Modal />
        </React.Fragment>
        </Ctx.Provider>)
}
export default App;