import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation(); // Obtener la función de traducción t()
  
    return (
      <footer className="bg-blue-gray-900 dark:bg-white py-4 mt-8">
        <div className="flex container mx-auto text-white dark:text-blue-gray-800">
          <div className='pe-4 text-start'>{t('Created by')} Rubén Henares Hidalgo</div>
          <button
            href="https://github.com/daw2-henares22/ArtWorld"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-end text-white dark:text-blue-gray-800 dark:hover:text-blue-gray-400 hover:text-blue-gray-400 hover:scale-x-105 hover:scale-y-105 transition duration-150 shadow-lg hover:shadow-xl hover:shadow-white/50 shadow-white/50 dark:hover:shadow-blue-gray-800/50 dark:shadow-blue-gray-800/50">
            GitHub
          </button>
        </div>
      </footer>
    );
  }