import './App.css'
import { ReactElement, useState } from "react";
import axios from "axios";

class GifModel {
  constructor(public id: string, public src: string, public altText: string, public title: string) {}
}

function mapToGifModel(gifDTO: any) {
  return new GifModel(gifDTO.id, gifDTO?.images?.original?.url, gifDTO.alt_text, gifDTO.title);
}

function useGif() {
  const [data, setData] = useState<Array<GifModel>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  async function searchGif(searchTerm: string) {
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
  }
}

const HttpService = {
  get(url: string, params: any): Promise<any> {
    return axios.get(url, params);
  }
};

const GIF_BASE_ENDPOINT = 'https://api.giphy.com/v1/gifs/search/';
const API_KEY = import.meta.env.VITE_API_KEY;

const GifService = {
  searchGif(searchTerm: string): Promise<any> {
    const params = {
      q: searchTerm,
      api_key: API_KEY,
    }
    return HttpService.get(GIF_BASE_ENDPOINT, { params });
  }
}

function App() {
  const { data, isLoading, searchGif } = useGif();

  return (
    <div className="app">
      <main>
        <div className="search-container">
          <input placeholder='Search gifs' type="text" onChange={(e) => searchGif(e.target.value)}/>
        </div>

        <div id='gif-grid' className="grid">
          {
            isLoading
            ? <div>Loading gifs...</div>
            : data.map((gifModel: GifModel) => <GridItem key={gifModel.id} imgSrc={gifModel.src} imgAltText={gifModel.altText} title={gifModel.title}/>)
          }
        </div>

        <div className='button-container'>
          <button type='button'>Load more</button>
        </div>
      </main>
    </div>
  )
}

type GridItemProps = {
  imgSrc: string,
  imgAltText: string,
  title?: string,
}

function GridItem({imgSrc, imgAltText, title}: GridItemProps): ReactElement {
    return (
      <div className='grid-item'>
        <h4>{title}</h4>
        <img crossOrigin='anonymous' src={imgSrc} alt={imgAltText}/>
      </div>
    );
}

export default App
