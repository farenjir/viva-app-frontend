/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./commponent/**/*.{js,ts,jsx,tsx}",
    "./common/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
   
    extend: {
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      boxShadow:{
        '3xl': '0px 2px 10px 10px rgba(255, 255, 255, 0.2);',
        '3xx':'109.6deg, rgba(59, 40, 204, 0.21) 0.25%, rgba(196, 196, 196, 0.05) 102.79%'
      },
      colors: {
        'amir': '#F0EEFF',
        'green':'rgb(150 45 139 / 31%)'
      },
      backgroundImage: {
        'btnimg': "url('/img/btnlogin.png')",
        'addimg': "url('/img/addbtn.svg')",
        'buybtn': "url('/img/buybtn.svg')",
        'moon': "url('/img/moon.png')",
        'sun': "url('/img/wb_sunny.png')",
        'btn2': "url('/img/btn2.png')",
        'sin': "url('/img/sin.png')",
        'acc': "url('/img/acc.png')",
        'send': "url('/img/send.png')",
        'upload': "url('/img/upload.svg')",
        'mooncol': "url('/img/moon.svg')",
        'wb': "url('/img/wb.svg')",
        'pl1':"url('/img/pl.png')",
        'taj':"url('/img/icon/taj.png')"

      }
    }
  },
  plugins: [],
}
