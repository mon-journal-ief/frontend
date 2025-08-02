// Made a commonJS file as it was the only way to bridge
// for both tailwind.config.js and primevueStyle.ts

const primary = {
  50: '#FEE5D8',
  100: '#FDCAB2',
  200: '#FCB08B',
  300: '#FCA975',
  400: '#FA7B3E',
  500: '#F85717',
  600: '#E93C0D',
  700: '#C12A0D',
  800: '#992313',
  900: '#7B2013',
  950: '#430C07',
}

const slate = {
  50: '#FFFFFF',
  100: '#F1F2F9',
  200: '#ECEDF9',
  300: '#D2D5E2',
  400: '#A5A4B4',
  500: '#747286',
  600: '#555668',
  700: '#414159',
  800: '#333248',
  900: '#19212E',
  950: '#06111D',
}

const fuchsia = {
  50: '#FEE8FF',
  100: '#FEE8FF',
  200: '#FED0FE',
  300: '#FDAAFA',
  400: '#FA78F3',
  500: '#F144E8',
  600: '#D524C8',
  700: '#B41BA5',
  800: '#901883',
  900: '#76196A',
  950: '#4F0345',
}

const red = {
  50: '#FEF2F2',
  100: '#FEE5E5',
  200: '#FBD0D2',
  300: '#F8A9AE',
  400: '#F47882',
  500: '#EA495A',
  600: '#D72743',
  700: '#B41B37',
  800: '#981934',
  900: '#821933',
  950: '#480917',
}

const orange = {
  50: '#FDF3ED',
  100: '#FCEEE3',
  200: '#FADEC7',
  300: '#F6C398',
  400: '#F2A768',
  500: '#EE8B39',
  600: '#E37113',
  700: '#BC5E10',
  800: '#8D470C',
  900: '#5E2F08',
  950: '#4B2606',
}

const yellow = {
  50: '#FEFCE8',
  100: '#FFFAC2',
  200: '#F3E994',
  300: '#ECD556',
  400: '#E7C028',
  500: '#D7A81B',
  600: '#C78600',
  700: '#A46204',
  800: '#874D0C',
  900: '#733F10',
  950: '#432005',
}

const green = {
  50: '#F1FCF3',
  100: '#DEFAE7',
  200: '#BEF4CE',
  300: '#8CE9A9',
  400: '#52D67B',
  500: '#2BBC58',
  600: '#1E9B45',
  700: '#1E8840',
  800: '#1A6131',
  900: '#17502B',
  950: '#072C14',
}

const blue = {
  50: '#EFF6FF',
  100: '#DBEAFE',
  200: '#BEDBFF',
  300: '#8FC6FF',
  400: '#479DFF',
  500: '#1F77FF',
  600: '#0954FB',
  700: '#1344DD',
  800: '#1839AF',
  900: '#1A3584',
  950: '#111C41',
}

const gray = {
  50: '#F7F7FB',
  100: '#F1F2F6',
  200: '#E5E6EF',
  300: '#D0D1E2',
  400: '#B4B6D1',
  500: '#9494BC',
  600: '#7F7DAA',
  700: '#6D6A97',
  800: '#5B587F',
  900: '#4D4A68',
  950: '#111118',
}

export const palette = {
  // semantics
  primary,
  surface: slate,

  // primitives
  slate,
  fuchsia,
  red,
  orange,
  yellow,
  green,
  blue,
  gray,
}
