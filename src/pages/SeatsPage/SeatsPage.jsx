import { useState, useEffect } from "react";
import styled from "styled-components"
import axios from "axios";
import loading from '../../assets/loading.gif';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SeatsPage() {

    const [filme, setFilme] = useState([]);
    const [data, setData] = useState([]);
    const [assentos, setAssentos] = useState([]);
    const [horario, setHorario] = useState('');
    const [active, setActive] = useState([]);
    const parametros = useParams();

    useEffect(recebeFilme, []);

    function recebeFilme() {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`;

        const promisse = axios.get(URL);
        promisse.then((resposta) => {
            setFilme(resposta.data.movie);
            setData(resposta.data.day);
            setAssentos(resposta.data.seats);
            setHorario(resposta.data.name);
            console.log(resposta.data.seats);
        })

        promisse.catch((erro) => console.log(erro.response.data));
    }

    if (filme.length === 0) {
        return (
            <>
                <PageContainer>
                    <img src={loading} alt="carregando" />
                </PageContainer>
            </>
        )
    }

    function ativos(id, disponivel) {
        if(disponivel) {
            if (!active.includes(id)) {
                let novoAtivos = [...active, id];
                setActive(novoAtivos);
                console.log(novoAtivos);
            } else {
                let novoAtivos = [...active];
                novoAtivos.splice(novoAtivos.indexOf(id), 1);
                setActive(novoAtivos);
                console.log(novoAtivos);
            }
        }
    }

    function selecionado(id) {
        if(active.includes(id)) {
            return 'selecionado'
        }
    }

    function cor(id, disponivel) {
        if(disponivel) {
            if(active.includes(id)) {
                return '#1AAE9E';
            } else {
                return '#C3CFD9';
            }
        } else {
            return '#FBE192';
        }
    }

    function borda(id, disponivel) {
        if(disponivel) {
            if(active.includes(id)) {
                return '#0E7D71';
            } else {
                return '#7B8B99';
            }
        } else {
            return '#F7C52B';
        }
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map(assento => (
                    <SeatItem data-test='seat' key={assento.id} borda={() => borda(assento.id, assento.isAvailable)} cor={() => cor(assento.id, assento.isAvailable)}  disponivel={assento.isAvailable} onClick={() => ativos(assento.id, assento.isAvailable)} selecionado={selecionado(assento.id)}>{assento.name}</SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle cor='#1AAE9E' borda='#0E7D71' />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor='#C3CFD9' borda='#7B8B99' />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor='#FBE192' borda='#F7C52B' />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input data-test='client-name' placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input data-test='client-cpf' placeholder="Digite seu CPF..." />

                <button data-test='book-seat-btn'>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test='footer'>
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filme.title}</p>
                    <p>{`${data.weekday} - ${horario}`}</p>
                </div>
            </FooterContainer>

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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    font-size: 18px;
    button {
        margin: 10px;
        align-self: center;
        width: 225px;
        height: 42px;
        background-color: #E8833A;
        color: #FFFFFF;
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        border-radius: 3px;
        border: none;
    }
    input {
        margin: 5px;
        width: 327px;
        height: 51px;
        border: 1px solid #D4D4D4;
        border-radius: 3px;
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
    
`
const CaptionCircle = styled.div`
    border: /* 1px solid blue; */ ${props => `1px solid ${props.borda}`};         // Essa cor deve mudar
    background-color: /* lightblue; */ ${props => props.cor};   // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${(props) => (props.borda)}; /* ${props => `1px solid ${props.borda1}`};  */        // Essa cor deve mudar
    background-color: /* lightblue; */ ${(props) => (props.cor)};// Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    &:hover {
        ${props => (props.disponivel ? 'cursor: pointer' : 'cursor: default')};
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