import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import logo2 from './../assets/icons/Group 48687@2x.png'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast.ts'
import { Toaster } from '@/components/ui/toaster.tsx'

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

type LoginFormInputs = z.infer<typeof loginSchema>

interface LoginForm {
    email: string
    password: string
}

const Login: React.FC = () => {
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginForm>()

    const navigate = useNavigate()

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: data.email,
                password: data.password
            })
            console.log('Autenticação bem-sucedida:', response.data)

            const { access_token, user } = response.data

            localStorage.setItem('access_token', access_token)
            localStorage.setItem('user', JSON.stringify(user))
            toast({
                title: 'Usuário logado com sucesso!',
                variant: 'success'
            })
            navigate('/loading')
        } catch (error) {
            toast({
                title: 'Usuário/Senha inválido(a)',
                variant: 'destructive'
            })
            console.error('Erro ao autenticar: ' + error)
        }
    }

    return (
        <>
            <Toaster />
            <div
                className="relative flex items-center justify-center h-screen"
                style={{ backgroundColor: 'rgb(34, 45, 89)' }} // Background color in RGB
            >
                <div className="hidden lg:flex items-center justify-center w-1/3 p-8">
                    <img src={logo2} alt="Logo" className="max-w-full h-auto" />
                </div>

                {/* Right Side - Login Form */}
                <div style={{ height: '30rem' }} className="flex flex-col justify-center w-full max-w-xl p-8">
                    <Card className="h-full">
                        <CardHeader className="p-4">
                            <CardTitle style={{ color: '#0290A4' }} className="pt-3 px-5 text-left text-5xl font-bold">
                                Bem-vindo!
                            </CardTitle>
                        </CardHeader>
                        <CardHeader className="py-3 pt-9">
                            <CardTitle className="text-left text-1xl px-5 font-semibold">Entre com sua conta</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {/* Email Field */}
                            <div className="space-y-4 px-5">
                                <div>
                                    <Label
                                        htmlFor="email"
                                        className={`block text-sm font-medium mb-2 ${
                                            errors.email ? 'text-red-500' : 'text-gray-700'
                                        }`}
                                    ></Label>
                                    <Input
                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                                            errors.email
                                                ? 'border-b-red-800 border-2 placeholder-red-500 text-red-500'
                                                : 'border-green-500'
                                        }`}
                                        type="email"
                                        placeholder="E-mail ou Nº Matricula"
                                        {...register('email', { required: true })}
                                    />
                                    {errors?.email?.type === 'required' && (
                                        <p className="text-red-500 text-sm mt-1">Campo obrigatório.</p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <Label htmlFor="password"></Label>
                                    <Input
                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 ${
                                            errors.email
                                                ? 'border-b-red-800 border-2 placeholder-red-500 text-red-500'
                                                : 'border-green-500'
                                        }`}
                                        type="password"
                                        placeholder="Senha"
                                        {...register('password', { required: true, minLength: 7 })}
                                    />
                                    {errors?.password?.type === 'required' && (
                                        <p className="text-red-500 text-sm mt-1">Campo obrigatório.</p>
                                    )}

                                    {errors?.password?.type === 'minLength' && (
                                        <p className="error-message">Password needs to have at least 7 characters.</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4" style={{ paddingLeft: '3rem' }}>
                            {/* Login Button */}
                            <Button
                                className="w-full p-5 text-1xl"
                                onClick={() => handleSubmit(onSubmit)()}
                                style={{ backgroundColor: '#0290A4' }}
                            >
                                Entrar
                            </Button>

                            {/* Forgot Password */}
                            <a
                                href="/forgot"
                                className="text-sm text-center text-blue-600 hover:underline mt-3 font-bold"
                                style={{ color: '#0290A4' }}
                            >
                                Esqueci minha senha
                            </a>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Login
