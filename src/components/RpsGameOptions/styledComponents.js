
import styled from 'styled-components'

export const OptionImage = styled.img`
  width: 170px;
  height: 170px;

   @media (max-width: 575px) {
    width: 80px;
    height: 80px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 140px;
    height: 140px;
  }
`

export const OptionListItem = styled.li`
  list-style-type: none;
  display: flex;
`

export const GameOptionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 575px) {
    padding: 5px;
    gap: 5px;
  }
`
