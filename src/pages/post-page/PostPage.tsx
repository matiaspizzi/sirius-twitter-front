import React, { useState, useEffect } from "react";
import { StyledContainer } from "../../components/common/Container";
import Tweet from "../../components/tweet/Tweet";
import Loader from "../../components/loader/Loader";
import TweetBox from "../../components/tweet-box/TweetBox";
import { StyledH5 } from "../../components/common/text";
import { StyledFeedContainer } from "../home-page/components/contentContainer/FeedContainer";
import CommentFeed from "../../components/feed/CommentFeed";
import { useHttpRequestService } from "../../service/HttpRequestService";

const PostPage = () => {

  const [postId, setPostId] = useState(window.location.href.split("/")[4]);
  const [post, setPost] = useState(undefined);

  const service = useHttpRequestService();

  const fetchPost = () => {
    service
      .getPostById(postId)
      .then((res) => {
        setPost(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    fetchPost();
  }, [postId])

  return (
    <StyledContainer borderRight={"1px solid #ebeef0"}>
      <StyledContainer
        padding={"16px"}
        borderBottom={"1px solid #ebeef0"}
        maxHeight={"53px"}
      >
        <StyledH5>Tweet</StyledH5>
      </StyledContainer>
      <StyledFeedContainer>
        {post ? (
          <>
            <Tweet post={post} />
            <StyledContainer
              borderBottom={"1px solid #ebeef0"}
              padding={"16px"}
            >
              <TweetBox parentId={postId} />
            </StyledContainer>

            <StyledContainer minHeight={"53.5vh"}>
              <CommentFeed postId={postId} />
            </StyledContainer>
          </>
        ) : (
          <StyledContainer justifyContent={"center"} alignItems={"center"}>
            <Loader />
          </StyledContainer>
        )}
      </StyledFeedContainer>
    </StyledContainer>
  );
}

export default PostPage;

// class PostPage extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       postId: window.location.href.split("/")[4],
//       post: undefined,
//     };

//     this.service = new HttpService().service;
//   }

//   componentDidMount() {
//     this.fetchPost();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.postId !== this.state.postId) {
//       this.fetchPost();
//     }
//   }

//   fetchPost() {
//     this.service
//       .getPostById(this.state.postId)
//       .then((res) => {
//         this.setState({ post: res });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   render() {
//     return (
//       <StyledContainer borderRight={"1px solid #ebeef0"}>
//         <StyledContainer
//           padding={"16px"}
//           borderBottom={"1px solid #ebeef0"}
//           maxHeight={"53px"}
//         >
//           <StyledH5>Tweet</StyledH5>
//         </StyledContainer>
//         <StyledFeedContainer>
//           {this.state.post ? (
//             <>
//               <Tweet post={this.state.post} />
//               <StyledContainer
//                 borderBottom={"1px solid #ebeef0"}
//                 padding={"16px"}
//               >
//                 <TweetBox parentId={this.state.postId} />
//               </StyledContainer>

//               <StyledContainer minHeight={"53.5vh"}>
//                 <CommentFeed postId={this.state.postId} />
//               </StyledContainer>
//             </>
//           ) : (
//             <StyledContainer justifyContent={"center"} alignItems={"center"}>
//               <Loader />
//             </StyledContainer>
//           )}
//         </StyledFeedContainer>
//       </StyledContainer>
//     );
//   }
// }

// export default PostPage;
