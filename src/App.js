import { useState, useEffect } from 'react';
import MainPage from './components/MainPage';
import MenuPage from './components/MenuPage';
import CatalogPage from './components/CatalogPage';
import AboutUsPage from './components/AboutUsPage';
import ItemPage from './components/ItemPage';
import BasketPage from './components/BasketPage';
import CooperPage from './components/CooperPage';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = useState('main')

  return (
    <div className='bg-black font-serif h-100% cursor-default'>
      {isMenuOpen !== true ?
        page === 'main' ?
        <MainPage setIsMenuOpen={setIsMenuOpen} setPage={setPage} /> 
        :
          page === 'catalog' ?
          <CatalogPage setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
          :
            page === 'about' ?
            <AboutUsPage setIsMenuOpen={setIsMenuOpen} setPage={setPage} /> 
            :
              page === 'item' ?
              <ItemPage setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
              :
                page === 'basket' ?
                <BasketPage setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
                :
                page === 'cooperating' &&
                <CooperPage setIsMenuOpen={setIsMenuOpen} setPage={setPage} />
      :
      <MenuPage setIsMenuOpen={setIsMenuOpen} setPage={setPage} />

      }
    </div>
  );
}