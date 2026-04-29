export type Hashtag = {
  name: string;
  slug: string;
  iconType: string;
};

export type Post = {
  sys: {
    publishedAt: string;
  };
  name: string;
  slug: string;
  excerpt: string;
  featured: boolean;
  publishedDate: string;
  bodyCopy: string;
  heroImage?: {
    title: string;
    description: string;
    url: string;
    width: string;
    height: string;
  };
  collection: {
    hashtags: Array<Hashtag>;
  };
  reply?: Post;
};
