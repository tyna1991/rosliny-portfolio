export class Formdata {
    id:number;
    gatunek:string;
    odmiana:string;
    nazwaLacinska:string;
    wysokosc:string;
    pokroj:string;
    kwitnienieOd:string;
    kwitnienieDo:string;
    kolorKwiatow:string;
    zdjecie:string;
    naslonecznienie:any[];
    gleba:any[];
    wilgotnosc:any[];
    phOd:string;
    phDo:string;
    zasilanie:string;
    przycinanie:string;
    inneP:string;
    grupa:string;
    inneD:string;
    clear() {
        this.id=undefined;
     this.gatunek=undefined;
    this.odmiana=undefined;
    this.nazwaLacinska=undefined;
    this.wysokosc=undefined;
    this.pokroj=undefined;
    this.kwitnienieOd=undefined;
    this.kwitnienieDo=undefined;
    this.kolorKwiatow=undefined;
    this.zdjecie=undefined;
    this.naslonecznienie=undefined;
    this.gleba=undefined;
    this.wilgotnosc=undefined;
    this.phOd=undefined;
    this.phDo=undefined;
    this.zasilanie=undefined;
    this.przycinanie=undefined;
    this.inneP=undefined;
    this.grupa=undefined;
    this.inneD=undefined;
    }
}
export class OpisOgolny {
    gatunek:string;
    odmiana:string;
    nazwaLacinska:string;
    wysokosc:string;
    pokroj:string;
    kwitnienieOd:string;
    kwitnienieDo:string;
    kolorKwiatow:string;
    zdjecie:string;
    id?:number;
}
export class Wymagania {
    naslonecznienie:any[];
    gleba:any[];
    wilgotnosc:any[];
    phOd:string;
    phDo:string;
}
export class Pielegnacja {
    zasilanie:string;
    przycinanie:string;
    inne:string;
}
export class DodatkoweInformacje {
    grupa:string;
    inne:string;
}
export class Grupy{
    nazwa:string[];
}