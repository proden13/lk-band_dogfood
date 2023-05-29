import Card from "../components/Card";

const Favorites = ({ goods, userId, setServerGoods }) => {
return <div className="container">
    {goods.filter(el => el.likes.includes(userId)).map( g => <Card {...g} key={g._id}
    setServerGoods={setServerGoods}
    img={g.pictures}
    />) }

</div>

}

export default Favorites;