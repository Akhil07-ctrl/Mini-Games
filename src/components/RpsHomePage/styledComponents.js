
import styled from 'styled-components'

export const AppContainer = styled.div`
  background-color: #223a5f;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  min-width: 100vw;
`

export const ResultContainer = styled.div`
  padding: 20px;
  border: 2px solid #ffffff;
  border-radius: 10px;
  width: 65%;
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  align-items: center;

  @media (max-width: 575px) {
    width: 90%;
    padding: 12px;
    margin-top: 30px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 80%;
    padding: 15px;
    margin-top: 40px;
  }
`

export const Option = styled.h1`
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  margin: 5px 0;

  @media (max-width: 575px) {
    font-size: 14px;
  }
  
  @media (min-width: 576px) and (max-width: 767px) {
    font-size: 15px;
  }
`

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 0 25px;
  border-radius: 10px;
  height: 100px;

  @media (max-width: 575px) {
    padding: 0 12px;
    height: 85px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    padding: 0 18px;
    height: 95px;
  }
`

export const ScorePhrase = styled.p`
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 700;
  color: #223a5f;
  margin: 5px 0;

  @media (max-width: 575px) {
    font-size: 14px;
  }
`

export const ScoreNumber = styled.p`
  font-size: 28px;
  font-family: 'Roboto';
  font-weight: 700;
  color: #223a5f;
  margin: 5px 0;

  @media (max-width: 575px) {
    font-size: 24px;
  }
`

export const GameViewContainer = styled.div`
  width: 65%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 575px) {
    width: 95%;
    height: 50vh;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 80%;
    height: 55vh;
  }
`

export const GameOptionsList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  max-width: 480px;

  @media (max-width: 575px) {
    max-width: 100%;
    gap: 10px;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    max-width: 100%;
    gap: 10px;
    flex-wrap: wrap;
    padding-bottom: 10px;
  }
`

export const TriggerButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  font-family: 'Roboto';
  color: #223a5f;
  padding: 10px 20px;
  background-color: #ffffff;
  border: none;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  transition: transform 0.2s;
  min-width: 120px;
  margin: 20px;
  width: fit-content;
  display: inline-block;

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 575px) {
    font-size: 14px;
    padding: 8px 16px;
    min-width: 100px;
  }
`

export const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

export const CloseButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  padding: 10px;
`

export const PopUpImage = styled.img`
  width: 95%;
  max-width: 600px;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: contain;

  @media (max-width: 575px) {
    width: 100%;
  }
`

export const PopUpBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;

  @media (max-width: 575px) {
    padding: 10px;
  }
`

export const GameResultViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px 0;

  @media (max-width: 575px) {
    padding: 10px 0;
  }
`

export const SelectedOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin: 20px 0;

  @media (max-width: 575px) {
    margin: 15px 0;
  }
`

export const GameUserOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const GameParticipantText = styled.p`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  font-family: 'Roboto';
  margin: 10px 0;

  @media (max-width: 575px) {
    font-size: 16px;
    margin: 8px 0;
  }
`

export const GameParticipantChoiceImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;

  @media (max-width: 575px) {
    width: 80px; /* Reduced size for extra small devices */
    height: 80px; /* Reduced size for extra small devices */
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 100px; /* Adjusted size for small devices */
    height: 100px; /* Adjusted size for small devices */
  }
`

export const ResultText = styled.p`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  font-family: 'Roboto';
  text-align: center;
  margin: 20px 0;

  @media (max-width: 575px) {
    font-size: 20px;
    margin: 15px 0;
  }
`

export const PlayAgainButton = styled(TriggerButton)`
  margin-top: 15px;
  min-width: 140px;

  @media (max-width: 575px) {
    min-width: 120px;
  }
`
