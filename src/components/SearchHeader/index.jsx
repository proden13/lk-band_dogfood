import "./style.css";
import { useState, useEffect } from "react";


const SearchHeader = ({ arr, upd }) => {
    const [text, setText] = useState("");
   
    const searchByText = (e) => {
        //e.target - обращение к тегу, на котором произошло событие//
        let val = e.target.value;
        setText(val);
        //let result = arr.filter(el => el.name.toLowerCase().includes(val.toLowerCase()))//
        let result = arr.filter(el => new RegExp(val, "i").test(el.name));
        upd(result);
        console.log(result);
    }

    return (
        <div className="search-header">
            <input type="search" className="search" placeholder="Поиск" value={text} onChange={searchByText} />
        </div>
    )
}

export default SearchHeader;