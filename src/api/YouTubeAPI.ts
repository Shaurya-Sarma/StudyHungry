import { API_KEY } from "../../env";

const SEARCH_TERMS = [
  "study%20habits",
  "productivity",
  "productivity%20hacks",
  "productive%20routines",
  "study%20routine",
  "motivational%20morning%20routines",
  "motivational%20tips",
  "ted%20talk%20procrastination",
  "ted%20talk%20focus",
  "ted%20talk%20stress",
];

const NUM_OF_ENTRIES = 20;
const SHORTEN_SUBTITLE = 40;

export async function getYouTubeData(): Promise<any> {
  // select a random key search term
  let r = Math.floor(Math.random() * SEARCH_TERMS.length);
  const RANDOM_KEYWORD = SEARCH_TERMS[r];

  // fetch data from YouTube API
  // based on relevance and top NUM_OF_ENTRIES
  let data = await fetch(
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=" +
      NUM_OF_ENTRIES +
      "&order=relevance&q=" +
      RANDOM_KEYWORD +
      "&type=video&key=" +
      API_KEY
  )
    .then((response) => response.json())
    .then((response) => response.items);


  // select random 5 entries
  let selectedData;
  if (data !== undefined && data.length >= NUM_OF_ENTRIES) {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const firstFiveShuffled = shuffled.slice(0, 5);
    selectedData = [...firstFiveShuffled];
  }

  // format API Data into array
  let results: {
    title: string;
    subtitle: string;
    thumbnail: string;
    url: string;
  }[] = [];

  if (selectedData !== undefined) {
    for (let i = 0; i < selectedData.length; i++) {
      let query = { title: "", subtitle: "", thumbnail: "", url: "" };
      query.title = selectedData[i].snippet.title;
      query.subtitle =
        selectedData[i].snippet.channelTitle.length > SHORTEN_SUBTITLE
          ? selectedData[i].snippet.channelTitle.substring(0, SHORTEN_SUBTITLE) + "..."
          : selectedData[i].snippet.channelTitle;
      query.thumbnail = selectedData[i].snippet.thumbnails.high.url;
      query.url =
        "https://www.youtube.com/watch?v=" + selectedData[i].id.videoId;
      results.push(query);
    }
  }

  return results;
}
