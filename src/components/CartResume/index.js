import React, { useState, useEffect } from 'react'

import { Container } from './styles'
import { Button } from '../Button'
import formatCurrency from '../../utils/formatCurrency'
import { useCart } from '../../hooks/CartContext'
import { set } from 'react-hook-form'
import api from '../../services/api'
import { toast } from 'react-toastify'


export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0)
    const [deliverytax] = useState(5)

     const { cartProducts } = useCart()

     useEffect(() => {
     const sumAllItems = cartProducts.reduce((acc, current) => {
        return current.price * current.quantity + acc
     }, 0)

        setFinalPrice(sumAllItems)
     }, [cartProducts, deliverytax])

     const submitOrder = async () => {
        const order = cartProducts.map( product => {
            return { id: product.id, quantity: product.quantity }
        })

       await toast.promise( api.post('orders', { products: order }),{
          pending: 'Realizando o seu pedido.....',
          success: 'Pedido realizado com sucesso',
          error: 'Falha ao tentar realizar o seu pedido, tente novamente'

       })
     }

    return(
        <div>
         <Container>
           <div className='container-top'>
           <h2 className='title'>Resumo do Pedido</h2>
           <p className='itens'>Itens</p>
           <p className='itens-price'>{formatCurrency(finalPrice)}</p>
           <p className='delivery-tax'>Taxa de entrega</p>
           <p className='delivery-tax-price'>{formatCurrency(deliverytax)}</p>
           </div>
           <div className='container-bottom'>
            <p>Total</p>
            <p>{formatCurrency(finalPrice + deliverytax)}</p>
           </div>
            </Container>
            <Button style={{ width: '100%', marginTop: 30 }} onClick={submitOrder}>Finalizar Pedido</Button>
            </div>
    )
}

