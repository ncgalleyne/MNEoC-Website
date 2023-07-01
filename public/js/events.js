fetchEvents = async (filter) => {
    let data = await fetch('events.json', {cache: "no-store"})
        .then((response) => response.json())
        .then(data => data)
    if(!!filter)
        return data[filter];
    return data;
}