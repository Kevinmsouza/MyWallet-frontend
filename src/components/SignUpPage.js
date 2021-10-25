import { useState } from "react"
import { sendSignUpRequest } from "../services/MyWallet";
import { GeneralForm, GeneralInput, Logo, Page, TextButton, WideButton } from "./shared/styledComponents"
import { Link, useHistory } from "react-router-dom";

export default function SignUpPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory()

    function signUp(e) {
        setIsLoading(true);
        e.preventDefault();
        const body = {
            name,
            email,
            password
        }
        sendSignUpRequest(body)
            .then(res => {
                setIsLoading(false);
                history.push("/sign-in");
            })
            .catch(err => {
                setIsLoading(false);
                if (err.response.status === 409) {
                    alert("Email já utilizado!");
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
            <GeneralForm onSubmit={signUp}>
                <GeneralInput
                    placeholder="Nome"
                    value={name}
                    pattern="\S{3, 40}"
                    title="Nomes devem ter entre 3 e 40 caracteres"
                    onChange={e => setName(e.target.value)}
                    required
                    disabled={isLoading}
                />
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
                    pattern="\S{6,}"
                    title="Minimo 6 caracteres."
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <GeneralInput
                    placeholder="Confirme a senha"
                    type="password"
                    value={password2}
                    pattern={password}
                    title="Senhas devem ser iguais"
                    onChange={e => setPassword2(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <WideButton type="submit" disabled={isLoading}>Cadastrar</WideButton>
            </GeneralForm>
            <Link to={isLoading ? "/sign-up" : "/sign-in"}>
                <TextButton>Já tem uma conta? Entre agora!</TextButton>
            </Link>
        </Page>
    )
}