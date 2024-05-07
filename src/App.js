import { React, useState} from "react";
import PostForm from "./components/PostForm";
import Exporter from "./components/PDFDocument";
import "./styles/App.css";


function App() {

  const [info, setInfo] = useState({name: '', surname: ''})

  const fill_form = (inf) => {
    setInfo({name: inf.name, surname: inf.surname, picture: inf.picture})
  }

  return (
    <div className="App">
      <PostForm create={fill_form}/>
      <Exporter name={info.name} surname={info.surname} picture={info.picture}/>
    </div>
  );
}

export default App;
