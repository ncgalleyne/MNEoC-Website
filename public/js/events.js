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
    const events = data.upcomingEvents;
    let carouselHtml = '';
    let indicatorsHtml = '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>';
        events.forEach((event, i) => {
            if(i === 0)
                carouselHtml += '<div class="carousel-item active">';
            else{
                carouselHtml += '<div class="carousel-item">';
                indicatorsHtml += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`
            }
            carouselHtml += `
                <img class="d-block w-100" src="./img/event1.jpg" alt="${event.title}">
                <div class="carousel-caption d-none d-md-block">
                    <h5 style="color: antiquewhite;">${event.title}</h5>
                    <p>${event.description}</p>
                </div>
            </div>
                ` 
        });
        $('.carousel-inner').html(carouselHtml);
        $('.carousel-indicators').html(indicatorsHtml);
}

renderEvents();