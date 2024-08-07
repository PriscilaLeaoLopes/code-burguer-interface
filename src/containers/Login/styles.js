import styled from 'styled-components'

import Background from '../../assets/background.svg'

export const Container = styled.div`
  height: 100vh ;
  width: 100vw;
  background: url('${Background}');
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginImage = styled.img`
height: 80%;

`


export const ContainerItens = styled.div`
background: #373737;
border-radius: 0 10px 10px 0;
height: 80%;
padding: 25px 75px;
display: flex;
flex-direction: column;
justify-content: center;

img {
  width: 360px;
  height:94px;
  
}

form{
  display: flex;
  flex-direction: column;
}

h1 {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 28px;
      color: #ffffff;
      text-align: center;
      margin-top: 80px;
}


`

export const Label = styled.p`
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 10px;
      color: #ffffff;
      margin-top: 25px;
      margin-bottom: 5px;
`

export const Input = styled.input`
width: 391.42px;
height: 38.32px;
background: #ffffff;
box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
border-radius: 10px;
border: ${ props => (props.error ? '2px solid #ffff' : 'none')};
padding-left: 10px;

`

export const SignInLink = styled.p`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 16px;
color: #ffffff;

a {
    cursor: pointer;
    text-decoration: underline;
}

`
