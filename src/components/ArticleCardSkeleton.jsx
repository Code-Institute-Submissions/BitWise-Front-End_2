import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const ArticleCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="400px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default ArticleCardSkeleton;
