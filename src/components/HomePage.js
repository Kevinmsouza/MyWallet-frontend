import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { Header, Page } from "./shared/styledComponents";
import { LogOutOutline } from 'react-ionicons'
import { sendLogoutRequest, getOperationsRequest } from "../services/MyWallet";
import Operation from "./Operation";

export default function HomePage() {
    let history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const [ operations, setOperations ] = useState([])
    useEffect(() => {
        if (userData) {
            renderOperations()
        } else if (userData === "") {
            history.push("/sign-in")
        }
    }, [userData])

    function renderOperations() {
        getOperationsRequest(userData.token)
            .then(res => {
                setOperations(res.data)
            })
            .catch(err => {
                alert("Ocorreu um error!")
                console.log(err)
            })
    }

    function logout() {
        sendLogoutRequest()
            .finally(() => {
                setUserData(null);
                localStorage.removeItem("userData");
                history.push("/sign-in");
            })
    }

    if (!userData) return <Page></Page>

    return (
        <Page>
            <Header>
                <div>Olá, {userData.name.split(' ')[0]}</div>
                <LogOutOutline
                    color={'#fff'}
                    height="40px"
                    width="40px"
                    onClick={logout}
                />
            </Header>
            <WhiteBoard>
                {operations.length?
                    operations.map(e => <Operation 
                        key={e.id} 
                        id={e.id}
                        date={e.date}
                        value={e.value}
                        description={e.description}
                    />)
                    :
                    <EmptyBoard>
                        <p>Não há registros de</p>
                        <p>entrada ou saída</p>
                    </EmptyBoard>
                }
            </WhiteBoard>
            <Footer>

            </Footer>
        </Page>
    )
}

const WhiteBoard = styled.div`
    height: calc(100vh - 219px);
    width: 85vw;
    background-color: #fff;
    overflow: scroll;
    padding: 10px;
`;

const EmptyBoard = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #868686;
`;

const Footer = styled.footer`
    height: 143px;
    width: 85vw;
    display: flex;
    justify-content: space-between;
`;

const SquareButton = styled.button`
    width: 155px;
    height: 114px;
    background-color: #A328D6;
    border-radius: 5px;
`;