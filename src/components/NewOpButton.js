import styled from "styled-components";
import { AddCircleOutline } from 'react-ionicons'
import { RemoveCircleOutline } from 'react-ionicons'
import { useHistory } from "react-router";

export default function NewOpButton ({type}){
    let history = useHistory()

    function GotoNewOpPage (){
        history.push(`/new/${type}`)
    }

    return(
        <SquareButton onClick={GotoNewOpPage}>
            <div className="icon">
                {type === "entrada" ?
                <AddCircleOutline
                    color={'#fff'} 
                    height="30px"
                    width="30px"
                />
                :
                <RemoveCircleOutline
                    color={'#fff'} 
                    height="30px"
                    width="30px"
                />}
            </div>
            
            <p>Nova</p>
            <p>{type}</p>
        </SquareButton>
    )
}

const SquareButton = styled.div`
    width: 155px;
    height: 114px;
    background-color: #A328D6;
    border-radius: 5px; 
    padding: 10px;
    .icon{
        margin-bottom: 30px;
    }
    p{
        font-weight: 700;
        font-size: 17px;
    }
`;