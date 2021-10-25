import styled from "styled-components";

const Page = styled.article`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.div`
    width: 147px;
    height: 50px;
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;
    color: #ffffff;
    margin-bottom: 25px;
`;

const GeneralForm = styled.form`
    width: 85vw;
    margin-bottom: 35px;
`;

const GeneralInput = styled.input`
    width: 85vw;
    height: 58px;
    color: #000000;
    background-color: #fff;
    font-size: 20px;
    font-weight: 400;
    border-radius: 5px;
    border: none;
    padding: 0 10px 0 15px;
    margin-bottom: 13px;
    &::placeholder{
        color: #000000;
        font-size: 20px;
        font-weight: 400;
    }
    &:focus{
        outline: none;
    }
    &:disabled{
        opacity: 0.7;
    }
`;

const WideButton = styled.button`
    width: 85vw;
    height: 58px;
    color: #ffffff;
    background-color: #A328D6;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    border: none;
    &:disabled{
        opacity: 0.7;
    }
`;

const TextButton = styled.p`
    font-size: 15px;
    line-height: 18px;
    font-weight: 700;
`;

export {
    Page,
    Logo,
    GeneralForm,
    GeneralInput,
    WideButton,
    TextButton
}