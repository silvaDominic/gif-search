import { GifModel } from "../models/gif.model.ts";

export function mapToGifModel(gifDTO: any) {
  return new GifModel(gifDTO.id, gifDTO?.images?.original?.url, gifDTO.alt_text, gifDTO.title);
}
