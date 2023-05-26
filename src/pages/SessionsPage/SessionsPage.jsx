import styled from "styled-components"
import axios from "axios";
import { useState, useEffect } from "react";


export default function SessionsPage() {

    const [filme, setFilme] = useState([]);
    const [days, setDays] = useState([]);

    useEffect(recebeFilme, []);

    function recebeFilme() {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/1/showtimes`;

        const promisse = axios.get(URL);
        promisse.then((resposta) => {
            setFilme(resposta.data);
            console.log(resposta.data);
            setDays(resposta.data.days);
            console.log(resposta.data.days);
        })      

        promisse.catch((erro) => console.log(erro.response.data));
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {days.map(days => (
                    <SessionContainer key={days.id}>
                        {days.weekday} - {days.date}

                        <ButtonsContainer>
                            <button key={days.showtimes[0].id}>{days.showtimes[0].name}</button>
                            <button key={days.showtimes[1].id}>{days.showtimes[1].name}</button>
                        </ButtonsContainer>

                    </SessionContainer>
                )
                )}
            </div>

            <FooterContainer>
                <div>
                    <img src={filme.posterURL} alt={`poster ${filme.title}`}/>
                </div>
                <div>
                    <p>{filme.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        width: 83px;
        height: 43px;
        font-size: 18px;
        color: #FFFFFF;
        background-color: #E8833A;
        border-radius: 3px;
        border: none;
    }
    button:hover {
        cursor: pointer;
        background-color: #fab27e;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`