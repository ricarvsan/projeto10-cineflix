import { useEffect, useState } from "react";
import styled from "styled-components"
import axios from "axios";
import loading from '../../assets/loading.gif'
import { Link } from "react-router-dom";

export default function HomePage() {

    const [filmes, setFilmes] = useState([]);

    useEffect(recebeFilmes, []);

    function recebeFilmes() {
        const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies';

        const promisse = axios.get(URL);
        promisse.then((resposta) => {
            setFilmes(resposta.data);
            console.log(resposta.data);
        })

        promisse.catch((erro) => console.log(erro.response.data));
    }

    if (filmes.length === 0) {
        return (
            <>
            <PageContainer>
                <img src={loading} alt="carregando" />
            </PageContainer>
            </>
        )
    }

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {filmes.map(filme => (
                    <MovieContainer data-test='movie' key={filme.id}>
                        <Link to={`sessoes/${filme.id}`}>
                            <img src={filme.posterURL} alt={`poster ${filme.title}`} />
                        </Link>
                    </MovieContainer>
                ))}
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
    img {
        width: 100%;
    }
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`