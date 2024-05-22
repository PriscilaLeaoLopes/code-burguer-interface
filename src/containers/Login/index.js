import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import  LoginImg from '../../assets/login-image.svg'
import  Logo from '../../assets/logo.svg'
import api from '../../services/api'

import {
    Container,
    LoginImage,
    ContainerItens,
    Label,
    Input,
    Button,
    SignInLink,
    ErrorMessage,
} from './styles'

function Login() {
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

      const onSubmit =  (clientData) => {
        const response = api.post('/sessions',{
          email: clientData.email,
          password: clientData.password,
        })
        console.log(response)
      }

    return (
        <Container>
            <LoginImage src={LoginImg} alt="Login-image" />
            <ContainerItens>
            <img src={Logo} alt="logo-code-burguer" />
            <h1>Login</h1>

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Label>Email</Label>
          <Input type="email" { ... register("email")}/>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input type="password" { ... register("password")}/>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>


          <Button type="submit">Sign In</Button>
          </form>
          <SignInLink>
            Não possui Conta ? <a>Sing Up</a>
          </SignInLink>

            </ContainerItens>
        </Container>
    )
}

export default Login