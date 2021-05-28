import React from 'react'
import darken from 'polished/lib/color/darken'
import styled, {css} from 'styled-components'
import rem from 'polished/lib/helpers/rem'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const bodyFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const monospace = 'dm, monospace';
const headerFont = `"Avenir Next", ${bodyFont}`;
const sidebarWidth = 300;

const Live: any = styled(LiveProvider)<any>`
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
`

Live.Preview = styled(LivePreview)`
  margin: ${rem(36)} 0;
`

Live.Error = styled(LiveError)`
  display: block;
  width: 100%;
  padding: ${rem(8)};
  background: ${'#ff5555'};
  color: white;
  font-size: 0.8rem;
  font-family: ${headerFont};
  white-space: pre;
`

Live.Editor = styled(LiveEditor)<any>`
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
`

Live.Container = styled.div`
  display: inline-block;
  box-shadow: ${rem(1)} ${rem(1)} ${rem(20)} rgba(20, 20, 20, 0.27);
  margin: ${rem(35)} 0;
  text-align: left;
  width: 100%;
  max-width: 34rem;
`

export {Live}
