import React from "react";
import styled from 'styled-components';

const Tabs = (props) => {
    return (
        <TabsWrapper>
            <TabsButon className="active">Самый дешевый</TabsButon>
            <TabsButon>Самый быстрый</TabsButon>
        </TabsWrapper>
    );
}

const TabsWrapper = styled.div`
    margin-bottom: 20px;
`;

const TabsButon = styled.button`
    padding: 14px 15px;
    width: 50%;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.5px;
    text-content: center;
    text-transform: uppercase;
    color: inherit;
    background-color: #FFFFFF;
    border: 1px solid #DFE5EC;
    box-sizing: border-box;

    &.active {
        color: #FFFFFF;
        background-color: #2196F3;
        border-color: #2196F3;
    }

    &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    &:hover:not(.active) {
        background-color: #F1FCFF;
        cursor: pointer;
    }
`;

export default Tabs;