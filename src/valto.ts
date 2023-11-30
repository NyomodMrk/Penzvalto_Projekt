import { valutak } from "./valuta.ts";

async function betoltes() {
    let eredmeny = await fetch('valuta.json');
    if (!eredmeny.ok) {
      throw new Error('Hiba történt a letöltés közben');
    }
    return await eredmeny.json() as valutak;
  }

async function init() {
  let tartalom = await betoltes();
  const mirol = document.getElementById("mirol");
  const mire = document.getElementById("mire");
  for(const t of tartalom.valutak){
    const elem = document.createElement("option");
    elem!.textContent=t.valuta;
    mirol!.appendChild(elem);
  }
  for(const t of tartalom.valutak){
    const elem = document.createElement("option");
    const text = document.createTextNode(t.valuta);
    elem.appendChild(text);
    mire!.appendChild(elem);
  }
  document.getElementById("valtas")!.addEventListener("click",Valtas)
}
function Valtas(){

}
document.addEventListener("DOMContentLoaded",init);