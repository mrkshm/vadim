import { createClient } from "contentful";

export const client = createClient({
  // @ts-ignore
  space: process.env.CONTENTFUL_SPACE_ID,
  // @ts-ignore
  accessToken: process.env.CONTENTFUL_DELIVERY_API_TOKEN,
});

export const getEntries = async (entryType: string) => {
  const res = await client.getEntries({ content_type: entryType });
  return res;
};

export const getEntry = async (entryId: string) => {
  const res = await client.getEntry(entryId);
  return res;
};
