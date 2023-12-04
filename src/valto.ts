import { valutak } from "./valuta.ts";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

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
async function Valtas(){
  let tartalom = await betoltes();
  let seged = 0;
  const mirol = (document.getElementById("mirol_input")as HTMLInputElement)!.value;
  const mire  = (document.getElementById("mire_input") as HTMLInputElement)!.value;
  const osszeg = (document.getElementById("osszeg") as HTMLInputElement)!.value;
  const eredmeny = document.getElementById("eredmeny");
  for(const t of tartalom.valutak){
    if(t.valuta==mirol){
      seged = t.arfolyam*parseInt(osszeg);
    }
  }
  for(const t of tartalom.valutak){
    if(t.valuta== mire){
      seged = seged/t.arfolyam;
    }
  }
  eredmeny!.textContent=seged.toString();
}
document.addEventListener("DOMContentLoaded",init);