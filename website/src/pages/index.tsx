import React from 'react'
import rem from 'polished/lib/helpers/rem'
import Layout from '@theme/Layout'
import darken from 'polished/lib/color/darken'
import parsed from 'parsed-path'
import styled, {css} from 'styled-components'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import HomepageHeader from '../components/HomepageHeader'
import HomepageFeatures from '../components/HomepageFeatures'
export const bodyFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const headerFont = `"Avenir Next", ${bodyFont}`;
const monospace = 'dm, monospace';
const sidebarWidth = 300;
const blmGrey = 'rgb(33, 33, 33)';
const blmMetal = 'rgb(66, 66, 66)';

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

const headerCode = `
const Docs = parsed\`/\`\`docs\`;

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

export default function Home () {
    const {siteConfig} = useDocusaurusContext()
    return (
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <Wrapper>
          <HomepageHeader/>
          <Content hero>
            <LiveProvider code={headerCode} noInline scope={{ React, parsed, Button }}>
              <Title>
                <Tagline>Visual primitives for the component age.</Tagline>
                <SupportingTagline>
                  Use the best bits of ES6 to parse your path without stress 👋
                </SupportingTagline>
              </Title>
              <Links>
                <LivePreview />
              </Links>
              <EditorContainer>
                <Editor />
                <StyledLiveError />
              </EditorContainer>
            </LiveProvider>
          </Content>
          <HomepageFeatures/>
        </Wrapper>
      </Layout>
    );
}

const Content = styled.main<any>`
  width: ${rem(1024)};
  max-width: 100%;
  margin: 0 auto;
  padding: ${rem(90)} ${rem(40)} 0 ${rem(40)};
  box-sizing: border-box;
  font-family: ${bodyFont};
  transition: transform 150ms ease-out;
  padding: ${rem(100)} ${rem(20)} ${rem(30)} ${rem(20)};
  transform: translateX(${p => (p.moveRight ? rem(sidebarWidth) : 0)});
  ${p =>
    p.hero &&
    css`
      font-family: ${headerFont};
      width: 75rem;
    `};
`;

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

const Wrapper = styled.div`
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
`;

const EditorContainer = styled.div`
  display: inline-block;
  box-shadow: ${rem(1)} ${rem(1)} ${rem(20)} rgba(20, 20, 20, 0.27);
  margin: ${rem(35)} 0;
  text-align: left;
  width: 100%;
  max-width: 34rem;
`;

const StyledLiveError = styled(LiveError)`
  display: block;
  width: 100%;
  padding: ${rem(8)};
  background: ${'#ff5555'};
  color: white;
  font-size: 0.8rem;
  font-family: ${headerFont};
  white-space: pre;
`;

const Editor = styled(LiveEditor)`
  background: ${darken(0.05, '#282a36')};
  font-size: 0.8rem;
  font-family: ${monospace};
  font-weight: 300;
  min-height: ${rem(400)};
  overflow-y: auto !important;
  overflow-x: hidden;
  cursor: text;
  white-space: pre-wrap;
  position: relative;
  height: 24rem;
  white-space: pre;
  width: 100%;
`;

const Links = styled.div`
  margin: ${rem(36)} 0;
`;
