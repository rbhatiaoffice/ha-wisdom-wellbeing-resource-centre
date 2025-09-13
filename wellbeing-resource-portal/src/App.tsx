import React, { useState } from 'react';
import { CategorySection } from './components';
import { mockResources } from './data/mockData';
import { groupResourcesByCategory } from './utils/resourceUtils';
import { Resource } from './types/resource';

function App() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const groupedResources = groupResourcesByCategory(mockResources);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Wellbeing Resource Portal
          </h1>
          <p className="text-lg text-gray-600">
            Discover wellness resources to support your physical and mental wellbeing
          </p>
        </header>

        <main>
          {groupedResources.map((group) => (
            <CategorySection
              key={group.category}
              category={group.category}
              resources={group.resources}
              onResourceClick={handleResourceClick}
            />
          ))}
        </main>

        {selectedResource && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedResource.title}
                  </h2>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mb-4">
                  <img
                    src={selectedResource.thumbnail}
                    alt={selectedResource.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedResource.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>⏱️ {selectedResource.duration} minutes</span>
                    <span>📅 {new Date(selectedResource.date_uploaded).toLocaleDateString()}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedResource.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;