import React, { useEffect, useState } from "react";
import Layout from "@/layouts/Layout.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import BreadcrumbComponent from "@/components/BreadcrumbComponent.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import TitleComponent from "@/components/TitleComponent.tsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    registration: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        setError("Erro ao buscar usuário.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user);
      navigate("/");
    } catch (error) {
      setError("Erro ao atualizar o usuário.");
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Layout>
      <BreadcrumbComponent />
      <TitleComponent> &lt; Editar Usuário</TitleComponent>

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
                      placeholder="Insira o nome completo*"
                      required
                      className="bg-primary-100"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />

                    <span className="text-xs text-black-500 float-right">
                      • Máx. 30 Caracteress
                    </span>
                  </div>

                  <div className="w-1/2">
                    <Input
                      type="text"
                      id="registration"
                      placeholder="Insira o Nº da matrícula"
                      required
                      className="bg-primary-100"
                      name="registration"
                      value={user.registration}
                      onChange={handleChange}
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
                    placeholder="Inisra o E-mail*"
                    required
                    className="bg-primary-100"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                  <span className="text-xs text-black-500 float-right">
                    • Máx 40 Caracteres
                  </span>
                </div>
                Dados de acesso
                <Separator className="my-4" />
                <div className="flex gap-x-4">
                  <div className="w-1/2">
                    <Input
                      type="password"
                      id="password"
                      placeholder="Senha"
                      required
                      className="bg-primary-100"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-1/2">
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="Repitir Senha"
                      required
                      className="bg-primary-100"
                      name="confirmPassword"
                      value={user.password}
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

export default UserEdit;
