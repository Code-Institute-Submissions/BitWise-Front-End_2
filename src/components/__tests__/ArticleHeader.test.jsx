import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ArticleCardHeader from "../ArticleCardHeader";

describe("ArticleCardHeader", () => {
  it("should render the owner's name and avatar", async () => {
    render(
      <ChakraProvider>
        <Router>
          <ArticleCardHeader
            is_owner={true}
            pk={1}
            owner="Sue"
            created_at="2023-07-04"
            updated_at="2023-07-05"
            profile_id={2}
            profile_image="https://bitwise-drf.s3.amazonaws.com/images/profileImages/002F2DE6-CEF5-4A31-8626-44DA964436D2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5DD4CPHESXFUPVNF%2F20230704%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230704T151936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6a2c125f920d3a593cb42c4bc351f9676718cfab5b5b52cbd532af528cb0ec1d"
            setArticles={() => {}}
          />
        </Router>
      </ChakraProvider>
    );

    expect(
      await screen.findByRole("heading", { name: "Sue" })
    ).toBeInTheDocument();
    expect(await screen.findByRole("img", { name: "Sue" })).toBeInTheDocument();
    expect(await screen.findByText("2023-07-04")).toBeInTheDocument();
    expect(await screen.findByText("(Edited: 2023-07-05)")).toBeInTheDocument();
  });

  it("should trigger delete confirmation when delete button is clicked", async () => {
    render(
      <ChakraProvider>
        <Router>
          <ArticleCardHeader
            is_owner={true}
            pk={1}
            owner="John Doe"
            created_at="2023-07-04"
            updated_at="2023-07-05"
            profile_id={1}
            profile_image="https://example.com/avatar.jpg"
            setArticles={() => {}}
          />
        </Router>
      </ChakraProvider>
    );

    const updateButton = await screen.findByRole("button", {
      name: "Options for Article",
    });
    fireEvent.click(updateButton);

    const deleteOption = await screen.findByText("Delete Article");
    fireEvent.click(deleteOption);

    expect(
      await screen.findByText("Are you sure you want to delete this article?")
    ).toBeInTheDocument();
  });
});

describe("ArticleCardHeaderNoneOwner", () => {
  it("should render the owner's name and avatar", async () => {
    render(
      <ChakraProvider>
        <Router>
          <ArticleCardHeader
            is_owner={false}
            pk={1}
            owner="Sue"
            created_at="2023-07-04"
            updated_at="2023-07-05"
            profile_id={2}
            profile_image="https://bitwise-drf.s3.amazonaws.com/images/profileImages/002F2DE6-CEF5-4A31-8626-44DA964436D2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5DD4CPHESXFUPVNF%2F20230704%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230704T151936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6a2c125f920d3a593cb42c4bc351f9676718cfab5b5b52cbd532af528cb0ec1d"
            setArticles={() => {}}
          />
        </Router>
      </ChakraProvider>
    );

    expect(
      await screen.findByRole("heading", { name: "Sue" })
    ).toBeInTheDocument();
    expect(await screen.findByRole("img", { name: "Sue" })).toBeInTheDocument();
    expect(await screen.findByText("2023-07-04")).toBeInTheDocument();
    expect(await screen.findByText("(Edited: 2023-07-05)")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Options for Article" })
    ).toBeNull();
  });
});
