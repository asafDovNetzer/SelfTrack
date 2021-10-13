declare module "color-scheme";
declare module "@wojtekmaj/react-daterange-picker";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
// declare module "@mui/material/Button";
// declare module "firebase/firestore";
