/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Certifique-se de incluir seus arquivos aqui
    ],
    extend: {
      colors: {
        primary: '#12577B',
        secondary: '#A9CFE5',
        tertiary: '#12477B',
        customGray: '#474747',
        background: '#1D1D1D',
      },
    },
  },
  plugins: [],
}

