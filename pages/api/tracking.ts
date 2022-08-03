// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

const query = `query {
  playlistCollection{items {
    title
    slug
    spectacle
    mp3 {
      url
    }
    image {
      description
      url
    } 
  }}
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tempTracks: any = [];

  const resu = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authenticate the request
        Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_API_TOKEN}`,
      },
      // send the GraphQL query
      body: JSON.stringify({ query }),
    }
  );
  if (!(res.statusCode === 200)) {
    res.status(500).json({ message: "Not ok" });
  }

  const result = await resu.json();

  const items = result.data.playlistCollection.items;
  items.forEach((item: any) => {
    const tempTrack = {
      id: item.slug,
      title: item.title,
      imageUrl: item.image.url,
      spectacle: item.spectacle,
      url: item.mp3.url,
    };
    tempTracks.push(tempTrack);
  });
  res.status(200).json(tempTracks);
}
