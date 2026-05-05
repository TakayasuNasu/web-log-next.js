export type Masta = {
  key: string;
  value: string;
};

export type SiteMastaItem = {
  name: string;
  data: Array<Masta>;
};

export type SiteMastaEntry = {
  name: string;
  domain: string;
  email: string;
  address: string;
  introduction: string;
  country: string;
  nationality: string;
  nickname: string;
  description: string;
  perPage: number;
};

export type SiteMasta = {
  data?: {
    siteMastaCollection: {
      items: Array<SiteMastaItem>;
    };
  };
  errors?: Array<{ message: string }>;
};
