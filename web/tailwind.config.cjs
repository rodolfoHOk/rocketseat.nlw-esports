/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'nlw-gradient':
          'linear-gradient(89.86deg, #9572FC 3%, #43E7AD 66%, #E1D55D 97%)',
        'game-gradient':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
        'ad-gradient':
          'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0) 100%)',
      },
      colors: {},
      keyframes: {
        toastInRight: {
          '0%': { transform: 'translateX(100%)' },
          '80%': { transform: 'translateX(-40px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        toastInRight: 'toastInRight 0.5s ease-in-out',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
};
