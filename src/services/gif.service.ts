import { HttpService } from "./http.service.ts";

const GIF_BASE_ENDPOINT = 'https://api.giphy.com/v1/gifs/search/';
const API_KEY = import.meta.env.VITE_API_KEY;

export const GifService = {
  searchGif(searchTerm: string): Promise<any> {
    const params = {
      q: searchTerm,
      api_key: API_KEY,
      limit: 20,
    }
    return HttpService.get(GIF_BASE_ENDPOINT, { params });
  }
}
