import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ArticleCardFooter from "../ArticleCardFooter";

describe("ArticleCardFooter", () => {
  it("renders footer with labels", () => {
    render(
      <Router>
        <ArticleCardFooter
          is_owner={true}
          id={1}
          like_id={1}
          likes_count={10}
          comments_count={5}
          setArticles={() => {}}
          current_user_comments_count={2}
          is_following={false}
          profile_id={1}
          article_title={"Test title"}
        />
      </Router>
    );

    expect(screen.getByLabelText("Likes")).toBeInTheDocument();
    expect(screen.getByLabelText("View comments")).toBeInTheDocument();
    expect(screen.getByLabelText("View owner profile")).toBeInTheDocument();
  });

  it("renders footer key content", () => {
    const mockProps = {
      is_owner: false,
      id: 1,
      like_id: null,
      likes_count: 5,
      comments_count: 2,
      setArticles: () => {},
      currentUser: null,
      current_user_comments_count: 0,
      is_following: false,
      profile_id: 1,
      article_title: "Test Title",
    };

    it("renders the likes count correctly", () => {
      render(
        <Router>
          <ArticleCardFooter {...mockProps} />
        </Router>
      );

      expect(screen.getByText("Likes")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("renders the comments count correctly", () => {
      render(
        <Router>
          <ArticleCardFooter {...mockProps} />
        </Router>
      );

      expect(screen.getByText("Comments")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("renders the Profile text of not owner", () => {
      render(
        <Router>
          <ArticleCardFooter {...mockProps} />
        </Router>
      );

      expect(screen.getByText("Profile")).toBeInTheDocument();
    });
  });
});
