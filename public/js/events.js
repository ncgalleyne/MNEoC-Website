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
    let indicatorsHtml = '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>';
        events.forEach((event, i) => {
            if(i === 0)
                eventHtml += '<div class="carousel-item active">';
            else{
                eventHtml += '<div class="carousel-item">';
                indicatorsHtml += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`
            }
            eventHtml += `
                <img class="d-block w-100" width="612px" height="450px" src="./img/events/event${i + 1}.jpg" alt="${event.title}">
                <div class="carousel-caption d-none d-md-block">
                    <!--<h5 style="color: antiquewhite;">${event.title}</h5>
                    <p>${event.description}</p>-->
                </div>
            </div>
                ` 
        });
        $('.event-inner').html(eventHtml);
        $('.event-indicators').html(indicatorsHtml);
}

renderEvents();
