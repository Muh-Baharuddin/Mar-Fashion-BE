import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Image from "next/image";
import carousel1 from "../../public/images/carousel-1.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";

export default function daftarBarang() {
  return (
    <div>
      <NavBar />
      <Container>
        <Row className="my-4">
          <Col>
            <Card style={{ width: "18rem" }}>
              <Image src={carousel1} alt="Baju" style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Baju</Card.Title>
                <Card.Text>
                  Terdapat berbagai macam baju dengan kualitas top dengan harga
                  termurah
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Image src={carousel1} alt="Baju" style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Celana</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Image src={carousel1} alt="Baju" style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Image src={carousel1} alt="Baju" style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Image src={carousel1} alt="Baju" style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Image src={carousel1} alt="Baju" style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Image src={carousel1} alt="Baju" style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Image src={carousel1} alt="Baju" style={{ width: "100%" }} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="danger">
                  <Link
                    href="/daftarBarang/baju"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go somewhere
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
