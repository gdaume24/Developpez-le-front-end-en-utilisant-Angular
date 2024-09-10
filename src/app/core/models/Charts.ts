export interface formattedPieDatas {
  name: string;
  value: number;
  extra: {
    id: string;
  };
}

export interface formattedLineDatas {
  name: string;
  series: { 
    name: number; 
    value: number 
  }[];
}
