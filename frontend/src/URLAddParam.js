function URLAddParam(name, value, location) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("page");
    searchParams.delete(name);
    searchParams.append(name, value);

    return "?"+searchParams.toString();
}

export default URLAddParam;