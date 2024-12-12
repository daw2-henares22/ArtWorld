<h1>Como hice el proyecto?</h1>
------------------------------------------------------------------
<h2>Mas información detallada y del código, en la <a href="https://daw2-henares22.github.io/ArtWorld/MemoryArtWorldSpanish.pdf" target="_blank">Memoria</a>.</h2>

<h2>Explicación breve de instalaciones</h2>

npm create vite .
    React
    Javascript
    npm install
    npm run dev

<h3>Instalar Tailwindcss con Vite</h3>
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p

    tailwind.config.js añadir esto:
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    Quedaría así:
    /** @type {import('tailwindcss').Config} */
    export default {
        content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
    }


<h3>Añadir mas css:</h3>
    npm i @material-tailwind/react

    tailwind.config.js añadir esto:
        import withMT from "@material-tailwind/react/utils/withMT.js";
        export default withMT({

    Quedaría así:
    /** @type {import('tailwindcss').Config} */
    const withMT = require('@material-tailwind/react/utils/withMT') 
    module.exports = withMT( {
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
    })

<h3>Añadir react-router-dom:</h3>
    npm i react-router-dom

        (Se instala para que las páginas estén entrelazadas con la etiqueta
        Route mediante etiquetas Routes)

        <Routes>
        <Route path='/' element={<Home />} />
        <Routes/>

        (Y para navegar entre ellas, debe de usarse la etiqueta Link)

        <Link to="/">ArtWorld</Link>

        (Pero para que el router funcione, se debe de poner una etiqueta
        BrowserRouter en main.jsx).

        <BrowserRouter>
        <BrowserRouter/>

        Quedaría así:

            import React from 'react'
            import ReactDOM from 'react-dom/client'
            import App from './App'
            import './index.css'
            import { BrowserRouter } from 'react-router-dom'
            import './i18n'
            import { GlobalProvider } from './context/globalContext'


            ReactDOM.createRoot(document.getElementById('root')).render(
              <React.StrictMode>
                <GlobalProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </GlobalProvider>
              </React.StrictMode>,
            )

            (El GlobalProvider es una constante de GlobalContext.jsx que indica cuando se inicia y se quita la sesión, y de si es admin o usuario)

<h3>Añadí dark mode al proyecto</h3>
    tailwind.js añadir esto:
        darkMode=['class']
    
    Quedaría así:
        /** @type {import('tailwindcss').Config} */
        import withMT from "@material-tailwind/react/utils/withMT.js";
        export default withMT({
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
        ],
        darkMode: ['class'],
        theme: {
            extend: {},
        },
        plugins: [],
        })

    Luego metí una fución en el Header.jsx
        function changeDarkMode(){
            document.documentElement.classList.toggle('dark')
        }

    Y puse un onclick a un botton para utilizar el darkMode
        <button onClick={changeDarkMode} className="h-7 w-7 bg-white dark:bg-blue-gray-800 rounded-md shadow-lg" aria-hidden="true">
            <ImContrast className='w-full dark:text-white text-blue-gray-800'/>
        </button>

<h3>Añadir traducción al proyecto</h3>
    Es una libreria
    npm install i18next
    npm i react-i18next que permite la integración con el proyecto de react
    
    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';

    Crear un i18next.jsx en la carpeta src
    

    https://historia-arte.com/
    ---------------------
    tailwindcss animated:
    Sirve para poner mas aniamciones y sus configuraciones

    https://www.tailwindcss-animated.com/
    https://github.com/new-data-services/tailwindcss-animated#readme

<h3>Añadir animaciones</h3>
    npm i tailwindcss-animated

    // tailwind.config.js
    module.exports = {
      // ...
      plugins: [
        require('tailwindcss-animated')
      ],
    }

    en este caso solo copias el require('tailwindcss-animated') y el tailwind.config.js te quedaría así:

    /** @type {import('tailwindcss').Config} */
      import withMT from "@material-tailwind/react/utils/withMT.js";
      export default withMT({
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      darkMode: ['class'],
      theme: {
        extend: {},
      },
      plugins: [
        require('tailwindcss-animated')
      ],
    })