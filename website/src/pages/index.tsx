import React from 'react'
import Layout from '@theme/Layout'
import parsed from 'parsed-path'
import styled, {css} from 'styled-components'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {Home} from '../components/Home'
import {Live} from '../components/Live'

const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props: any) => props.primary && css`
    background: white;
    color: black;
  `}
`

const Code = `
const Docs = parsed\`/\`\`docs\`\`get\`;

const Github = parsed.https\`github.com\`

const Username = parsed(Github)\`tseijp\`

const Repository = Username\`\${props => props.repository}\`

render(
  <>
    <Button href={Docs()}>Documentation</Button>
    <Button
      href={Repository()}
      target="_blank"
      rel="noopener"
      primary>
      Github
    </Button>
  </>
)
`.trim();

export default function App () {
    const {siteConfig} = useDocusaurusContext()
    return (
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <Home>
          <Home.Header/>
          <Live hero code={Code} noInline scope={{ React, parsed, Button }}>
            <Title>
              <Tagline>Visual primitives for the component age.</Tagline>
              <SupportingTagline>
                Use the best bits of ES6 to parse your path without stress 👋
              </SupportingTagline>
            </Title>
            <Live.Preview/>
            <Live.Container>
              <Live.Editor />
              <Live.Error />
            </Live.Container>
          </Live>
          <Home.Features/>
        </Home>
      </Layout>
    );
}

const Tagline = styled.h1`
  font-weight: 600;
  font-size: 1.3rem;
`;

const SupportingTagline = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
`;

const Title = styled.div`
  margin: 2rem 0;
  h1, h2 {
    margin: 0;
  }
`;
