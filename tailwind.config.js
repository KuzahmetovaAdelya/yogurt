/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../public/banner.png')",
        'fon-one-concept': "url('../public/fon1-3.png')",
      },
      backgroundSize: {
        '100%': '100% 100%',
      },
      colors: {
        'black': '#161819',
        'gray': "#818181",
        'red': '#C82929',
      },
      width: {
        'phone': '350px',
        'tablet': '980px',
        'notepad': '1412px',
        'desktop': '1720px',
      },
      fontFamily: {
        serif: ["Inter", "sans-serif"],
      },
      fontSize: {
        'p': '15px',
        'button': '17px',
        'big-para': '28px',
        'number': '32px',
        'p-lg': '34px',
        '4xl': '38px',
        'big-para-2xl': '44px',
        'number-lg': '54px',
        'h1': '76px',
        'h1-lg': '212px',
        'h1-xl': '280px',
        'h1-2xl': '345px',
      },
      spacing: {
        '19': '19px',
        '15': '15px',
        '21': '21px',
        '25': '25px',
        '43': '43px',
        '75': '75px',
        '85': '85px',
        '90': '90px',
        '120': '120px',
        '140': '140px',
        '220': '220px',
        '270': '270px',
        '300': '300px',
        '325': '330px',
        "350": "350px",
        '395': '395px',
        '400': '400px',
        '440': '440px',
        '450': '450px',
        '500': '500px',
        '550': '550px',
        '575': '575px',
        '650': '650px',
        '737': '737px',
        '1100': '1100px',
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
        '1/2': '50%',
        '55%': '55%',
        '70%': '70%',
      },
      borderRadius: {
        'basket': '10px',
        'input': '40px',
        'button': '50px',
      },
      borderWidth: {
        '3': '3px',
      },
      rotate: {
        '225': '225deg',
      },
    },
    screens: {
      'sm': '390px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1512px',
      '2xl': '1920px',
    }
  },
  plugins: [],
}

