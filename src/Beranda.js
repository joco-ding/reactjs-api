import { Container, Row, Col } from "react-bootstrap"
import Header from "./Header"

const Beranda = () => {

  return (
    <>
      <Header />
      <Container className="py-5">
        <Row className="py-lg-5">
          <Col>
            <h2>Beranda</h2>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Beranda