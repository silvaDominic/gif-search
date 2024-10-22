import './App.css'
import { useEffect, useState } from "react";
import { GifModel } from "./models/gif.model.ts";
import { GridItem } from "./components/grid/grid-item.component.tsx";
import { useGif } from "./hooks/use-gif.hook.ts";
import { Grid } from "./components/grid/grid.component.tsx";

const DEBOUNCE_LIMIT = 250;

function App() {
  const { data, isLoading, searchGif } = useGif();
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => searchGif(searchTerm), DEBOUNCE_LIMIT);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="app">
      <main>
        <div className="search-container">
          <input placeholder='Search gifs' type="text" onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>

        <Grid>
          {
            isLoading
            ? <div>Loading gifs...</div>
            : data.map((gifModel: GifModel) => (
              <GridItem
                key={gifModel.id}
                imgSrc={gifModel.src}
                imgAltText={gifModel.altText}
                title={gifModel.title}/>
              ))
          }
        </Grid>

        <div className='button-container'>
          <button type='button'>Load more</button>
        </div>
      </main>
    </div>
  )
}

export default App
