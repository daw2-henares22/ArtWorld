import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-gray-900 dark:bg-white text-white dark:text-blue-gray-800 fixed bottom-0 left-0 right-0 py-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className='font-bold text-start'>{t('Created by')} Rubén Henares Hidalgo</div>
        <a href="https://github.com/daw2-henares22/ArtWorld" target="_blank" rel="noopener noreferrer">
          <FaGithub className='w-6 h-6 text-white dark:text-blue-gray-800' />
        </a>
      </div>
    </footer>
  );
}