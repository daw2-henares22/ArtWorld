import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


// Traducciones
const resources = {
  en: {
    translation: {
      "Home":"Home",
      "Rubén Henares Hidalgo&apos; art page, to make known the art of the world.":"Rubén Henares Hidalgo's art page, to make known the art of the world.",
      "Sculptures": "Sculptures",
      "Paintings": "Paintings",
      "Gioconda":"Gioconda",
      "Starry Night":"Starry Night",
      "Featured Sculpture":"Featured Sculpture",
      "A masterpiece by Vincent van Gogh.":"A masterpiece by Vincent van Gogh.",
      "An iconic painting by Leonardo da Vinci.":"An iconic painting by Leonardo da Vinci.",

    }
  },
  es: {
    translation: {
      "Home":"Inicio",
      "Rubén Henares Hidalgo&apos; art page, to make known the art of the world.":"Página de arte de Rubén Henares Hidalgo, para dar a conocer el arte del mundo.",
      "Sculptures": "Esculturas",
      "Paintings": "Pinturas",
      "Gioconda":"Mona Lisa",
      "Starry Night":"Noche Estrellada",
      "Featured Sculpture":"Escultura destacada",
      "A masterpiece by Vincent van Gogh.":"Una obra maestra de Vincent van Gogh.",
      "An iconic painting by Leonardo da Vinci.":"Una pintura icónica de Leonardo da Vinci.",
    }
  }
};

i18n
  .use(initReactI18next) // Vincula con react-i18next
  .init({
    resources,
    lng: 'es', // Idioma predeterminado
    interpolation: {
      escapeValue: false // React ya hace escaping
    }
  });

  export default i18n;