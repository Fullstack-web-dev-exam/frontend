import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
    0% { margin-bottom: 0; }
    50% { margin-bottom: 15px }
    100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-top: 4.5em;
`;

const Dot = styled.div`
    background-color: black;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    
    animation: ${BounceAnimation} 0.5s linear infinite;
    animation-delay: ${props => props.delay};
`;

/**
 * ## How it works
 * The loading component is a styled component that shows three dots moving up and down, 
 * symbolizing a loading state. The loading component is shown when the front-end waits 
 * on data provided by the back-end.
 * 
 * ## Usage
 * Import Loading from `src/components/Loading/Loading` place the `<Loading />` component 
 * where you want the loading animation to show up.
 */
class Loading extends Component {
    render() {
        return (
            <DotWrapper>
                <Dot delay="0s" />
                <Dot delay=".1s" />
                <Dot delay=".2s" />
            </DotWrapper>
        )
    }
}

export default Loading;