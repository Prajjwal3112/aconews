import React from 'react';

const NewsCard = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5">
      <img className="w-full h-48 object-cover rounded" src={article.imageUrl} alt={article.title} />
      <h3 className="mt-4 text-xl font-semibold">{article.title}</h3>
      <p className="text-gray-600 mt-2">{article.description}</p>
    </div>
  );
};

export default NewsCard;
