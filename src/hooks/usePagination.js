import { useState } from "react";

const usePagination = (data, cnt) => {
const [current, setCurrent] = useState(1);
const max = Math.ceil(data.length / cnt);

const step = (page) => {

    setCurrent(page);
}

const prev = () => {
    // не выходим за рамки первой страницы //
    const prevPage = Math.max(current - 1, 1)
    setCurrent(prevPage);
}

const next = () => {
    // не выходим за рамки последней страницы //
    const nextPage = Math.min(current + 1, max)
    setCurrent(nextPage);
}


const setDataPerPage = () => {
    //cnt + current
    let start = (current - 1) * cnt;
    let end = start + cnt;
    return data.slice(start, end);
}

return {current, max, step, prev, next, setDataPerPage}
}

export default usePagination;