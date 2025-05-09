import { ImagePath } from "@/utils/constant";
import Link from "next/link";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="landing-header">
        <Container>
          <Row className="align-items-center">
            <Col md="6">
              <div className="header-content">
                <h1>Welcome to Respire</h1>
                <p>Connect with friends, share memories, and stay updated with what matters to you.</p>
                <div className="header-buttons">
                  <Link href="/login">
                    <Button color="primary" className="mr-3">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button color="light" className="ml-3">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="header-image">
                <img 
                  src={`${ImagePath}/landing/hero.png`} 
                  alt="Respire Social Network" 
                  className="img-fluid" 
                />
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <section className="features">
        <Container>
          <h2 className="text-center mb-5">Why Choose Respire</h2>
          <Row>
            <Col md="4">
              <div className="feature-box text-center">
                <div className="feature-icon mb-3">
                  <img 
                    src={`${ImagePath}/landing/connect.png`} 
                    alt="Connect" 
                    className="img-fluid" 
                    style={{width: "64px"}} 
                  />
                </div>
                <h4>Connect</h4>
                <p>Stay connected with friends and family no matter where they are.</p>
              </div>
            </Col>
            <Col md="4">
              <div className="feature-box text-center">
                <div className="feature-icon mb-3">
                  <img 
                    src={`${ImagePath}/landing/share.png`} 
                    alt="Share" 
                    className="img-fluid" 
                    style={{width: "64px"}} 
                  />
                </div>
                <h4>Share</h4>
                <p>Share your special moments, thoughts, and experiences.</p>
              </div>
            </Col>
            <Col md="4">
              <div className="feature-box text-center">
                <div className="feature-icon mb-3">
                  <img 
                    src={`${ImagePath}/landing/learn.png`} 
                    alt="Learn" 
                    className="img-fluid" 
                    style={{width: "64px"}} 
                  />
                </div>
                <h4>Learn</h4>
                <p>Discover new courses and expand your knowledge with our E-learning platform.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="landing-footer">
        <Container>
          <div className="text-center">
            <p>© 2025 Respire Social Network. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a> | 
              <a href="#">Terms of Service</a> | 
              <a href="#">Contact Us</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;