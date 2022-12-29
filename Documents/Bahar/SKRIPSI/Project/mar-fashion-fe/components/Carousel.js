import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import carousel1 from '../public/images/carousel-1.jpg'
import carousel2 from '../public/images/carousel-2.jpg'
import carousel3 from '../public/images/carousel-3.jpg'

const CarouselComp = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={carousel1}
          alt="First slide"
          height={400}
        />
        <Carousel.Caption>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={carousel2}
          alt="Second slide"
          height={400}
        />

        <Carousel.Caption>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={carousel3}
          alt="Third slide"
          height={400}
        />

        <Carousel.Caption>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComp;