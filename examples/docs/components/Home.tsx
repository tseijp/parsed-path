import React from 'react'
import styled from 'styled-components'

const blmGrey = 'rgb(33, 33, 33)';

const blmMetal = 'rgb(66, 66, 66)';

interface Home {
  <Props>(porps: Props): null | JSX.Element
  Header: <Props>(props: Props) => null | JSX.Element
  Tagline: <Props>(props: Props) => null | JSX.Element
  SupportingTagline: <Props>(props: Props) => null | JSX.Element
  Title: <Props>(props: Props) => null | JSX.Element
}

export const Home = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background: linear-gradient(20deg, ${blmGrey}, ${blmMetal});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 160px;
  padding-bottom: 160px;
` as unknown as Home;

Home.Header = styled.header`
    padding: 1rem 3rem;
    border: solid white;
    flex-direction: column;
    > p {
        text-align: left;
        font-size: 1.5rem;
    }
`;

Home.Tagline = styled.h1`
  font-weight: 600;
  font-size: 1.3rem;
`;

Home.SupportingTagline = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
`;

Home.Title = styled.div`
  margin: 2rem 0;
  h1, h2 {
    margin: 0;
  }
`;
