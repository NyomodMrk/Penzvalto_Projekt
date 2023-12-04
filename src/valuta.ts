/**
 * Valuta interface létrehozása
 */
export interface valuta{
    /**
     * szám alapú id 
     */
    id: number;
    /**
     * valuta 3 tagú kódjának megadása
     */
    valuta: string;
    /**
     * arfolyam megadása forintba
     */
    arfolyam: number;
}
/**
 * valuták interface létrehozása
 */
export interface valutak{
    /**
     * interfacebe valuták tőmbbe való behelyezése
     */
    valutak: valuta[];
}