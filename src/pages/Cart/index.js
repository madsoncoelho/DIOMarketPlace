import React, { useMemo } from 'react';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';

import {
    Container, ProductContainer, ProductList, Product, ProductImage,
    ProductTitleContainer, ProductTitle, ProductPriceContainer,
    ProductSinglePrice, TotalContainer, ProductPrice, ProductQuantity,
    ActionContainer, ActionButton, TotalProductsContainer, TotalProductsText,
    SubTotalValue,
} from './styles';
import formatValue from '../../utils/formatValue';
import EmptyCart from '../../components/EmptyCart';
import * as CartActions from '../../store/modules/cart/actions';

export default function Cart() {
    const dispatch = useDispatch();

    const products = useSelector(({ cart }) => cart);

    const cartSize = useMemo(() => {
        return products.length || 0;
    }, [products]);

    const cartTotal = useMemo(() => {
        const cartAmount = products.reduce((accumulator, product) => {
            const totalPrice = accumulator + product.price * product.amount;
            return totalPrice;
        }, 0);

        return formatValue(cartAmount);
    }, [products]);

    function increment(product) {
        dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
    }

    function decrement(product) {
        dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
    }

    function removeFromCart(id) {
        dispatch(CartActions.removeFromCart(id));
    }
    
    return (
        <Container>
            <ProductContainer>
                <ProductList data={products} keyExtractor={(item) => item.id}
                    ListEmptyComponent={<EmptyCart />}
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={{
                        height: 80,
                    }}
                    renderItem={({ item }) => (
                        <Product>
                            <ProductImage source={{ uri: item.image_url }} />
                            <ProductTitleContainer>
                                <ProductTitle>{item.title}</ProductTitle>
                                <ProductPriceContainer>
                                    <ProductSinglePrice>{formatValue(item.price)}</ProductSinglePrice>
                                    <TotalContainer>
                                        <ProductQuantity>{`${item.amount}x`}</ProductQuantity>
                                        <ProductPrice>{formatValue(item.price * item.amount)}</ProductPrice>
                                    </TotalContainer>
                                </ProductPriceContainer>
                            </ProductTitleContainer>
                            <ActionContainer>
                                <ActionButton onPress={() => increment(item)}>
                                    <FeatherIcon name="plus" color="#e83f5b" size={16} />
                                </ActionButton>
                                <ActionButton onPress={
                                    () => item.amount > 1 ? decrement(item) : removeFromCart(item.id)
                                }>
                                    <FeatherIcon name="minus" color="#e83f5b" size={16} />
                                </ActionButton>
                            </ActionContainer>
                        </Product>
                    )}
                />
            </ProductContainer>
            <TotalProductsContainer>
                <FeatherIcon name="shopping-cart" color="#fff" size={24} />
                    <TotalProductsText>{cartSize} {cartSize === 1 ? 'item' : 'items'}</TotalProductsText>
                <SubTotalValue>{cartTotal}</SubTotalValue>
            </TotalProductsContainer>
        </Container>
    );
}