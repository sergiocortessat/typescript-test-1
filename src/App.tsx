import { useEffect, useState } from "react"

// type AppProps = {name: string, status: string}

// const fetchData = (page:number) => async() => {
//   const data = await fetch(`https://randomuser.me/api/?page=${page}`)
//   const json = await data.json()
//   return json
// }

interface Info {
  name: {first: string, last: string};
  gender: string;
  picture: {thumbnail: string}
  email: string
}
interface Page {
  info: string;
}
 
function App() {
  const [info, setInfo] = useState<Info[] | []>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [counter, setCounter] = useState(1)
  const [clear, setClear] = useState(false)
  const fetchData = async(page:number) => {
    try {
    const data = await fetch(`https://randomuser.me/api/?page=${page}`)
    const json = await data.json()
    return json;
    } catch (error) {
      return "no more pages"
    }
  }

  useEffect(() => {
    fetchData(currentPage).then(data => {
      setInfo(prev => [...prev, ...data.results]);
      setCurrentPage(data.info.page + 1);
    })
    if (clear) (
      setClear(false)
    )
  }, [counter]);

  useEffect(() => {
    if (clear) {
      setInfo([])
    }
  }, [clear])
  // console.log(info);
  return (
    <div className="App">
   {info.map(item => (
      <div key={`${item.name.first}/${item.name.last}`}>
       <p>{item.gender}</p>
       <p>{item.email}</p>
       <p>{item.name.first}</p>
       <p>{item.name.last}</p>
       <img src={item.picture.thumbnail} alt="thumbnail"/>
     </div>
   ))}
   <button type="button" onClick={() => setCounter(counter  + 1)}>Load more</button>
   <button type="button" onClick={() => setClear(!clear)}>clear</button>

    </div>
  );
}

export default App;
