import { rest } from "msw";

const baseURL = "https://bitwise-code-blog.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 1,
        username: "Joe",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 1,
        profile_image:
          "https://bitwise-drf.s3.amazonaws.com/images/profileImages/002F2DE6-CEF5-4A31-8626-44DA964436D2.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5DD4CPHESXFUPVNF%2F20230704%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230704T151936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6a2c125f920d3a593cb42c4bc351f9676718cfab5b5b52cbd532af528cb0ec1d",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
