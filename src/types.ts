export type Track = {
    id: string;
    path: string;
  };
  
  export type Album = {
    id: string;
    name: string;
    images: Image[];
  };
  
  export type Artist = {
    id: string;
    name: string;
    images?: Image[];
  };
  
  export type Image = {
    url: string;
    height?: number;
    width?: number;
  };
  