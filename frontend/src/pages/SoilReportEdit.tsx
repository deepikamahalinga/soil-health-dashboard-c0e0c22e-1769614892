import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

const SoilReportEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<SoilReport>({
    id: '',
    state: '',
    district: '',
    village: '',
    ph: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    timestamp: new Date().toISOString()
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SoilReport, string>>>({});

  useEffect(() => {
    const fetchSoilReport = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/soil-reports/${id}`);
        if (!response.ok) throw new Error('Failed to fetch soil report');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        toast.error('Error loading soil report');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSoilReport();
  }, [id]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SoilReport, string>> = {};

    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.village.trim()) newErrors.village = 'Village is required';
    
    if (formData.ph < 0 || formData.ph > 14) {
      newErrors.ph = 'pH must be between 0 and 14';
    }
    
    if (formData.nitrogen < 0) newErrors.nitrogen = 'Nitrogen must be positive';
    if (formData.phosphorus < 0) newErrors.phosphorus = 'Phosphorus must be positive';
    if (formData.potassium < 0) newErrors.potassium = 'Potassium must be positive';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/soil-reports/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update soil report');
      
      toast.success('Soil report updated successfully');
      navigate('/soil-reports');
    } catch (error) {
      toast.error('Error updating soil report');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ph' || name === 'nitrogen' || name === 'phosphorus' || name === 'potassium' 
        ? parseFloat(value) 
        : value
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Soil Report</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location Information */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-3">Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Village</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.village ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village}</p>}
              </div>
            </div>
          </div>

          {/* Soil Measurements */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-3">Soil Measurements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">pH Level</label>
                <input
                  type="number"
                  name="ph"
                  value={formData.ph}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full p-2 border rounded ${errors.ph ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.ph && <p className="text-red-500 text-sm mt-1">{errors.ph}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nitrogen (mg/kg)</label>
                <input
                  type="number"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full p-2 border rounded ${errors.nitrogen ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nitrogen && <p className="text-red-500 text-sm mt-1">{errors.nitrogen}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phosphorus (mg/kg)</label>
                <input
                  type="number"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full p-2 border rounded ${errors.phosphorus ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phosphorus && <p className="text-red-500 text-sm mt-1">{errors.phosphorus}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Potassium (mg/kg)</label>
                <input
                  type="number"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full p-2 border rounded ${errors.potassium ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.potassium && <p className="text-red-500 text-sm mt-1">{errors.potassium}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/soil-reports')}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SoilReportEdit;