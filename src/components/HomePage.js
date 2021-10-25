import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { Header, Page } from "./shared/styledComponents";
import { LogOutOutline } from 'react-ionicons'
import { sendLogoutRequest } from "../services/MyWallet";

export default function HomePage () {
    let history = useHistory();
    const {userData, setUserData} = useContext(UserContext);

    useEffect(() => {
        if (userData) {
            
        }else if (userData === ""){
            history.push("/sign-in")
        }
    }, [userData])

    function logout (){
        sendLogoutRequest()
            .finally(()=>{
                setUserData(null);
                localStorage.removeItem("userData");
                history.push("/sign-in");
            })
    }

    if(!userData) return <Page></Page>

    return(
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
            <WhiteBoard/>
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