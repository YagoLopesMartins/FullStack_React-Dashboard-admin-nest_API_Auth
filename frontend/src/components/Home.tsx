import React from "react";
import Layout from "@/layouts/Layout.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo2 from "@/assets/icons/01_welcome.png";
import TitleComponent from "@/components/TitleComponent.tsx";

const Home: React.FC = () => {
  return (
    <Layout>
      <TitleComponent>Home</TitleComponent>
      <div className="p-4">
        <Card className="card-height">
          <CardHeader>
            <CardTitle className="font-bold text-2xl">Olá Millena!</CardTitle>
            <CardDescription>22, Novembro 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:flex items-center justify-center w-full p-4">
              <img
                src={logo2}
                alt="Logo"
                className="max-w-full h-[350px] align-"
              />
            </div>
            <div className="flex justify-center border-solid items-center">
              <h1 className="buttonWelcome py-4 px-36 text-2xl font-bold">
                Bem-vindo ao WenLock!
              </h1>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;
