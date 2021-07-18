import React from 'react'
import Layout from '@theme/Layout'
import parsed from 'parsed-path'
import styled, {css} from 'styled-components'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {Home} from '../../components/Home'
import {Live} from '../../components/Live'

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
const Docs = parsed\`docs\`\`get\`;

const Github = parsed.https\`github.com\`

const Username = Github\`\${props => props.usermame}\`

const Repository = parsed(Username)\`parsed-path\`

render(
  <>
    <Button href={Docs()}>Documentation</Button>
    <Button
      href={Repository({usermame: 'tseijp'})}
      repository="parsed-path"
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
          <Home.Header>
            <h1>{`<👋>`}</h1>
            <p>parsed</p>
            <p>path</p>
          </Home.Header>
          <Live hero code={Code} noInline scope={{ React, parsed, Button }}>
            <Home.Title>
              <Home.Tagline></Home.Tagline>
              <Home.SupportingTagline>
                Use the best bits of ES6 to parse your path without stress 👋
              </Home.SupportingTagline>
            </Home.Title>
            <Live.Preview/>
            <Live.Container style={{maxWidth: "34rem"}}>
              <Live.Editor style={{minHeight: "27rem"}}/>
              <Live.Error />
            </Live.Container>
          </Live>
        </Home>
      </Layout>
    );
}
