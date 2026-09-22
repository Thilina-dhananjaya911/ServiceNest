import React, { useState, useEffect } from 'react';
import {
  X,
  Grid,
  Wrench,
  Zap,
  Wind,
  Hammer,
  Sparkles,
  Paintbrush,
  Trees,
  Home,
  Layers,
  Tv,
  ShieldAlert,
  Sun,
  ShieldCheck,
  Check
} from 'lucide-react';

const AVAILABLE_ICONS = [
  { name: 'Wrench', icon: Wrench },
  { name: 'Zap', icon: Zap },
  { name: 'Wind', icon: Wind },
  { name: 'Hammer', icon: Hammer },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Paintbrush', icon: Paintbrush },
  { name: 'Trees', icon: Trees },
  { name: 'Home', icon: Home },
  { name: 'Layers', icon: Layers },
  { name: 'Tv', icon: Tv },
  { name: 'ShieldAlert', icon: ShieldAlert },
  { name: 'Sun', icon: Sun },
];

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSave,
  category = null
}) {
  const [formData, setFormData] = useState({
    name: '',
    iconName: 'Wrench',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        iconName: category.iconName || 'Wrench',
        status: category.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        iconName: 'Wrench',
        status: 'Active'
      });
    }
    setErrors({});
  }, [category, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Category name is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...(category || {}),
      id: category?.id || `CAT-${Math.floor(20 + Math.random() * 80)}`,
      name: formData.name.trim(),
      iconName: formData.iconName,
      status: formData.status,
      providersCount: category?.providersCount || 0
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Grid className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {category ? 'Edit Trade Category' : 'Add New Category'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Organize service offerings and trade classifications on the customer catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              <span className="text-rose-500 mr-1">*</span>Category Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData((p) => ({ ...p, name: e.target.value }));
                if (errors.name) setErrors((p) => ({ ...p, name: '' }));
              }}
              placeholder="e.g. CCTV & Security"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Icon Selector Grid */}
          <div>
            <label className="block font-semibold text-slate-700 mb-2">Select Display Icon</label>
            <div className="grid grid-cols-6 gap-2">
              {AVAILABLE_ICONS.map((item) => {
                const Icon = item.icon;
                const isSelected = formData.iconName === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, iconName: item.name }))}
                    className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0B3A82] text-white border-[#0B3A82] shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                    title={item.name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {category ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
