import React, { useEffect, useState } from 'react'

import api from '../../../services/api'
import { Container, Label, Input, ButtonStyles, LabelUpload, containerInput } from './styles'
import ReactSelect from 'react-select'
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import * as Yup from 'yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ErrorMessage } from '../../../components'


 function EditProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const { 
    push, 
    location: {
      state: { product }
    }
   } = useHistory()

console.log(product)


  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.string().required('Digite o preço do produto'),
    category: Yup.object().required('Escolha uma categoria'),
    offer: Yup.bool()
  })

  const {
   register, 
   handleSubmit,
   control, 
   formState: { errors }
     } = useForm({
      resolver: yupResolver(schema)
     })

   const onSubmit = async data => {
     const productDataFormData = new FormData()

     productDataFormData.append('name', data.name)
     productDataFormData.append('price', data.price)
     productDataFormData.append('category_id', data.category.id)
     productDataFormData.append('file', data.file[0])
     productDataFormData.append('offer', data.offer)

    await toast.promise(api.put(`products/${product.id}`, productDataFormData), {
      pending: 'Editando novo produto.....',
      success: 'Produto Editado com Sucesso',
      error: 'Falha ao editar o produto'
    })

    setTimeout(() => {
      push('/listar-produtos')
    }, 2000)
   }

    useEffect(() => {
        async function loadCategories() {
          const { data } = await api.get('Categories')
          setCategories(data)
          }
           loadCategories()
      }, [])

 return (
 <Container>
  <form noValidate onSubmit={handleSubmit(onSubmit)}>
    <div>
    <Label>Nome</Label>
    <Input type="text" 
    {...register('name')}
    defaultValue={product.name}
    />
    <ErrorMessage>{errors.name?.message}</ErrorMessage>
    </div>

    <div>
    <Label>Preço</Label>
    <Input type="number" {...register('price')} 
    defaultValue={product.price}
    />
        <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>

         <div> 
    <LabelUpload>
      {fileName || (
        <>
        <CloudUploadIcon />
        Carregue a imagem do produto
        </>
      )}

    <input type="file" accept="image/png, image/jpeg" 
    {...register('file')}
    onChange={value => {
      setFileName(value.target.files[0]?.name)
    }}
    />
      </LabelUpload>
      <ErrorMessage>{errors.file?.message}</ErrorMessage>
      </div> 

      <div>
    <Controller 
    name="category"
    defaultValue={product.category}
     control={control}
     render={({ field }) => {
     return(
    <ReactSelect 
    {...field}
    options={categories}
    getOptionLabel={cat => cat.name}
    getOptionValue={cat => cat.id}
    placeholder="...Escolha a Categoria"
    defaultValue={product.category}

    />
    )
    }}
   ></Controller>
       <ErrorMessage>{errors.category?.message}</ErrorMessage>
       </div>
     
     <containerInput>
     <input 
      type="checkbox" 
      {...register('offer')} 
      defaultChecked={product.offer}
     />
     <Label>Produto em oferta</Label>
     </containerInput>
    <ButtonStyles>Editar produto</ButtonStyles>
    </form>
    </Container>
  )
}


export default EditProduct