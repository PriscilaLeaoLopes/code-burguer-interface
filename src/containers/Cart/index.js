import React from 'react'

import CartLogo from '../../assets/cart-image.svg'
import { Container, CartImg, Wrapper } from './styles'
import {CartItems, CartResume } from '../../components'


export function Cart() {
    return(
         <Container>
            <CartImg src={CartLogo} alt="logo do Carinho" />
            <Wrapper>
            <CartItems/>
            <CartResume/>
            </Wrapper>
            </Container>
    )
}

