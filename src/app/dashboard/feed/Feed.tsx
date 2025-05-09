"use client";
import CreatePost from "@/Common/CreatePost";
import PostBox from "@/components/NewsFeed/Style1/ContentCenter/PostBox";
import { FeedProps } from "@/components/NewsFeed/Style1/Style1Types";
import WithUserLayout from "@/layout/WithUserLayout";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { SinglePostType } from "@/Common/CommonInterFace";
import { UserType } from "@/Common/CommonInterFace";

const NewsFeedStyle10: FC<FeedProps> = ({ currP = [], user }) => {
  const [posts, setPosts] = useState<SinglePostType[]>(currP);

  const [rightPost, setRightPost] = useState<SinglePostType[]>([]);
  const [leftPost, setLeftPost] = useState<SinglePostType[]>([]);

  const reloadPost = async () => {
    console.log("reloading post");
    try {
      const resp = await fetch(`/api/posts`);
      if (resp.status === 200) {
        const data = await resp.json();
        setPosts(data);
        console.log("Posts reloaded successfully", data.length);
      } else {
        console.error("Failed to reload posts:", resp.status);
      }
    } catch (error) {
      console.error("Error reloading posts:", error);
    }
  };
  const [friends1, setFriends] = useState<UserType[]>([]);
  const [notfriends1, setNotFriends] = useState<UserType[]>([]);
  const reloadAllFr = async () => {
    var resp = await fetch(`/api/friends`);
    if (resp.status === 200) {
      var data = await resp.json();
      setFriends(data);
    } else {
      setFriends([]);
    }

    var resp2 = await fetch(`/api/notfriends`);
    if (resp2.status === 200) {
      var data2 = await resp2.json();
      setNotFriends(data2);
    } else {
      setNotFriends([]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.documentElement.style.setProperty(
        "--theme-color",
        "3, 137, 201"
      );
    }, 3500);
    reloadAllFr();

    var lp: SinglePostType[] = [];
    var rp: SinglePostType[] = [];
    for (let i = 0; i < posts.length; i++) {
      if (i % 2 === 0) {
        lp = [...lp, posts[i]];
      } else {
        rp = [...rp, posts[i]];
      }
    }

    setLeftPost(lp);
    setRightPost(rp);

    return () => {
      document.documentElement.style.setProperty(
        "--theme-color",
        "3, 137, 201"
      );
    };
  }, [posts]);

  return (
    <>
      <WithUserLayout
        friends={friends1}
        notfriends={notfriends1}
        reloadFriends={reloadAllFr}
        loaderName="style10"
        user={user}
      >
        <div className="page-center">
          <Container fluid className="px-0">
            <div className="page-content">
              <div className="content-center content-full w-100">
                <Row>
                  <Col xl="6">
                    <CreatePost reloadPost={reloadPost} />
                    <div className="overlay-bg" />
                    <div className="post-panel section-t-space">
                      {leftPost.map((post, index) => (
                        <PostBox key={`left-${post.id}-${index}`} post={post} reloadPost={reloadPost} />
                      ))}
                    </div>
                  </Col>
                  <Col xl="6">
                    <div className="post-panel">
                      {rightPost.map((post, index) => (
                        <PostBox key={`right-${post.id}-${index}`} post={post} reloadPost={reloadPost} />
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </div>
      </WithUserLayout>
    </>
  );
};

export default NewsFeedStyle10;