import { notFound } from "next/navigation";

import TalkDetailsClient from "./TalkDetailsClient";

import { getRandomSpeakerPhoto } from "../../utils/fetchSpeakerPhoto";

async function getTalkById(id) {
  const response = await fetch(`${process.env.API_BASE_URL}/talks/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch talk details.");
  }

  return response.json();
}

export default async function TalkDetailsPage({ params }) {
  const { id } = await params;
  const talk = await getTalkById(id);
  const avatarUrl = await getRandomSpeakerPhoto();

  return <TalkDetailsClient talk={talk} avatarUrl={avatarUrl} />;
}
