import { valutak } from "./valuta.ts";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

/**
 * Az adatok betöltését teszi lehetővé fetch segitségével
 */
export async function betoltes() {
    let eredmeny = await fetch('valuta.json');
    if (!eredmeny.ok) {
      throw new Error('Hiba történt a letöltés közben');
    }
    return await eredmeny.json() as valutak;
  }
/**
 * Betölti az adatokat egy változoba majd belehejezi a valutákat a két datalistbe az adatokat
 */
export async function init() {
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

/**
 * A valtas fügvény az a bekért két valuta közőtt úgy váltja átt az összeget
 * hogy az első valutáról az adott összeget átváltja forintra majd azután a másik összegre forintról vissza váltja
 */
export async function Valtas(){
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
  eredmeny!.textContent="Az átváltott összeg: "+(Math.round(seged*100)/100).toString()+" "+mire;
}
/**
 * betölti az oldalt és meghivja az init függvényt
 */
document.addEventListener("DOMContentLoaded",init);