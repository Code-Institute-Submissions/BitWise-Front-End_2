import { render, screen } from "@testing-library/react";
import LoggedIn from "../LoggedIn";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

describe("LoggedIn Avatar", () => {
  it("should render the username and profile picture of the current user when logged in", async () => {
    render(
      <Router>
        <CurrentUserProvider>
          <LoggedIn />
        </CurrentUserProvider>
      </Router>
    );

    const avatar = await screen.findByRole("img", { name: "Joe" });
    const username = await screen.findByText("Joe");

    expect(avatar).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });
});

describe("LoggedInNoAvatar", () => {
  it("should not render the username and profile picture of the current user if not logged in", async () => {
    render(
      <Router>
        <LoggedIn />
      </Router>
    );

    const avatar = screen.queryByRole("img");

    expect(avatar).not.toBeInTheDocument();
  });
});
