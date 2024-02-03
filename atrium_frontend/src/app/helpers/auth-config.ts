import { Configuration, CacheLocation } from 'msal';


export const msalConfig: Configuration = {
    auth: {
      clientId: '5edda4ee-b47b-42c4-af0d-88e57ae594aa', 
      authority: 'https://login.microsoftonline.com/6bb41fe4-40a3-4a10-b6cd-38278e78b21a', 
      redirectUri: 'http://localhost:4200', 
    },
      cache: {
        cacheLocation: 'localStorage' as CacheLocation, // Use the correct type
        storeAuthStateInCookie: false,
      },
  };
  