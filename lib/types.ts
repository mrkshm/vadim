export interface Props {
  children: JSX.Element;
}

export interface Concert {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    video?: string;
    description: any;
    distribution: string;
    order: number;
    mp3s: [
      {
        fields: {
          title: string;
          file: {
            url: "string";
          };
        };
      }
    ];
    images: [
      {
        sys: {
          id: string;
        };
        fields: {
          description: string;
          file: {
            url: "string";
            details: {
              image: {
                width: number;
                height: number;
              };
            };
          };
        };
      }
    ];
  };
}

export interface Film {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    video?: string;
    description: any;
    distribution: string;
    order: number;
    mp3s: [
      {
        fields: {
          title: string;
          file: {
            url: "string";
          };
        };
      }
    ];
    image: {
      fields: {
        description: string;
        file: {
          url: "string";
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
      };
    };
  };
}

export interface Track {
  id: string;
  title: string;
  spectacle: string;
  url: string;
  imageUrl: string;
}
