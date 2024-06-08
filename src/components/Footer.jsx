import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-gray-900 dark:bg-white py-4 mt-8">
      <div className="flex justify-between items-center container mx-auto text-white dark:text-blue-gray-800">
        <div className='text-start'>{t('Created by')} Rubén Henares Hidalgo</div>
        <a href="https://github.com/daw2-henares22/ArtWorld" target="_blank" rel="noopener noreferrer">
          <FaGithub className='w-6 h-6 text-white dark:text-blue-gray-800' />
        </a>
      </div>
    </footer>
  );
}