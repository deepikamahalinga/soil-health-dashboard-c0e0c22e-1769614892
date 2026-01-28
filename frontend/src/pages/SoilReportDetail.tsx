import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { apiClient } from '../api/apiClient';
import { Spinner } from '../components/Spinner';
import { Button } from '../components/Button';
import { toast } from 'react-hot-toast';

interface SoilReport {
  id: string;
  state: string;
  district: string;
  village: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  timestamp: string;
}

const SoilReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<SoilReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await apiClient.get(`/soil-reports/${id}`);
        setReport(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this soil report?')) {
      return;
    }

    try {
      await apiClient.delete(`/soil-reports/${id}`);
      toast.success('Soil report deleted successfully');
      navigate('/soil-reports');
    } catch (err) {
      toast.error('Failed to delete soil report');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => navigate('/soil-reports')}>Back to List</Button>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500 mb-4">Soil report not found</p>
        <Button onClick={() => navigate('/soil-reports')}>Back to List</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Soil Report Details
            </h1>
            <div className="space-x-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/soil-reports/${id}/edit`)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <div className="mt-1">
                  <p className="text-gray-900">{report.village}</p>
                  <p className="text-gray-900">{report.district}</p>
                  <p className="text-gray-900">{report.state}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">pH Level</h3>
                <p className="mt-1 text-gray-900">{report.ph.toFixed(2)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
                <p className="mt-1 text-gray-900">
                  {format(new Date(report.timestamp), 'PPpp')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Nutrient Levels (mg/kg)
                </h3>
                <div className="mt-1 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nitrogen:</span>
                    <span className="text-gray-900">
                      {report.nitrogen.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phosphorus:</span>
                    <span className="text-gray-900">
                      {report.phosphorus.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Potassium:</span>
                    <span className="text-gray-900">
                      {report.potassium.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="secondary"
          onClick={() => navigate('/soil-reports')}
        >
          Back to List
        </Button>
      </div>
    </div>
  );
};

export default SoilReportDetail;