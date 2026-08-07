import { cache } from "react";
import { notFound } from "next/navigation";

import TalkDetailsClient from "./TalkDetailsClient";

import { getRandomSpeakerPhoto } from "../../utils/fetchSpeakerPhoto";

// Wrap fetch/data-loader with React's cache to ensure that the data is cached and not re-fetched on every render.
const getTalkById = cache(async function (id) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/talks/${id}`, {
      cache: "no-store",
    });
    if (res.status === 404) {
      notFound();
    }
    if (!res.ok) {
      throw new Error("Failed to fetch talk details.");
    }
    return await res.json();
  } catch (error) {
    return null;
  }
});

// Generates the metadata dynamically using the talk data
export async function generateMetadata({ params }) {
  const { id } = await params;
  const talk = await getTalkById(id);

  //console.log("Generating metadata for talk:", talk);

  if (!talk) {
    return {
      title: "Talk Not Found",
      description: "The requested talk session could not be found.",
    };
  }

  return {
    title: `${talk.title} | Talk Details`,
    description:
      talk.description ||
      `Explore details about ${talk.title} presented by ${talk.speaker}.`,
  };
}

export default async function TalkDetailsPage({ params }) {
  const { id } = await params;
  const talk = await getTalkById(id);
  const avatarUrl = await getRandomSpeakerPhoto();

  return <TalkDetailsClient talk={talk} avatarUrl={avatarUrl} />;
}
