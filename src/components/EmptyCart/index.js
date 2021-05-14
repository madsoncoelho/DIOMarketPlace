import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';

import { Container, EmptyCartContainer, EmptyCartText } from './styles';
import emptyCartAnimation from '../../../EmptyCartAnimation.json';

export default function EmptyCart() {

    /* Empty Cart Option 1
    
    return (
        <Container>
            <FeatherIcon name="slash" size={30} color="#f3f9ff" />
            <EmptyCartText>Seu carrinho está vazio.</EmptyCartText>
        </Container>
    );
    */

    /* Empty Cart Option 2 */
    return (
        <Container>
            <EmptyCartContainer>
                <LottieView source={emptyCartAnimation} resizeMode="contain"
                    autoPlay loop />
            </EmptyCartContainer>
            <EmptyCartText>Seu carrinho está vazio</EmptyCartText>
        </Container>
    );    
}