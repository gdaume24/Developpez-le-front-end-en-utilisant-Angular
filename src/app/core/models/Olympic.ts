export interface countryData {
  id: number;
  country: string;
  participations: participation[];
}

export interface participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}


