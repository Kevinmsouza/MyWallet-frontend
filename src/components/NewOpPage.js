import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../contexts/UserContext";
import { postOperationsRequest } from "../services/MyWallet";
import { GeneralForm, GeneralInput, Header, Page, WideButton } from "./shared/styledComponents";


export default function NewOpPage (){
    const {type} = useParams()
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory()
    const {userData} = useContext(UserContext)

    useEffect(() => {
        if (userData) {   
        } else if (userData === "") {
            history.push("/sign-in")
        }
    }, [userData])

    function saveOp (e){
        setIsLoading(true);
        e.preventDefault();
        const body = {
            value: type === 'entrada'? value : -value,
            description
        }
        postOperationsRequest(body, userData.token)
            .then(res => {
                history.push('/')
            })
            .catch(err => {
                alert("Ocorreu um error!")
            })
    }

    return(
        <Page>
            <Header>Nova {type}</Header>
            <GeneralForm onSubmit={saveOp}>
            <GeneralInput
                    placeholder="Valor"
                    pattern="^[0-9]*$"
                    title="Insira apenas numeros"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <GeneralInput
                    placeholder="Descrição"
                    pattern=".{2,}"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <WideButton type="submit" disabled={isLoading}>Salvar {type}</WideButton>
            </GeneralForm>
        </Page>
    )
}