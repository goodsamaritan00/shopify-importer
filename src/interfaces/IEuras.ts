export interface IEurasProduct {
  artikelnummer: string;
  originalnummer: string;
  artikelbezeichnung: string;
  artikelhersteller: string;
  vgruppenname: string;
  ekpreis: string;
  bestellbar: string;
  ersatzartikel: string;
  lieferzeit: string;
  lieferzeit_in_tagen: number | string;
  picurlbig: string | undefined;
  herstelleradresse: {
    hersteller: {
      name: string;
      land: string;
      email: string;
      internet: string;
    };
    importeur: {
      name: string;
      land: string;
      email: string;
      internet: string;
    };
  };
}

export interface IInfoProps {
  product: IEurasProduct;
}
