import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import Paginate from "./Paginate";
const Followers = () => {
  const [followersList, setFollowersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [followersPerPage] = useState(10)
  const indexOfLastFollowers = currentPage * followersPerPage
  const indexOfFirstFollowers = indexOfLastFollowers - followersPerPage
  const currentFollower = followersList.slice(indexOfFirstFollowers, indexOfLastFollowers)
  const totalPagesNum = Math.ceil(followersList.length / followersPerPage)
  const getFollowers = async () => {
    const { data } = await axios.get(
      "https://api.github.com/users/zeyasar/followers?per_page=100"
    );
    setFollowersList(data);
    console.log(data);
  };
  useEffect(() => {
    getFollowers();
  }, []);
  return (
    <>
      <Container>
        <Row xs={2} md={3} lg={4} className="g-4 mt-4">
          {currentFollower.map((follower, index) => (
            <Col key={index}>
              <Card>
                <Card.Img variant="top" src={follower.avatar_url} />
                <Card.Body>
                  <Card.Text>{follower.login}</Card.Text>
                  <Button
                    href={follower.html_url}
                    style={{ borderRadius: "50px" }}
                    variant="primary"
                  >
                    VIEW PROFILE
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="d-flex justify-content-center mt-4">
       <Paginate pages= {totalPagesNum} setCurrentPage={setCurrentPage}/>
      </Container>
    </>
  );
};
export default Followers;









