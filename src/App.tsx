import './App.css'
import { useEffect, useState } from "react";
import { GifModel } from "./models/gif.model.ts";
import { GridItem } from "./components/grid/grid-item.component.tsx";
import { useGif } from "./hooks/use-gif.hook.ts";
import { Grid } from "./components/grid/grid.component.tsx";

const DEBOUNCE_LIMIT = 750;

function App() {
  const {data, isLoading, searchGif, loadMore} = useGif();
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    let timeout = 0;
    if (searchTerm) {
      timeout = setTimeout(() => searchGif(searchTerm), DEBOUNCE_LIMIT);
    }

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  function onLoadMore(): void {
    loadMore(searchTerm);
  }

  return (
    <div className="app">
      <main>
        <h1>Gif Search</h1>

        <div id="search-container">
          <input placeholder='Search gifs' type="text" onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>


        {
          isLoading
            ? <div className='loader'><span></span></div>
            : <Grid>
              {data.map((gifModel: GifModel) => (
                <GridItem
                  key={gifModel.id}
                  imgSrc={gifModel.src}
                  imgAltText={gifModel.altText}
                  title={gifModel.title}
                />
              ))}
            </Grid>
        }

        <div className='button-container'>
          <button type='button' onClick={onLoadMore}>Load more</button>
        </div>
      </main>
    </div>
  )
}

export default App
