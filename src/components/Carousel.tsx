import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';

const Container = styled.section`
    width: 100%;
    height: 500px;
    position: relative;
`;

const Show = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;

`;

const Images = styled.div<ImageProps>`
    background: url(${(props) => props.imageURL});
    width: 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    flex: none;
    transition: 0.5s;
`;

const PrevBtn = styled.div`
    color: #c0c0c0;
    position: absolute;
    left: 0;
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transiton: 0.5s;
    z-index: 11;
`;

const NextBtn = styled(PrevBtn)`
    left: unset;
    right: 0;
`;

const ButtonContainer = styled.div`
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonUl = styled.ul`
    display: flex;
    li{
        border: 5px solid white;
        border-radius: 50%;
        background: #ffffff;
        box-shaodw: 1px 1px 2px #000000e6;
        opacity: 0.5;
        margin: 8px;
        cursor: pointer;
    }

    .Button-selected {
        opacity: 1;
    }
`;





interface ImageProps {
    imageURL : string;
}

export const Carousel = () => {
    const images = [
        { src: 'https://react-shop-oinochoe.vercel.app/img_shop_fashion.jpeg' },
        { src: 'https://react-shop-oinochoe.vercel.app/img_shop_digital.jpeg' },
        { src: 'https://react-shop-oinochoe.vercel.app/img_shop_grocery.jpeg' },
    ];

    const [idx, setIdx] = useState(0);
    const [style, setStyle] = useState({
        transform: `translate(-${idx}00%)`
    })

    const IMAGE_SIZE = images.length;
    const slideRef = useRef<HTMLDivElement>(null);

    const slide = (i:number) => {
        let nextIdx = idx + i;
        if(nextIdx < 0) nextIdx = IMAGE_SIZE - 1;
        else if(nextIdx >= IMAGE_SIZE) nextIdx = 0;
        setIdx(nextIdx);
    };

    const handle = (i: number) => {
        setIdx(i);
        setStyle({ transform: `translate(-${i}00%)` });
    };

    useEffect(() => {
        setStyle({ transform: `translate(-${idx}00%)` });

    }, [idx]);

    useEffect(()=> {
        const time = setInterval(() => {
            setIdx((prev)=> (prev === IMAGE_SIZE -1 ? 0: prev + 1))
        },3000 );

        return () => {
            clearInterval(time)
        };
    }, [idx]);

    return(
        <>
            <Container>
                <Show ref = {slideRef}>
                    <PrevBtn role="button" onClick={() => slide(-1)}>
                        ◀️
                    </PrevBtn>
                    {images.map((image)=> (
                        <Images imageURL={image.src} key= {image.src} style={style}/>
                    ))}
                    <NextBtn role='button' onClick={()=> slide(1)}>
                        ▶️
                    </NextBtn>
                </Show>
                <ButtonContainer>
                    <ButtonUl>
                        {images.map((image, idx) => {
                            return (
                                <li
                                    role='button'
                                    onClick={(e) => handle(idx)}
                                    key= {image.src}
                                    className = {idx === idx ? 'Button-selected' : ''}
                                ></li>
                            )
                        })}
                    </ButtonUl>
                </ButtonContainer>
            </Container>
        </>
    );
};