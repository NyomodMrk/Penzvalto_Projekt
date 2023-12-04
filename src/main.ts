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
  const kereses = document.getElementById("kereses");
  for(const t of tartalom.valutak){
    const elem = document.createElement("option");
    elem!.textContent=t.valuta;
    kereses!.appendChild(elem);
  }
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
  document.getElementById("seartch")!.addEventListener("click",Kereses)
}
function Kereses() {
  let seged=0;
  const table= document.getElementById("tablebody");
  const kereses_input = (document.getElementById("kereses_input") as HTMLInputElement)!.value;
  for(const t of table!.children){
    if(kereses_input==t.children[0].textContent){
      (table!.children[seged] as HTMLElement).style.backgroundColor ='red';
      console.log(table!.children[seged]);
      seged++;
    }
  }
}

document.addEventListener("DOMContentLoaded",init);