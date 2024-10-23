import { HttpService } from "./http.service.ts";

const GIF_BASE_ENDPOINT = 'https://api.giphy.com/v1/gifs/search/';
const API_KEY = import.meta.env.VITE_API_KEY;

export const GifService = {
  async searchGif(searchTerm: string, offset?: number, limit: number = 20): Promise<Response> {
    const params = {
      q: searchTerm,
      api_key: API_KEY,
      limit: limit,
      offset: offset,
    }
    const res = await HttpService.get(GIF_BASE_ENDPOINT, { params });
    return res.data;
  }
}
