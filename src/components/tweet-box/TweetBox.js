import React, { useState } from "react";
import Button from "../button/Button";
import TweetInput from "../tweet-input/TweetInput";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { setLength, updateFeed } from "../../redux/user";
import ImageContainer from "../tweet/tweet-image/ImageContainer";
import { BackArrowIcon } from "../icon/Icon";
import ImageInput from "../common/ImageInput";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../button/StyledButton";
import { StyledTweetBoxContainer } from "./TweetBoxContainer";
import { StyledContainer } from "../common/Container";
import { StyledButtonContainer } from "./ButtonContainer";
import { useDispatch, useSelector } from "react-redux";
import { S3Service } from "../../service/S3Service";

const TweetBox = (props) => {
  const { parentId, close, mobile } = props;
  const [content, setContent] = useState("");
  const [imagesFiles, setImagesFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { user, length, query } = useSelector((state) => state.user);
  const httpService = useHttpRequestService();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = async () => {
    imagesFiles.forEach(async (imageFile) => {
      const response = await httpService.getPresignedUrlPost()
      const { presignedUrl, fileUrl } = response.data;
      S3Service.upload(imageFile, presignedUrl).then(() => {
        console.log("success")
        setImages([...images, fileUrl]);
      }).catch((e) => {
        console.log(e);
      })
    })
    const data = { content, images };
    console.log(data);

    const response = await httpService.createPost(data);

    console.log(response);
    try {
      setContent("");
      setImagesFiles([]);
      setImages([]);
      setImagesPreview([]);
      dispatch(setLength(length + 1));
      const posts = await httpService.getPosts(length + 1, "", query);
      dispatch(updateFeed(posts));
      close && close();
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveImage = (index) => {
    const newImagesFiles = imagesFiles.filter((i, idx) => idx !== index);
    const newImagesPreview = newImagesFiles.map((i) => URL.createObjectURL(i));
    setImagesFiles(newImagesFiles);
    setImagesPreview(newImagesPreview);
  };

  const handleAddImage = (newImagesFiles) => {
    setImagesFiles(newImagesFiles);
    const newImagesPreview = newImagesFiles.map((i) => URL.createObjectURL(i));
    setImagesPreview(newImagesPreview);
  };

  return (
    <StyledTweetBoxContainer>
      {mobile && (
        <StyledContainer
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <BackArrowIcon onClick={close} />
          <Button
            text={"Tweet"}
            buttonType={ButtonType.DEFAULT}
            size={"SMALL"}
            onClick={handleSubmit}
            disabled={content.length === 0}
          />
        </StyledContainer>
      )}
      <StyledContainer style={{ width: "100%" }}>
        <TweetInput
          onChange={handleChange}
          maxLength={240}
          placeholder={t("placeholder.tweet")}
          value={content}
          src={user.profilePicture}
        />
        <StyledContainer padding={"0 0 0 10%"}>
          <ImageContainer
            editable
            images={imagesPreview}
            removeFunction={handleRemoveImage}
          />
        </StyledContainer>
        <StyledButtonContainer>
          <ImageInput setImages={handleAddImage} parentId={parentId} />
          {!mobile && (
            <Button
              text={"Tweet"}
              buttonType={ButtonType.DEFAULT}
              size={"SMALL"}
              onClick={handleSubmit}
              disabled={
                content.length <= 0 ||
                content.length > 240 ||
                imagesFiles.length > 4 ||
                imagesFiles.length < 0
              }
            />
          )}
        </StyledButtonContainer>
      </StyledContainer>
    </StyledTweetBoxContainer>
  );
};

export default TweetBox;
