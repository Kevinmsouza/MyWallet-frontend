import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { Header, Page, Value } from "./shared/styledComponents";
import { LogOutOutline } from 'react-ionicons'
import { sendLogoutRequest, getOperationsRequest } from "../services/MyWallet";
import Operation from "./Operation";
import NewOpButton from "./NewOpButton";

export default function HomePage() {
    let history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const [ operations, setOperations ] = useState([])
    const [ total, setTotal] = useState(0)
    useEffect(() => {
        if (userData) {
            renderOperations()
        } else if (userData === "") {
            history.push("/sign-in")
        }
    }, [userData])

    useEffect(() => {
        if (operations.length){
            setTotal(operations.map(op => op.value).reduce((p, c) => p + c))
        }
    }, [operations])

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
            <Total>
                <p>SALDO</p>
                <Value value={total}>{total > 0? (total/100).toFixed(2) : (-total/100).toFixed(2)}</Value>
            </Total>
            <Footer>
                <NewOpButton type="entrada"/>
                <NewOpButton type="saída"/>
            </Footer>
        </Page>
    )
}

const WhiteBoard = styled.div`
    height: calc(100vh - 250px);
    width: 85vw;
    background-color: #fff;
    overflow: scroll;
    padding: 10px;
    border-radius: 5px 5px 0 0;
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
    padding-top: 13px;
`;

const Total = styled.div`
    width: 85vw;
    height: 30px;
    font-size: 17px;
    line-height: 20px;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items:center;
    border-radius: 0 0 5px 5px;
    background-color: #fff;
    padding: 10px;
    p{
        font-weight: 700;
    }
`;