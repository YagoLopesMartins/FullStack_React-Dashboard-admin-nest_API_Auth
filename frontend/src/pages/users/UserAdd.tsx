import React, { useState } from "react";
import Layout from "@/layouts/Layout.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import BreadcrumbComponent from "@/components/BreadcrumbComponent.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast.ts";

const UserAdd = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    registration: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        formData
      );
      toast({
        title: "Usuário cadastrado com sucesso",
        description: "",
      });
      navigate("/users/list");
      setError("");
    } catch (err) {
      console.error(err);
      toast({
        title: "Usuário cadastrado ERROR",
        description: "",
        variant: "destructive",
      });
      setError("Ocorreu um erro ao tentar cadastrar");
    }
  };
  return (
    <Layout>
      <Toaster />
      <BreadcrumbComponent />
      <h1 className="text-black text-2xl font-bold">
        {" "}
        &lt; Cadastro de Usuário
      </h1>

      <div className="p-4">
        <div className="">
          <Card className="">
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                Dados do Usuário
                <Separator className="my-4" />
                <div className="flex gap-x-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Insira o nome completo*"
                      required
                      className="bg-primary-100"
                      onChange={handleChange}
                      value={formData.name}
                    />

                    <span className="text-xs text-black-500 float-right">
                      • Máx. 30 Caracteres
                    </span>
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      id="registration"
                      name="registration"
                      placeholder="Insira o Nº da matrícula"
                      required
                      className="bg-primary-100"
                      onChange={handleChange}
                      value={formData.registration}
                    />
                    <span className="text-xs text-black-500 float-right">
                      • Mín. 4 Letras | • Máx. 10 Caracteres
                    </span>
                  </div>
                </div>
                <div className="w-1/2">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Inisra o E-mail*"
                    required
                    className="bg-primary-100"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <span className="text-xs text-black-500 float-right">
                    • Máx 40 Caracteres
                  </span>
                </div>
                Dados de acesso
                <Separator className="my-4" />
                <div className="flex gap-x-4">
                  <div className="w-1/2 ">
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Senha"
                      required
                      className="bg-primary-100"
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </div>

                  <div className="w-1/2">
                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Repitir Senha"
                      required
                      className="bg-primary-100"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="submit" className="bg-white text-black">
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-primary-100  text-white">
                    Cadastrar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UserAdd;
