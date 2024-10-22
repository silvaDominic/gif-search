import { useState } from "react";
import { GifService } from "../services/gif.service.ts";
import { GifModel } from "../models/gif.model.ts";
import { mapToGifModel } from "../utils/gif.mapper.ts";

type useGifReturnModel = {
  data: GifModel[],
  isLoading: boolean,
  error: any,
  searchGif(searchTerm: string): Promise<void>;
}

export function useGif() {
  const [data, setData] = useState<Array<GifModel>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function searchGif(searchTerm: string): Promise<void> {
    setIsLoading(true);
    try {
      const res = await GifService.searchGif(searchTerm);
      setData(res.data.data.map((gifDTO: any) => mapToGifModel(gifDTO)));
    } catch(err: any) {
      setError(err);
    }
    setIsLoading(false);
  }

  return {
    data,
    isLoading,
    error,
    searchGif
  } as useGifReturnModel;
}
