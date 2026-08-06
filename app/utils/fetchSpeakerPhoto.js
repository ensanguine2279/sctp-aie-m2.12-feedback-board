/**
 * Fetches a random portrait photo URL from randomuser.me.
 *
 * @param {'large' | 'medium' | 'thumbnail'} size - The photo size desired.
 * @returns {Promise<string>} A promise that resolves to the photo image URL.
 */
export async function getRandomSpeakerPhoto(size = "large") {
  try {
    const response = await fetch("https://randomuser.me/api/", {
      // Optional: Prevent caching if you want a fresh photo on every server request
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch photo: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results[0].picture[size];
  } catch (error) {
    console.error("Error fetching random photo:", error);
    // Fallback image URL in case of network or API failure
    return "/images/default-avatar.png";
  }
}
