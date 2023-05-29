import image from "../../assets/images/logo.png";

const Logo = () => {
    return <a href="/" className="logo">
        <img src={image} alt="DogFood"/>
        <span></span>
    </a>
}

export default Logo;