// src/components/Home.js
import React, { useState } from 'react';
import './Home.css'
import EventCalendar from './EventCalendar'
import {format} from 'date-fns'
import ApiHandler from '../util/ApiHandler';

const events = await ApiHandler.get('/events')
const response = await ApiHandler.get('/images')
const images = response.data

const Home = () => {
    const [selectedCalendarEvent, setselectedCalendarEvent] = useState({ title: '', description: '', date: '' });
  return (
  <>
    <body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">
    {/* <!--banner--> */}
    <section id="banner" className="banner">
        <div className="bg-color">
        {/* <nav style="display: none;" class="navbar navbar-default navbar-fixed-top">
            <div class="container">
            <div class="col-md-12">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                <a class="navbar-brand" href="#"><img src="img/MNEOC_bg.png" class="img-responsive" style="max-width:58%; margin-top: -16px;" /></a>
                </div>
                <div class="collapse navbar-collapse navbar-right" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#banner">Home</a></li>
                    <li class=""><a href="#about">About</a></li>
                    <li class=""><a href="#events">Events</a></li>
                    <li class=""><a href="#contact">Contact</a></li>
                </ul>
                </div>
            </div>
            </div>
        </nav> */}
        <div className="container">
            <div className="row">
            <div className="banner-info">
                <div className="banner-logo text-center">
                <img alt="logo" src="img\MNEOC_bg_wht.png" width="390px" height="340px"className="img-responsive" />
                </div>
                <div className="banner-text text-center">
                <h1 className="white">Our Vision</h1>
                <p>Professional community resource promoting healthier lifestyle choices through education and engaging with community stakeholders</p>
                </div>
                <div className="overlay-detail text-center">
                <a href="#events"><i className="fa fa-angle-down"></i></a>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
    {/* <!--/ banner-->
    <!--About--> */}
    <section id="about" className="section-padding">
        <div className="container">
        <div className="row">
            <div className="text-right-md col-md-6 col-sm-6">
            <img src="img\team-hands-linked-together.jpg" alt="hands together" style={{width: '100%'}} />
            </div>
            <div className="col-md-6 col-sm-6">
            <h2 className="section-title white lg-line" style={{textAlign: 'center', marginBottom: '20px'}}>About Us</h2>
            <hr className="botm-line" />
            <p>The Minority Nurse Educators of Chesco (MNECC), an auxiliary of W.C. Atkinson Memorial Community 
                Service Center Inc., a Coatesville non-profit, are local RNs and LPNs dedicated to promote and 
                improve health care outcomes throughout Chester County; with a primary focus in Coatesville and
                surrounding communities.
            </p>
            <p>
                The MNECC collectively have many years of healthcare experience in a variety of practical and 
                leadership roles. We have joined together as nurses in a unified effort to serve our community 
                through health education, screening, and advocacy. We will identify and address gaps and 
                barriers to health care and seek to bring about solutions through community collaboratives 
                and partnerships. We will be a listening ear, thoughtful in our approach, respectful in every 
                interaction with ongoing evaluation of effectiveness. We will provide updated health care 
                information utilizing CDC, state, local guidelines, and mandates.
            </p>
            </div>
        </div>
        </div>
    </section>
    <section id="events" className="d-flex justify-content-center">
        <div className="py-5">
        <h2 className="ser-title">Photos</h2>
        <hr className="botm-line" />
        <div id="carouselExampleIndicators" className="carousel slide mw-555" data-ride="carousel">
            <ol className="carousel-indicators">
            </ol>
            <div className="carousel-inner">
                {/* loop through s3/slideshow */}
                {images.map((img, i) => (
                    <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                        <img className="d-block w-100" style={{width: "612px", height: "450px"}} src={img} alt={`Slide ${i}`} />
                    </div>
                ))}
                
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        </div>
    </section>
    <section id="calendar-events" class="section-padding">
        <div className="d-flex justify-content-center">
        <div className='col-md-6 event-content-container'>
            {selectedCalendarEvent.title.length > 0 && 
            <div className="event-content">
            <div className='d-flex'>
                <h2>{selectedCalendarEvent.title}</h2>:<h3>{format(selectedCalendarEvent.date, "MMMM dd, yyyy")}</h3>
            </div>
            <p>{selectedCalendarEvent.description}</p>
            </div>
            }
        </div>
        <div className='col-md-6'>
            <EventCalendar events={events.data} setSelectedCalendarEvent={setselectedCalendarEvent}/>
        </div>
        </div>
    </section>
    {/* <!--contact--> */}
    <section id="contact" className="section-padding">
        <div className="container">
        <div className="row">
            <div className="col-md-12">
            <h2 className="ser-title">Contact us</h2>
            <hr className="botm-line" />
            </div>
            <div className="col-md-4 col-sm-4">
            <h3>Contact Info</h3>
            <div className="space"></div>
            <p><i className="fa fa-map-marker fa-fw pull-left fa-2x"></i>822 E Chestnut Street<br /> Coatesville, PA 19320</p>
            <div className="space"></div>
            <p><i className="fa fa-envelope-o fa-fw pull-left fa-2x"></i>gyle001@hotmail.com</p>
            <div className="space"></div>
            <p><i className="fa fa-phone fa-fw pull-left fa-2x"></i>610-380-6193</p>
            <div style={{width: '100%'}}><iframe title='map' width="200" height="140" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=824%20E%20Chestnut%20Street,%20Coatesville%20PA%2019320+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">measure distance on map</a></iframe></div>
            </div>
            <div className="col-md-8 col-sm-8 marb20">
            <div className="contact-info">
                <h3 className="cnt-ttl">Subscribe to our mailing list!</h3>
                <div className="space"></div>
                <div id="sendmessage">Your message has been sent. Thank you!</div>
                <div id="errormessage"></div>
                <form action="/signup" method="POST" className="contactForm">
                <div className="form-group">
                    <input type="text" name="fname" className="form-control br-radius-zero" id="fname" placeholder="Your First Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                    <div className="validation"></div>
                </div>
                <div className="form-group">
                    <input type="text" name="lname" className="form-control br-radius-zero" id="lname" placeholder="Your Last Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                    <div className="validation"></div>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control br-radius-zero" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                    <div className="validation"></div>
                </div>
                <div className="form-action">
                    <button type="submit" className="btn btn-form">Subscribe</button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </section>
    {/* / contact */}

    </body>
  </>
  )
};

export default Home;
