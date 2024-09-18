// src/pages/Login.tsx
import React, {useState} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import logo2 from './../assets/icons/Group 48687@2x.png'
import logo1 from './../assets/icons/svg/Group 48699.svg';
import lockicon from './../assets/icons/svg/Group 47957.svg';
import backlogin from './../assets/icons/svg/Group 47771.svg';


const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('foi')
        if (email === '') {
            document.getElementById("email")?.classList.add('border-b-red-800')
            setError('Campo Obrigatorio');
        } else {
            setError('');
            // Processar o formulário aqui
        }
    };
    return (
        <div
            className="relative flex items-center justify-center h-screen"
            style={{ backgroundColor: "rgb(34, 45, 89)" }} // Background color in RGB
        >

            {/* Left Side - Logo */}
            <div className="hidden lg:flex items-center justify-center w-1/3 p-8">
                <img src={lockicon} alt="Logo" className="max-w-full h-auto" />
            </div>

            {/* Right Side - Login Form */}
            <div className="flex flex-col justify-center w-full max-w-md p-8">

                <Card style={{ width: '30rem', height: '30rem' }}>
                    {/* Logo */}
                    <div className="hidden lg:flex items-center justify-center w-52 px-4 pb-3 pt-14">
                        <img src={logo1} alt="Logo" className="max-w-full h-auto" />
                    </div>
                    <CardHeader className="px-6 pt-10 pb-3">
                        <CardTitle style={{ color: '#0290A4' }} className="text-left text-xl font-semibold">
                            Recuperação de senha
                        </CardTitle>
                    </CardHeader>
                    <CardHeader className="px-6 pt-0">
                        <CardTitle className="text-left font-semibold">
                            Insira seu e-mail para recuperar sua senha
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="email"></Label>
                                    <Input id="email"
                                           type="email"
                                           placeholder="E-mail"
                                           onChange={(e) => setEmail(e.target.value)}
                                           required
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    type="submit"
                                    style={{ backgroundColor: '#0290A4' }}
                                    className="w-full">Recuperar
                                </Button>
                            </div>
                        </form>
                        {/* Email Field */}
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-5">
                        {/* Login Button */}


                        {/* Forgot Password */}
                        <div className='flex gap-1'>
                            <img style={{ width: '20px' }} src={backlogin} alt="Back to login" />
                            <a href="/login" className="text-sm text-center text-gray-600 hover:underline">
                                Voltar para o login
                            </a>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Login;
