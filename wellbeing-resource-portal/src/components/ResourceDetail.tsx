import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockResources } from '../data/mockData';

export const ResourceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const resource = mockResources.find(r => r.id === id);

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resource Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Resources
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {resource.category}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">⏱️ {resource.duration} minutes</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{resource.title}</h1>
          <p className="text-gray-600">Published on {formatDate(resource.date_uploaded)}</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
              <img
                src={resource.thumbnail}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Duration</h3>
              <p className="text-gray-600">{resource.duration} minutes</p>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Category</h3>
              <p className="text-gray-600">{resource.category}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-gray-700 leading-relaxed text-lg">{resource.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
