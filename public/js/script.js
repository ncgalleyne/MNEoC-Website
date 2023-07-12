fetchImgFiles = async () => {
    const response = await fetch('/slideshow', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
}

renderSlideshow = async () => {
    const images = await fetchImgFiles();
    let carouselHtml = '';
        images.forEach((img, i) => {
            console.log(img)
            if(i === 0)
                carouselHtml += '<div class="carousel-item active">';
            else{
                carouselHtml += '<div class="carousel-item">';
            }
            carouselHtml += `
                <img class="d-block w-100" width="612px" height="450px" src="./img/slideshow/${img}" alt="${img}">
                <div class="carousel-caption d-none d-md-block">
                    <!--<h5 style="color: antiquewhite;"></h5>
                    <p></p>-->
                </div>
            </div>
                ` 
        });
        $('.carousel-inner').html(carouselHtml);
}

renderSlideshow();