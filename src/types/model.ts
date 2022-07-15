export type Radnik = {
    radnikId: number,
    brojRadneKnjizice: string,
    jmbg: string,
    imePrezime: string,
    radnoMestoId: number,
    username: string,
    password: string
}

export type User = {
    username: string
}

export type JedinicaMere = {
    jedinicaMereId: number,
    nazivJediniceMere: string
}

export type TipProizvoda = {
    tipProizvodaId: number,
    nazivTipaProizvoda: string
}

export type Proizvod = {
    proizvodID: number,
    nazivProizvoda: string,
    datumProizvodnje: string,
    cena: number,
    vrstaProizvoda: string,
    trenutnoStanjeZaliha: number,
    jedinicaMere: JedinicaMere,
    tipProizvoda: TipProizvoda,
    hemijskeOsobine: Array<any>,
    fizickeOsobine: Array<any>
}