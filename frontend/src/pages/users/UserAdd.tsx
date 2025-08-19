import { useState } from 'react'
import Layout from '@/layouts/Layout.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast.ts'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const userSchema = z
    .object({
        name: z.string().regex(/^[A-Za-z\s]+$/, 'O nome deve conter apenas letras'),
        email: z.string().email('Informe um e-mail válido'),
        registration: z.string().regex(/^\d+$/, 'A matrícula deve conter apenas números'),
        password: z
            .string()
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
            .regex(/^[a-zA-Z0-9]+$/, 'A senha deve ser alfanumérica'),
        confirmationPassword: z
            .string()
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
            .regex(/^[a-zA-Z0-9]+$/, 'A senha deve ser alfanumérica')
    })
    .refine((data) => data.password === data.confirmationPassword, {
        path: ['confirmationPassword'],
        message: 'As senhas não coincidem'
    })

type userFormInputs = z.infer<typeof userSchema>

const UserAdd = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({
        resolver: zodResolver(userSchema),
        mode: 'onChange'
    })

    const onSubmit = async (data: any) => {
        console.log(data)
        const { name, email, registration, password } = data
        console.log('Dados enviados:', { name, email, registration, password })
        const formData = {
            name,
            email,
            registration,
            password
        }

        try {
            await axios.post('http://localhost:3000/users', formData)
            toast({
                title: 'Cadastrado Realizado',
                variant: 'success'
            })
            setTimeout(() => {
                navigate('/users/list')
                setError('')
            }, 3000)
            setError('')
        } catch (err) {
            console.error(err)
            toast({
                title: 'Cadastrado não realizado',
                variant: 'destructive'
            })
            setError('Ocorreu um erro ao tentar cadastrar')
        }
    }
    const handleButtonCancel = () => {
        toast({
            title: 'Cadastrado cancelado',
            variant: 'cancel'
        })
        setTimeout(() => {
            navigate('/users/list')
            setError('')
        }, 2000)
    }

    const breadcrumbItems = [{ label: 'Usuários' }, { label: 'Cadastro de Usuário' }]

    return (
        <Layout>
            <Toaster />
            <BreadcrumbComponent items={breadcrumbItems} />
            <div className="flex flex-row items-center">
                <Link to="/users/list" className="text-4xl text-black p-1">
                    &lt;
                </Link>
                <h1 className="text-black text-2xl font-bold"> Cadastro de Usuário</h1>
            </div>
            <div className="p-4">
                <div className="">
                    <Card className="">
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                Dados do Usuário
                                <Separator className="my-4" />
                                <div className="flex gap-x-4">
                                    <div className="w-1/2">
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="Insira o nome completo*"
                                            required
                                            {...register('name')}
                                            // className={`border p-2 w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                                ${
                                                    errors.name
                                                        ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                        : watch('name') &&
                                                          'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500">{errors.name.message?.toString()}</p>
                                        )}
                                        <span className="text-xs text-black-500 float-right">• Máx. 30 Caracteres</span>
                                    </div>
                                    <div className="w-1/2">
                                        <Input
                                            type="text"
                                            id="registration"
                                            placeholder="Insira o Nº da matrícula"
                                            required
                                            {...register('registration')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                                ${
                                                    errors.registration
                                                        ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                        : watch('registration') &&
                                                          'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.registration && (
                                            <p className="text-red-500">{errors.registration.message?.toString()}</p>
                                        )}
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
                                        {...register('email')}
                                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                                ${
                                                    errors.email
                                                        ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                        : watch('email') &&
                                                          'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message?.toString()}</p>}
                                    <span className="text-xs text-black-500 float-right">• Máx 40 Caracteres</span>
                                </div>
                                Dados de acesso
                                <Separator className="my-4" />
                                <div className="flex gap-x-4">
                                    <div className="w-1/2 ">
                                        <Input
                                            type="password"
                                            id="password"
                                            placeholder="Senha"
                                            required
                                            {...register('password')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                        ${
                                            errors.password
                                                ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                : watch('password') &&
                                                  'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                        }`}
                                        />
                                        {errors.password && (
                                            <p className="text-red-500">{errors.password.message?.toString()}</p>
                                        )}
                                    </div>

                                    <div className="w-1/2">
                                        <Input
                                            type="password"
                                            id="confirmationPassword"
                                            placeholder="Repitir Senha"
                                            required
                                            {...register('confirmationPassword')}
                                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 
                                                ${
                                                    errors.confirmationPassword
                                                        ? 'border-2 border-red-500 placeholder-red-500 text-red-500'
                                                        : watch('confirmationPassword') &&
                                                          'border-b-cyan-400 border-2 placeholder-green-500-500 text-green-600'
                                                }`}
                                        />
                                        {errors.confirmationPassword && (
                                            <p className="text-red-500">
                                                {errors.confirmationPassword.message?.toString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="submit"
                                        className="bg-white text-black border p-2"
                                        onClick={handleButtonCancel}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className={`bg-primary-400 text-white px-4 py-2 ${!isValid ? 'bg-primary-200 opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!isValid}
                                    >
                                        Cadastrar
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}

export default UserAdd
