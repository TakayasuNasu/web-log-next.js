import type { Post } from "@/src/entities/post/model/types";

export type PostsResponse = {
  data: {
    postCollection: {
      items: Array<Post>;
    };
  };
  errors?: Array<{ message: string }>;
};
