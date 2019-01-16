// import * as React from 'react'
import styled from 'styled-components'


 const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width:218px;
  min-height: 2em;
  font-size:1em ;
  background: ${(props: {primary?: boolean, theme: { blue: string }}) => props.primary ? props.theme.blue : 'palevioletred'} ;
  border-radius: 3px;
  border: 2px solid ${(props: {primary?: boolean}) => props.primary ? '#0073e6' : 'palevioletred'};
  color: white;
  margin: 0.5em 1em;
  padding: 0.5em 1em;
  cursor: pointer;
`
export default StyledButton
// arrow  size