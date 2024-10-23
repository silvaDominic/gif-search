import { useState } from "react";
import { GifService } from "../services/gif.service.ts";
import { GifModel } from "../models/gif.model.ts";
import { mapToGifModel } from "../utils/gif.mapper.ts";

type useGifReturnModel = {
  data: GifModel[],
  isLoading: boolean,
  error: any,
  searchGif(searchTerm: string): Promise<void>;
  loadMore(searchTerm: string): Promise<void>;
}

export function useGif() {
  const [data, setData] = useState<Array<GifModel>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [offset, setOffset] = useState<number>(0);

  async function searchGif(searchTerm: string): Promise<void> {
    setIsLoading(true);
    try {
      const data = await GifService.searchGif(searchTerm);
      setData(data.data.map((gifDTO: any) => mapToGifModel(gifDTO)));
      setOffset(data.pagination.count);
    } catch(err: any) {
      setError(`Error search images of ${searchTerm}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadMore(searchTerm: string): Promise<void> {
    try {
      const data = await GifService.searchGif(searchTerm, offset);
      setOffset((prevState: number) => prevState + data.pagination.count);
      setData((prevState: GifModel[]) => [...prevState, ...data.data.map((gifDTO: any) => mapToGifModel(gifDTO))]);
    } catch(err: any) {
      setError("Error loading more images.");
    }
  }

  return {
    data,
    isLoading,
    error,
    searchGif,
    loadMore,
  } as useGifReturnModel;
}
