fetchEventsJson = async (filter) => {
    let data = await fetch('events.json', {cache: "no-store"})
        .then((response) => response.json())
        .then(data => data)
    if(!!filter)
        return data[filter];
    return data;
}

renderEvents = async () => {
    const data = await fetchEventsJson();
    console.log(data)
    const events = data.upcomingEvents;
    let eventHtml = '';
        events.forEach((event, i) => {
            eventHtml += `
                    <h5 ><em>${event.title}</em></h5>
                    <p>${event.description}</p>
                ` 
        });
        $('.event-inner').html(eventHtml);
}

renderEvents();
