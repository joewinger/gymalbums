interface SpotifyAlbumData {
  album_name: string,
  album_cover_url: string,
  album_release_date: Date,
  num_tracks: number
  artists: string[],
  spotify_url: string,
}

export default defineEventHandler(async (event) => {
  try {
    const { album_id } = getQuery(event) as { album_id: string };
    if (!album_id) throw "No album_id query param provided"
  
    const access_token: string = await getAccessToken();
  
    return await getAlbumData(album_id, access_token);
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error
    });
  }
});

async function getAccessToken(): Promise<string> {
  let access_token: string;

  // If we already have this in memory, just us it.
  access_token = await useStorage().getItem('spotify:access_token') as string;
  
  // Otherwise, get a new one.
  if (!access_token) {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

    // Docs: https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(client_id + ':' + client_secret).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' })
    })

    if (!response.ok) throw "Can't get access token, response not OK"
    else access_token = await response.json().then(data => data.access_token);

    await useStorage().setItem('spotify:access_token', access_token);
  }

  return access_token;
}

async function getAlbumData(album_id: string, access_token: string): Promise<SpotifyAlbumData> {
  const response = await fetch(`https://api.spotify.com/v1/albums/${album_id}`, {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });

  const data = await response.json();

  return {
    album_name: data.name,
    album_cover_url: data.images[0].url,
    album_release_date: new Date(data.release_date),
    num_tracks: data.total_tracks,
    artists: data.artists.map((artist: any) => artist.name),
    spotify_url: data.external_urls.spotify
  };
}