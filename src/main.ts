import { valutak } from "./valuta.ts";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './style.css';
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
 * A betöltés fügvény segitségével lekérdezi az adatok majd azokat egy táblázatba le kreál nekik új sorokat majd abba bele rakja az adott elemek és az belehejezi a táblázatba.
 */
export async function init(){
  let tartalom = await betoltes();
  const tbody= document.getElementById("tablebody");
  const kereses = document.getElementById("kereses");
  for(const t of tartalom.valutak){
    const elem = document.createElement("option");
    elem!.textContent=t.valuta;
    kereses!.appendChild(elem);
  }
  /**
   * Táblázat lekreálása és fektöltése
   */
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
/**
 * A keresés fügvény a táblázatba meg keresi azt a valutát amit a felhasználó a index html be keresni szeretne a táblázaatba majd a megtalálta a táblázatban a hátérszinét pirosra átszinezi
 */
export function Kereses() {
  let seged=0;
  const table= document.getElementById("tablebody");
  const kereses_input = (document.getElementById("kereses_input") as HTMLInputElement)!.value;
  for(const t of table!.children){
    if(kereses_input==t.children[0].textContent){
      (table!.children[seged].children[0] as HTMLElement).classList.add("sajat-tablazat");
      (table!.children[seged].children[1] as HTMLElement).classList.add("sajat-tablazat");
      console.log(table!.children[seged]);
      seged++;
    }
    else{
      (table!.children[seged].children[0] as HTMLElement).classList.remove("sajat-tablazat");
      (table!.children[seged].children[1] as HTMLElement).classList.remove("sajat-tablazat");
      seged++;
    }
  }
}
/**
 * betölti az oldalt és meghivja az init függvényt
 */
document.addEventListener("DOMContentLoaded",init);