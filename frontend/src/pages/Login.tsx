// src/pages/Login.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import logo2 from "./../assets/icons/Group 48687@2x.png";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("foi");
    if (senha === "") {
      document.getElementById("password")?.classList.add("border-b-red-800");
      setPasswordError("Campo Obrigatorio");
    }
    if (email === "") {
      document.getElementById("email")?.classList.add("border-b-red-800");
      setEmailError("Campo Obrigatorio");
    } else {
      console.log();
    }
  };

  const handleEnterButton = () => {
    navigate("/home");
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen"
      style={{ backgroundColor: "rgb(34, 45, 89)" }}
    >
      <div className="hidden lg:flex items-center justify-center w-1/3 p-8">
        <img src={logo2} alt="Logo" className="max-w-full h-auto" />
      </div>

      <div
        style={{ height: "30rem" }}
        className="flex flex-col justify-center w-full max-w-xl p-8"
      >
        <Card className="h-full">
          <CardHeader className="p-4">
            <CardTitle
              style={{ color: "#0290A4" }}
              className="pt-3 px-5 text-left text-5xl font-bold"
            >
              Bem-vindo!
            </CardTitle>
          </CardHeader>
          <CardHeader className="py-3 pt-9">
            <CardTitle className="text-left text-1xl px-5 font-semibold">
              Entre com sua conta
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4 px-5">
              <div>
                <Label htmlFor="email"></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail ou Nº Matricula"
                  value={emailField}
                  onChange={(e) => setEmailField(e.target.value)}
                />
                {EmailError && (
                  <p className="text-red-500 text-sm">{EmailError}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password"></Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  value={passwordField}
                  onChange={(e) => setPasswordField(e.target.value)}
                />
                {PasswordError && (
                  <p className="text-red-500 text-sm">{PasswordError}</p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter
            className="flex flex-col space-y-4"
            style={{ paddingLeft: "3rem" }}
          >
            <Button
              className="w-full p-5 text-1xl"
              onClick={handleEnterButton}
              style={{ backgroundColor: "#0290A4" }}
            >
              Entrar
            </Button>

            <a
              href="/reset"
              className="text-sm text-center text-blue-600 hover:underline mt-3 font-bold"
              style={{ color: "#0290A4" }}
            >
              Esqueci minha senha
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
