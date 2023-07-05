import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ArticleCardBody from "../ArticleCardBody";

describe("ArticleCardBody", () => {
  const mockArticleContent =
    "Test content that is more than 25 characters long";
  const mockArticleTitle = "Test title";
  const mockPrimaryLanguage = "Python";
  const mockId = 1;

  test("displays full article content, title and language if articlePage is true", async () => {
    render(
      <Router>
        <ArticleCardBody
          id={mockId}
          article_content={mockArticleContent}
          primary_language={mockPrimaryLanguage}
          article_title={mockArticleTitle}
          articlePage={true}
        />
      </Router>
    );

    expect(screen.getByText(mockArticleContent)).toBeInTheDocument();
    expect(screen.getByText(mockArticleTitle)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: mockPrimaryLanguage })
    ).toBeInTheDocument();
  });
});

describe("ButtonPresentOnArticlePage", () => {
  it("should render the appropriate button if articlePage prop is true", async () => {
    render(
      <Router>
        <ArticleCardBody
          id={1}
          article_content="Test content"
          primary_language="Python"
          article_title="Test title"
          articlePage={true}
        />
      </Router>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("ButtonNotPresentOnGrid", () => {
  it("should not render any button if articlePage prop is false", async () => {
    render(
      <Router>
        <ArticleCardBody
          id={1}
          article_content="Test content"
          primary_language="Python"
          article_title="Test title"
          articlePage={false}
        />
      </Router>
    );

    expect(screen.queryByRole("button")).toBeNull();
  });
});
