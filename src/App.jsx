import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'V3kN1cfyyjLRNylwAWcJVAFW';

    return (
        <>
            <BrowserRouter >
                <Link to='/'>
                    <NavContainer>CINEFLEX</NavContainer>
                </Link>

                <Routes>
                    <Route path='/' Component={HomePage} />
                    <Route path='/sessoes/:idFilme' Component={SessionsPage} />
                    <Route path='/assentos/:idSessao' Component={SeatsPage} />
                    <Route path='/sucesso' Component={SuccessPage} />

                    {/* <HomePage /> */}
                    {/* <SeatsPage /> */}
                    {/* <SessionsPage /> */}
                    {/* <SuccessPage /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    left: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
