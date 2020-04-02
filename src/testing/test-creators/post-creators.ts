import { PostComment, Post } from '../../app/posts/post';

export const createPost = (num: number): Post => ({
  title: `title${num}`,
  body: `body${num}`,
  userId: num,
  id: num,
});

export const createPostComment = (num: number): PostComment => ({
  postId: num,
  id: num,
  name: `comment${num}`,
  email: `email${num}`,
  body: `body${num}`,
});

