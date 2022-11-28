import { FC, useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import styled from "styled-components";
import leftArrow from "../assets/left-arrow.svg";
import plus from "../assets/plus.svg";

const Wrapper = styled.div`
  width: 550px;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  padding: 20px;
`;

const MessageInput = styled.textarea`
  margin: 20px 20px;
  padding: 20px 20px 0px;
  width: 470px;
  height: 102px;
  background: #f2f2f2;
  border-radius: 13.3333px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const SendButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 54px;
  gap: 10px;
  width: 120px;
  height: 50px;
  border-width: 0px;
  background: linear-gradient(91.24deg, #1de99b 0.26%, #0063fb 99.58%);
  border-radius: 15px;
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: pointer;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;

const PlusButton1 = styled.div`
  box-sizing: border-box;
  background: linear-gradient(91.24deg, #1de99b 0.26%, #0063fb 99.58%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 0px;
  gap: 10px;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const PlusButton2 = styled.button`
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 0px;
  gap: 10px;
  width: 46px;
  height: 46px;
  cursor: pointer;
  border-radius: 15px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const SpanMessageTo = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #828282;
`;

const SpanName = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #0d0502;
`;

const MessageTo: FC = () => {
  const [name, setName] = useState<string>("Zain Ekstrom");
  const [search, setSearch] = useSearchParams();
  const [myWallet, setMyWallet] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { id } = useParams();
  const naviagte = useNavigate();

  const onBack = () => {
    naviagte("/addresslist");
  };

  const onSend = () => {
    naviagte("/messagelist");
  };

  useEffect(() => {
    setMyWallet(search.get("myaddress"));
  }, [])

  return (
    <Wrapper>
      <HeaderContainer>
        <img
          onClick={() => onBack()}
          src={leftArrow}
          alt=""
          style={{ cursor: "pointer" }}
        />
        <ColDiv>
          <SpanMessageTo>Message to</SpanMessageTo>
          <SpanName>@{name}</SpanName>
        </ColDiv>
      </HeaderContainer>
      <MessageInput onChange={(e) => setMessage(e.target.value)}></MessageInput>
      <FooterContainer>
        <PlusButton1>
          <PlusButton2>
            <img src={plus} alt="" />
          </PlusButton2>
        </PlusButton1>
        <SendButton onClick={() => onSend()}>Send</SendButton>
      </FooterContainer>
    </Wrapper>
  );
};

export default MessageTo;
