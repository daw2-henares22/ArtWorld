import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


// Traducciones
const resources = {
  en: {
    translation: {
      "Sculptures": "Sculptures",
      "Paintings": "Paintings"
    }
  },
  es: {
    translation: {
      "Sculptures": "Esculturas",
      "Paintings": "Pinturas"
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