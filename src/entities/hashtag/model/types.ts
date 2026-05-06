export type Hashtag = {
  name: string;
  slug: string;
  iconType: string;
};

export type CollectionHashtagItem = {
  name: string;
  slug: string;
  collection: {
    hashtags: Array<Hashtag>;
  };
};

export type CollectionHashtagResponse = {
  data?: {
    list: {
      items: Array<CollectionHashtagItem>;
    };
  };
  errors?: Array<{ message: string }>;
};
