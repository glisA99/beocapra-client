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
    username: string,
    roles: Array<string>
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

export type TovarniList = {
    tovarniListId: number,
    napomena: number,
    datumSlanja: Date
}

export type Dobavljac = {
    dobavljacId: number,
    email: string,
    maticniBroj: string,
    nazivDobavljaca: string,
    pib: string,
    ziroRacun: string,
    website: string
}

export type StavkaPrijemnicaDobavljaca = {
    prijemnicaDobavljacaId: number,
    stavkaPrijemniceDobavljacaId: number,
    kolicina: number,
    vrednost: number,
    proizvodId: number
}

export type PrijemnicaDobavljaca = {
    prijemnicaDobavljacaId: number,
    napomena: string,
    datumPrijema: Date,
    tovarniList?: any,
    radnik: Radnik,
    dobavljac: Dobavljac,
    stavke: Array<StavkaPrijemnicaDobavljaca>
}