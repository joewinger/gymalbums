/**
 * Extracts the album ID from a Spotify album URL.
 *
 * @param {string} spotifyAlbumURL - The URL of a Spotify album.
 *
 * @returns {string|null} The extracted album ID, or `null` if the URL is not in the expected format.
 *
 * @example
 * // Returns "4aawyAB9vmqN3uQ7FjRGTy"
 * getAlbumIdFromUrl("https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy?si=6iW-kCXGSMmS9GJ5wPZ9fQ")
 *
 * @example
 * // Returns null
 * getAlbumIdFromUrl("https://open.spotify.com/track/1nZzRJbFvCEct3uzu04ZoL")
 */
export default function (spotifyAlbumURL: string): string | null {
  const match = spotifyAlbumURL.match(/album\/([^?]+)/);
  return match ? match[1] : null;
}