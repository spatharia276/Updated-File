import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";
import { useSelector } from "react-redux";
const Container = styled.div`
width: 245px;
margin-bottom: 30px;
margin-left:13px;
cursor: pointer;
display: ${(props) => props.type === "sm" && "flex"};

`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  border-radius:10px;
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  console.log("channel", channel);
  console.log("video.userId", video.userId);
  console.log("video.name", video.title);
  console.log("video.likes", video.likes);
  console.log("video.dislikes", video.dislikes);
  console.log("currentUser", currentUser.name);
  useEffect(() => {
    const fetchChannel = async () => {
     try {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
       } catch (error) {
        console.log("error", error);
       }
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel?.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;