import { valutak } from "./valuta.ts";


async function betoltes() {
  let eredmeny = await fetch('valuta.json');
  if (!eredmeny.ok) {
    throw new Error('Hiba történt a letöltés közben');
  }
  return await eredmeny.json() as valutak;
}

async function init(){
  let tartalom = await betoltes();
  const tbody= document.getElementById("tablebody");
  for(const t of tartalom.valutak){
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const celltext1 = document.createTextNode(t.valuta);
    const celltext2 = document.createTextNode(t.arfolyam.toString());
    cell1.appendChild(celltext1);
    cell2.appendChild(celltext2);
    row.appendChild(cell1);
    row.appendChild(cell2);
    tbody?.appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded",init);