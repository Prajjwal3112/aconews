import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './App.css';
import 'tailwindcss/tailwind.css';
import '@fontsource/poppins';
import '@fontsource/comfortaa';
import Typed from 'typed.js';

const availableCategories = ['general', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

function App() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);
  const typedRef = useRef(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint;
      if (searchQuery) {
        endpoint = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=en&max=10&page=${page}&apikey=839cfbd172d0b990284384e0478b720b`;
      } else {
        endpoint = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&page=${page}&apikey=839cfbd172d0b990284384e0478b720b`;
      }
      const response = await axios.get(endpoint);
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ["Stay Informed.", "Discover News Instantly."],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
      });
      return () => {
        typed.destroy();
      };
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearchQuery('');
    setPage(1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const getPaginationRange = () => {
    const totalPages = 10;
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
        pages.push(i);
      } else if (i === page - 3 || i === page + 3) {
        pages.push('...');
      }
    }

    return pages;
  };

  const paginationRange = getPaginationRange();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, options);

    const cards = document.querySelectorAll('.news-card');
    cards.forEach((card) => {
      observer.current.observe(card);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [news]);

  return (
    <div className="App bg-beige min-h-screen text-dark-grey">
      {/* Navbar */}
      <nav className="w-full flex flex-col md:flex-row items-center bg-dark-grey p-6 shadow-lg space-y-4 md:space-y-0">
        <h1 className="text-4xl font-bold font-comfortaa flex-shrink-0 text-beige">aconews</h1>

        <div className="flex flex-col md:flex-row items-center justify-end space-y-4 md:space-y-0 md:space-x-4 w-full">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 bg-white rounded-lg border-dark-grey text-dark-grey w-full"
            />
            <FaSearch className="absolute right-3 top-3 text-dark-grey" />
          </div>

          <select
            value={category}
            onChange={handleCategoryChange}
            className="p-2 bg-white text-dark-grey rounded-lg border-dark-grey w-full md:w-auto"
          >
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>

      {/* Welcome Section */}
      <section className="welcome-section my-8 flex flex-col md:flex-row items-center justify-center">
        <div className="relative text-left md:w-1/2 p-6 bg-dark-grey bg-opacity-75 text-beige rounded-lg z-10">
          <h2 className="text-4xl font-bold mb-4 text-dark-grey">Welcome to <span className="text-dark-grey">aconews</span></h2>
          <p className="typed-text text-xl text-dark-grey">
            <span ref={typedRef}></span>
          </p>
        </div>
        <div className="image-section md:w-1/2 relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1663054265630-baeae23397cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmV3c3BhcGVyJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
            alt="News background"
            className="w-full rounded-lg shadow-lg"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-dark-grey opacity-30 rounded-lg"></div>
        </div>
      </section>

      {/* News Cards */}
      <section className="news-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 mb-8">
        {loading ? (
          <div className="col-span-3 text-center">
            <p className="text-xl">Loading news...</p>
          </div>
        ) : news.length > 0 ? (
          news.map((article, index) => (
            <article key={index} className="news-card bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <img src={article.image} alt={article.title} className="mb-4 rounded-lg" />
              <h2 className="text-xl font-semibold mb-2 text-dark-grey">{article.title}</h2>
              <p className="mb-4 text-dark-grey">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-dark-grey hover:underline">
                Read more
              </a>
            </article>
          ))
        ) : (
          <div className="col-span-3 text-center">
            <p className="text-xl">No articles found.</p>
          </div>
        )}
      </section>

      {/* Pagination */}
      <footer className="my-6 text-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-dark-grey text-beige rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {paginationRange.map((pageNumber, index) =>
          pageNumber === '...' ? (
            <span key={index} className="px-4 py-2">...</span>
          ) : (
            <button
              key={index}
              onClick={() => setPage(pageNumber)}
              className={`px-4 py-2 rounded-lg ${pageNumber === page ? 'bg-dark-grey text-beige' : 'bg-white text-dark-grey'} hover:bg-gray-300`}
            >
              {pageNumber}
            </button>
          )
        )}

        <button onClick={handleNextPage} className="px-4 py-2 bg-dark-grey text-beige rounded-lg">
          Next
        </button>
      </footer>
    </div>
  );
}

export default App;
