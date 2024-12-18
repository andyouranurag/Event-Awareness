import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../images/events.jpg';
import slide2 from '../images/disco.jpg';
import slide3 from '../images/events-in-hyderabad.jpg';
import slide4 from '../images/1images.jpg';
import slide5 from '../images/marathon.jpg';

const CarouselComponent = () => {
    return (
        <Carousel fade>
            <Carousel.Item interval={1500}>
                <img src={slide1} className="d-block w-100" alt="Slide 1" />
                <Carousel.Caption style={{ color: '#000000' }}>
                    <p>Enjoy exciting events and gatherings at our venue!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img src={slide2} className="d-block w-100" alt="Slide 2" />
                <Carousel.Caption>
                    <p>Dance the night away at our exclusive disco parties.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img src={slide3} className="d-block w-100" alt="Slide 3" />
                <Carousel.Caption>
                    <p>Corporate events with a touch of elegance and professionalism.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img src={slide4} className="d-block w-100" alt="Slide 4" />
                <Carousel.Caption>
                    <p>Memorable moments from diverse events and activities.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img src={slide5} className="d-block w-100" alt="Slide 5" />
                <Carousel.Caption>
                    <p>Join us for a thrilling marathon experience like no other.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselComponent;
