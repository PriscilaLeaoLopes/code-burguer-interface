import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { useUser } from '../../hooks/UserContext'
import {Button, ErrorMessage } from '../../components'
import  LoginImg from '../../assets/login-image.svg'
import  Logo from '../../assets/logo.svg'
import api from '../../services/api'

import {
    Container,
    LoginImage,
    ContainerItens,
    Label,
    Input,
    SignInLink,
} from './styles'

export function Login() {
  const history = useHistory()
   const { putUserData } = useUser()

   

  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 dígitos')
})

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema)
      });

      const onSubmit = async (clientData) => {
          const { data } = await toast.promise(
             api.post('sessions', {
            email: clientData.email,
            password: clientData.password,  
          }),
          {
           pending: 'Verificando seus dados',
           success: 'Seja bem vindo(a)',
           error: 'Verifique seu e-mail e senha',
          }
        )

        putUserData(data)

       setTimeout(() => {
        if (data.admin) {
          history.push('/pedidos')
        } else {
        history.push('/')
        }
       }, 1000);
       
      }
    
    

    return (
        <Container>
            <LoginImage src={LoginImg} alt="Login-image" />
            <ContainerItens>
            <img src={Logo} alt="logo-code-burguer" />
            <h1>Login</h1>

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Label>Email</Label>
          <Input type="email" 
          { ... register("email")}
          error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input type="password"
           { ... register("password")}
           error={errors.password?.message}
           />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>


          <Button type="submit" style={{marginTop: 25, marginBottom: 25 }}>
            Sign In
            </Button>
          </form>
          <SignInLink>
            Não possui Conta?{' '}
            <Link style={{ color: 'white' }} to="/cadastro">
            Sing Up
            </Link>
          </SignInLink>

            </ContainerItens>
        </Container>
    )
}

