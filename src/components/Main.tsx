import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const Products = styled.section`
  width: 80%;
  margin: 0 auto;
  margin-top: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
`;

const ProductWrap = styled.div`
  display: flex;
  width: 100%;
`;

const ProductItem = styled.div`
  flex: 0 0 calc(25% - 10px);
  height: 500px;
  margin-right: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  border: 1px solid black;
`;

const ProductImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 70%;

  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
`;

const ProductTitle = styled.h1`
  font-size: 1rem;
  text-align: center;
  padding: 10px;
`;

interface ProductData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export default function Main() {
  const [productData, setProductData] = useState<ProductData[]>([]);

  useEffect(() => {
    axios.get<{ products: ProductData[] }>('/data/products.json')
      .then((response) => {
        setProductData(response.data.products);
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }, []);

  const groupByCategory = (data: ProductData[], category: string) => {
    return data.filter((product) => product.category === category)
  }

  const fashionProducts = groupByCategory(productData, "men's clothing")
  const accessoryProducts = groupByCategory(productData, "jewelery");
  const digitalProducts = groupByCategory(productData, "electronics");

  return (
    <>
      <Products>
        <Title>패션</Title>
        <ProductWrap>
          {fashionProducts.slice(0, 4).map((product) => (
            <ProductItem key={product.id}>
              <ProductImage imageUrl={product.image}/>
              <ProductTitle>{product.title}</ProductTitle>
            </ProductItem>
          ))}
        </ProductWrap>
        <Title>액세서리</Title>
        <ProductWrap>
          {accessoryProducts.slice(0, 4).map((product) => (
            <ProductItem key={product.id}>
              <ProductImage imageUrl={product.image}/>
              <ProductTitle>{product.title}</ProductTitle>
            </ProductItem>
          ))}
        </ProductWrap>
        <Title>디지털</Title>
        <ProductWrap>
          {digitalProducts.slice(0, 4).map((product) => (
            <ProductItem key={product.id}>
              <ProductImage imageUrl={product.image}/>
              <ProductTitle>{product.title}</ProductTitle>
            </ProductItem>
          ))}
        </ProductWrap>
      </Products>
    </>
  );
}
