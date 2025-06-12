module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'canvas-repeat': "url('13972.png')"
      },
      backgroundRepeat: {
        'repeat': 'repeat',
      },
    },
  },
  plugins: [],
}