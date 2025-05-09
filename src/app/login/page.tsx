"use client";
import { ImagePath } from "@/utils/constant";
import CustomImage from "@/Common/CustomImage";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import React, { FormEvent, useState } from "react";
import { Container, Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        Cookies.set("jwt", data.token, { expires: 7 });
        toast.success("Login successful");
        router.push("/dashboard/feed");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
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
                    <h4>Sign in to Respire</h4>
                    <p>Enter your email & password to login</p>

                    <FormGroup>
                      <Label className="col-form-label" for="email">Email Address</Label>
                      <Input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="col-form-label" for="password">Password</Label>
                      <div className="form-input position-relative">
                        <Input 
                          type="password" 
                          className="form-control" 
                          id="password" 
                          placeholder="*********" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </FormGroup>

                    <div className="position-relative form-group mb-0">
                      <div className="checkbox">
                        <Input id="checkbox1" type="checkbox" />
                        <Label className="text-muted" for="checkbox1">Remember password</Label>
                      </div>
                      <a className="link" href="/forgot-password">Forgot password?</a>
                      <Button 
                        color="primary" 
                        type="submit" 
                        className="d-block w-100 mt-2" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign in"}
                      </Button>
                    </div>

                    <p className="mt-4 mb-0 text-center">Don't have an account?<a className="ms-2" href="/register">Create Account</a></p>
                    
                    {/* Admin login shortcut for development */}
                    <div className="mt-3 text-center">
                      <small className="text-muted">
                        Admin login: admin@respire.com / admin123
                      </small>
                    </div>
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

export default LoginPage;