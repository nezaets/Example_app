export interface Post {
  title: string;
  body: string;
  userId: number;
  id: number;
}

export interface PostWithUser extends Post {
  name: string;
  userId: number;
}

export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
