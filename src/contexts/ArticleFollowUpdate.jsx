import { createContext, useContext, useState } from "react";

export const ArticleFollowContext = createContext();
export const SetArticleFollowContext = createContext();
export const useArticleFollow = () => useContext(ArticleFollowContext);
export const useSetArticleFollow = () => useContext(SetArticleFollowContext);

export const ArticleFollowProvider = ({ children }) => {
  const [articleFollow, setArticleFollow] = useState(false);

  return (
    <ArticleFollowContext.Provider value={articleFollow}>
      <SetArticleFollowContext.Provider value={setArticleFollow}>
        {children}
      </SetArticleFollowContext.Provider>
    </ArticleFollowContext.Provider>
  );
};
