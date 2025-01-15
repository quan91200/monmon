import { useState } from 'react'
import styled, { css } from 'styled-components'
import LazyLoad from 'react-lazyload'
import images from '../api/users.json'

const Gallery = () => {
    const [model, setModel] = useState(false)
    const [tempImgSrc, setTempImgSrc] = useState('')
    const { posts } = images
    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc)
        setModel(true)
    }

    const closeModal = () => {
        setModel(false)
    }

    return (
        <>
            <Modal open={model} onClick={closeModal}>
                <img
                    alt=''
                    src={tempImgSrc}
                />
            </Modal>
            <Container className='max-w-3xl mx-auto py-3 bg-pink-100 px-2'>
                {posts.map((post, index) => (
                    post.image && (
                        <Pics key={index} onClick={() => getImg(post.image)}>
                            {/* LazyLoad wrapper */}
                            <LazyLoad height={200} offset={100} once>
                                <img
                                    alt={`Gallery image ${index + 1}`}
                                    src={post.image}
                                    loading="lazy"
                                    style={{ width: '100%' }}
                                />
                            </LazyLoad>
                        </Pics>
                    )
                ))}
            </Container>
        </>
    )
}

export default Gallery

const Container = styled.div`
    -webkit-column-count: 5;
    -moz-column-count: 5;
    column-count: 5;
    -webkit-column-width: 20%;
    -moz-column-width: 20%;
    column-width: 20%;

    @media (max-width: 1300px){
        -webkit-column-count: 4;
        -moz-column-count: 4;
        column-count: 4;
    }
    
    @media (max-width: 1200px) {
        -webkit-column-count: 3;
        -moz-column-count: 3;
        column-count: 3;
    }
`;

const Pics = styled.div`
    -webkit-transition: all 350ms ease;
    transition: all 350ms ease;
    cursor: pointer;
    margin-bottom: 1rem;

    &:hover {
        transform: scale(1.03);
        -webkit-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
`

const Modal = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: fixed;
    inset: 0;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.5s ease;
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    background-color: #000000;
    overflow-y: hidden;
    
    ${props => props.open && css`
        visibility: visible;
        opacity: 1;
        transform: scale(1);
    `}

    .img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        display: block;
        line-height: 0;
        box-sizing: border-box;
        padding: 1.25rem 1.25rem;
        margin: 0 auto;
    }
`