import { useContext, useEffect, useState } from "react"
import { sendLoginRequest } from "../services/MyWallet";
import { GeneralForm, GeneralInput, Logo, Page, TextButton, WideButton } from "./shared/styledComponents"
import { Link, useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function SignInPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory()
    const { userData, setUserData } = useContext(UserContext)

    useEffect(() => {
        if (userData) {
            history.push("/");
        }
    }, [userData])

    function login(e) {
        setIsLoading(true);
        e.preventDefault();
        const body = {
            email,
            password
        }
        sendLoginRequest(body)
            .then(res => {
                setIsLoading(false);
                setUserData(res.data);
                localStorage.setItem("userData", JSON.stringify(res.data));
                history.push("/");
            })
            .catch(err => {
                setIsLoading(false);
                if (err.response.status === 404) {
                    alert("Email ou senha incorretos!");
                    return;
                }
                if (err.response.status === 500) {
                    alert("Error com o servidor, tente novamente.");
                    return;
                }
                alert("Ocurreu um Error!")
            })
    }
    return (
        <Page>
            <Logo>MyWallet</Logo>
            <GeneralForm onSubmit={login}>
                <GeneralInput
                    placeholder="E-mail"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <GeneralInput
                    placeholder="Senha"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <WideButton type="submit" disabled={isLoading}>Entrar</WideButton>
            </GeneralForm>
            <Link to={isLoading ? "/sign-in" : "/sign-up"}>
                <TextButton>Primeira vez? Cadastre-se!</TextButton>
            </Link>

        </Page>
    )
}