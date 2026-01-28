import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaChartLine, FaClipboardList, FaMicroscope } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Understand Your Soil Health
              <span className="text-green-600">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
              Make data-driven decisions to improve your soil quality with our comprehensive soil health monitoring dashboard.
            </p>
            <Link
              to="/soil-reports"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
            >
              View Soil Reports
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">1000+</div>
              <div className="mt-2 text-gray-600">Soil Samples Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">85%</div>
              <div className="mt-2 text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">24/7</div>
              <div className="mt-2 text-gray-600">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">50+</div>
              <div className="mt-2 text-gray-600">Partner Farms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-green-600 text-3xl mb-4">
                <FaLeaf />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nutrient Analysis</h3>
              <p className="text-gray-600">
                Detailed breakdown of soil nutrients and organic matter content.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-green-600 text-3xl mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trend Tracking</h3>
              <p className="text-gray-600">
                Monitor soil health changes over time with interactive charts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-green-600 text-3xl mb-4">
                <FaClipboardList />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recommendations</h3>
              <p className="text-gray-600">
                Get personalized suggestions for soil improvement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-green-600 text-3xl mb-4">
                <FaMicroscope />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-gray-600">
                Comprehensive soil health reports with key metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to improve your soil health?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start monitoring your soil quality today with our comprehensive dashboard.
          </p>
          <Link
            to="/soil-reports/new"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
          >
            Create New Report
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;