import { useEffect, useState } from 'react'
import Layout from '@/layouts/Layout.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import BreadcrumbComponent from '@/components/BreadcrumbComponent.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast.ts'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toaster } from '@/components/ui/toaster.tsx'
import ModalEditCancelComponent from '@/components/ModalEditCancelComponet.tsx'

const userSchema = z
    .object({
        name: z.string().regex(/^[A-Za-z\s]+$/, 'O nome deve conter apenas letras'),
        email: z.string().email('Informe um e-mail válido'),
        registration: z.string().regex(/^\d+$/, 'A matrícula deve conter apenas números'),
        password: z.string().optional().or(z.literal('')),
        confirmationPassword: z.string().optional().or(z.literal(''))
    })
    .refine((data) => data.password === data.confirmationPassword, {
        path: ['confirmationPassword'],
        message: 'As senhas não coincidem'
    })

type userFormInputs = z.infer<typeof userSchema>

const UserEdit = () => {
    const { id } = useParams()
    const [user, setUser] = useState<Partial<userFormInputs>>({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { toast } = useToast()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`)
                setUser(response.data)
            } catch (error) {
                console.error('Erro ao buscar usuário.' + error)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [id])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid }
    } = useForm<userFormInputs>({
        resolver: zodResolver(userSchema),
        mode: 'onChange'
    })

    const watchedFields = watch(['name', 'email', 'registration', 'password', 'confirmationPassword'])

    useEffect(() => {
        if (user) {
            setValue('name', user.name || '')
            setValue('email', user.email || '')
            setValue('registration', user.registration || '')
            setValue('password', user.password || '')
            setValue('confirmationPassword', user.password || '')
        }
    }, [user, setValue])

    const onSubmit = async (data: userFormInputs) => {
        const { name, email, registration, password } = data
        const formData = {
            name,
            email,
            registration,
            ...(password ? { password } : {})
        }
        try {
            await axios.put(`http://localhost:3000/users/${id}`, formData)
            toast({
                title: 'Dados salvos com sucesso',
                variant: 'success'
            })
            setTimeout(() => {
                navigate('/users/list')
            }, 3000)
        } catch (error) {
            toast({
                title: 'Usuário update ERROR',
                variant: 'destructive'
            })
            console.error('Ocorreu um erro ao tentar cadastrar' + error)
        }
    }

    // const handleButtonCancel = () => {
    //     toast({
    //         title: 'Cadastrado cancelado',
    //         variant: 'cancel'
    //     })
    //     setTimeout(() => {
    //         navigate('/users/list')
    //         setError('')
    //     }, 2000)
    // }

    const breadcrumbItems = [{ label: 'Usuários' }, { label: 'Editar Usuário' }]

    const handleCancelClick = () => {
        setIsModalOpen(true)
    }

    const handleConfirmCancel = () => {
        navigate('/users/list')
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <Layout>
            <Toaster />
            <BreadcrumbComponent items={breadcrumbItems} />
            <div className="flex flex-row items-center">
                <Link to="/users/list" className="text-4xl text-black p-1">
                    &lt;
                </Link>
                <h1 className="text-black text-2xl font-bold"> Editar Usuário</h1>
            </div>

            <div className="p-4">
                <div className="">
                    <Card className="">
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-row items-center">
                                    <span className="mx-4 text-gray-700 font-bold">Dados do Usuário</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                                <div className="flex gap-x-4">
                                    <div className="w-1/2">
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="Insira o nome completo*"
                                            required
                                            className="bg-primary-100"
                                        />
                                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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
                                            {...register('registration')}
                                            className="bg-primary-100"
                                        />
                                        {errors.registration && (
                                            <p className="text-red-500">{errors.registration.message}</p>
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
                                        className="bg-primary-100"
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                    <span className="text-xs text-black-500 float-right">• Máx 40 Caracteres</span>
                                </div>
                                <div className="flex flex-row items-center">
                                    <span className="mx-4 text-gray-700 font-bold">Dados de acesso</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                                <div className="flex gap-x-4">
                                    <div className="w-1/2">
                                        <Input
                                            type="password"
                                            id="password"
                                            placeholder="Senha"
                                            required
                                            {...register('password')}
                                            className="bg-primary-100"
                                        />
                                    </div>

                                    <div className="w-1/2">
                                        <Input
                                            type="password"
                                            id="confirmationPassword"
                                            placeholder="Repitir Senha"
                                            required
                                            {...register('confirmationPassword')}
                                            className="bg-primary-100"
                                        />
                                        {errors.confirmationPassword && (
                                            <p className="text-red-500">{errors.confirmationPassword.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="submit"
                                        className="bg-white text-black border p-2"
                                        onClick={handleCancelClick}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className={`bg-primary-400 text-white px-4 py-2 ${
                                            !isValid || !watchedFields.some((field) => field !== '')
                                                ? 'bg-primary-200 opacity-50 cursor-not-allowed'
                                                : ''
                                        }`}
                                        disabled={!isValid || !watchedFields.some((field) => field !== '')}
                                    >
                                        Salvar
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ModalEditCancelComponent
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmCancel}
                title={'Deseja cancelar?'}
                description={'Os dados inseridos não serão salvos'}
            />
        </Layout>
    )
}

export default UserEdit
