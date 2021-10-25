import styled from "styled-components"
import dayjs from "dayjs";
import { Value } from "./shared/styledComponents";

export default function Operation({id, date, value, description}){
    return(
        <OperationSC>
            <div className="description"><Date>{dayjs(date).format("DD/MM")}</Date> {description}</div>
            <Value value={value}>{value > 0? (value/100).toFixed(2) : (-value/100).toFixed(2)}</Value>
        </OperationSC>
    )
}

const OperationSC = styled.div`
    width: 100%;
    height: 30px;
    font-size: 16px;
    line-height: 18px;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items:center;
    .description{
        width: 75%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const Date = styled.span`
    color: #C6C6C6;
`;
