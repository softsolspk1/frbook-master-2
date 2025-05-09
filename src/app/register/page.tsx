"use client";
import CustomImage from "@/Common/CustomImage";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { ImagePath } from "@/utils/constant";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! You can now login.");
        router.push("/login");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
      <Container fluid className="p-0">
        <Row className="m-0">
          <Col xs="12" className="p-0">
            <div className="login-card">
              <div>
                <div className="login-main">
                  <Form className="theme-form" onSubmit={handleSubmit}>
                    <h4>Create your account</h4>
                    <p>Enter your details to register</p>

                    <FormGroup>
                      <Label className="col-form-label" for="name">Full Name</Label>
                      <Input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="col-form-label" for="email">Email Address</Label>
                      <Input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="example@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="col-form-label" for="password">Password</Label>
                      <Input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="*********" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="col-form-label" for="confirmPassword">Confirm Password</Label>
                      <Input 
                        type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="*********" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                      />
                    </FormGroup>

                    <div className="form-group mb-0">
                      <div className="checkbox p-0">
                        <Input id="checkbox1" type="checkbox" required />
                        <Label className="text-muted" for="checkbox1">I agree to the <a href="#" className="ms-2">Terms and Conditions</a></Label>
                      </div>
                      <Button 
                        color="primary" 
                        className="d-block w-100" 
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </div>

                    <p className="mt-4 mb-0 text-center">Already have an account?<a className="ms-2" href="/login">Sign in</a></p>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RegisterPage;