// hah om sai ram om bhaskaraya namaha om namaha sivayaa 

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}"
    ],
    theme: {
        extend: {
          backgroundImage: {
            'radial': 'radial-gradient(var(--tw-gradient-stops))',
          },
          blur: {
            '3xl': '40px',
          },
          animation: {
            pulse: 'pulse 4s ease-in-out infinite',
          },
        },
      },
      
    plugins: [],
  }
  