import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SoilReportForm {
  state: string;
  district: string;
  village: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

const initialFormState: SoilReportForm = {
  state: '',
  district: '',
  village: '',
  ph: 0,
  nitrogen: 0,
  phosphorus: 0,
  potassium: 0
};

const SoilReportCreate: React.FC = () => {
  const [formData, setFormData] = useState<SoilReportForm>(initialFormState);
  const [errors, setErrors] = useState<Partial<SoilReportForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Partial<SoilReportForm> = {};

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
    if (!formData.village.trim()) {
      newErrors.village = 'Village is required';
    }
    if (formData.ph < 0 || formData.ph > 14) {
      newErrors.ph = 'pH must be between 0 and 14';
    }
    if (formData.nitrogen < 0) {
      newErrors.nitrogen = 'Nitrogen must be positive';
    }
    if (formData.phosphorus < 0) {
      newErrors.phosphorus = 'Phosphorus must be positive';
    }
    if (formData.potassium < 0) {
      newErrors.potassium = 'Potassium must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await axios.post('/api/soil-reports', formData);
      navigate('/soil-reports');
    } catch (error) {
      setSubmitError('Failed to create soil report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'state' || name === 'district' || name === 'village' 
        ? value
        : parseFloat(value)
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create Soil Report</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.state ? 'border-red-500' : ''}`}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.district ? 'border-red-500' : ''}`}
              />
              {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Village</label>
              <input
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.village ? 'border-red-500' : ''}`}
              />
              {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village}</p>}
            </div>
          </div>

          {/* Soil Measurements */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">pH Level</label>
              <input
                type="number"
                name="ph"
                value={formData.ph}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="14"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.ph ? 'border-red-500' : ''}`}
              />
              {errors.ph && <p className="text-red-500 text-sm mt-1">{errors.ph}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nitrogen (mg/kg)</label>
              <input
                type="number"
                name="nitrogen"
                value={formData.nitrogen}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.nitrogen ? 'border-red-500' : ''}`}
              />
              {errors.nitrogen && <p className="text-red-500 text-sm mt-1">{errors.nitrogen}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phosphorus (mg/kg)</label>
              <input
                type="number"
                name="phosphorus"
                value={formData.phosphorus}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.phosphorus ? 'border-red-500' : ''}`}
              />
              {errors.phosphorus && <p className="text-red-500 text-sm mt-1">{errors.phosphorus}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Potassium (mg/kg)</label>
              <input
                type="number"
                name="potassium"
                value={formData.potassium}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.potassium ? 'border-red-500' : ''}`}
              />
              {errors.potassium && <p className="text-red-500 text-sm mt-1">{errors.potassium}</p>}
            </div>
          </div>
        </div>

        {submitError && (
          <div className="text-red-500 text-sm mt-4">{submitError}</div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/soil-reports')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SoilReportCreate;