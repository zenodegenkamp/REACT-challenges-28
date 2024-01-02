import React from "react"
import sonnetsData from "./data/sonnetsData"
import Header from "./components/Header"
import { nanoid } from "nanoid"

export default function App() {
    
  const inputRef = React.useRef()
  const [searchInput, setSearchInput] = React.useState("")
  const [sonnetElements, setSonnetElements] = React.useState([]);

  function handleClick() {
    setSearchInput(inputRef.current.value.trim())
  }

  React.useEffect(() => {
  let gevondenResultaten = []; // Tijdelijke array om resultaten op te slaan

  sonnetsData.forEach((sonnet) => { // Gebruik sonnet.number als unieke sleutel
    sonnet.lines.forEach(line => {
      if (line.includes(searchInput)) {
        // Zoek naar een bestaand object met dezelfde key
        const bestaandObject = gevondenResultaten.find(resultaat => resultaat.key === sonnet.number);
        
        if (bestaandObject) {
          // Als het object bestaat, voeg dan de nieuwe regel toe aan de 'sonnet' array
          bestaandObject.sonnet.push(line); // Voeg de regel toe aan de array
        } else {
          // Als het object niet bestaat, maak dan een nieuw object aan met 'sonnet' als een array
          gevondenResultaten.push({ key: sonnet.number, sonnet: [line] });
        }
      }
    });
  });

  setSonnetElements(gevondenResultaten); // Update de state met alle gevonden resultaten
}, [searchInput]); // Afhankelijkheid voor useEffect

return (
  <div className="wrapper">
    <Header searchProps={{inputRef, handleClick}}/>

    <div className="sonnets-container">
      {sonnetElements.map(element => (
        <div key={element.key}> {/* Zorg voor een unieke 'key' voor elk element */}
          <h3>{element.key}</h3> {/* Gebruik accolades om JS-uitdrukkingen in JSX in te sluiten */}
          {element.sonnet.map((sentence, index) => ( // Zorg dat je accolades en haakjes correct gebruikt
            <p key={index}>{sentence}</p> // Gebruik accolades en geef elke 'p' een unieke 'key'
          ))}
        </div>
      ))}
    </div>

  </div>
);
}

