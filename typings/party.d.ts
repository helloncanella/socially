interface Party {
  _id?: string;
  owner?: string;
  name: string;
  description?: string;
  location: {
    name: string;
    lat?: number;
    lng?: number;
  };
  public: boolean;

  invited?: Array<string>;
  rsvps?: Array<RSVP>;
}

interface RSVP {
  userId: string;
  response: string;
}