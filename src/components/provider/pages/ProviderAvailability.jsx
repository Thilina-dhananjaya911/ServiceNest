import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import Modal from '../ui/Modal';
import ContactDetails from '../ui/ContactDetails';

const INITIAL_AVAILABILITY = [
  { id: 1, day: 'Monday', startTime: '8:00 AM', endTime: '5:00 PM', status: 'Available' },
  { id: 2, day: 'Tuesday', startTime: '8:00 AM', endTime: '5:00 PM', status: 'Available' },
  { id: 3, day: 'Wednesday', startTime: '8:00 AM', endTime: '5:00 PM', status: 'Available' },
  { id: 4, day: 'Thursday', startTime: '8:00 AM', endTime: '5:00 PM', status: 'Available' },
  { id: 5, day: 'Friday', startTime: '8:00 AM', endTime: '5:00 PM', status: 'Available' },
  { id: 6, day: 'Saturday', startTime: '9:00 AM', endTime: '4:00 PM', status: 'Available' },
  { id: 7, day: 'Sunday', startTime: '-', endTime: '-', status: 'Unavailable' }
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function ProviderAvailability() {
  const [schedule, setSchedule] = useState(INITIAL_AVAILABILITY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    day: 'Monday',
    startTime: '8:00 AM',
    endTime: '5:00 PM',
    status: 'Available'
  });

  const handleOpenAddModal = () => {
    setFormData({
      day: 'Monday',
      startTime: '8:00 AM',
      endTime: '5:00 PM',
      status: 'Available'
    });
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      day: item.day,
      startTime: item.startTime === '-' ? '8:00 AM' : item.startTime,
      endTime: item.endTime === '-' ? '5:00 PM' : item.endTime,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      startTime: formData.status === 'Unavailable' ? '-' : formData.startTime,
      endTime: formData.status === 'Unavailable' ? '-' : formData.endTime
    };

    if (editingItem) {
      setSchedule(
        schedule.map((s) => (s.id === editingItem.id ? { ...s, ...finalData } : s))
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...finalData
      };
      setSchedule([...schedule, newItem]);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      setSchedule(schedule.filter((s) => s.id !== deletingId));
      setDeletingId(null);
    }
  };

  const handleToggleStatus = (id) => {
    setSchedule(
      schedule.map((s) => {
        if (s.id === id) {
          const newStatus = s.status === 'Available' ? 'Unavailable' : 'Available';
          return {
            ...s,
            status: newStatus,
            startTime: newStatus === 'Unavailable' ? '-' : '8:00 AM',
            endTime: newStatus === 'Unavailable' ? '-' : '5:00 PM'
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Page Header + Add Availability Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Calendar className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Availability
            </h1>
            <p className="text-xs text-slate-500">
              Manage your working days and available hours.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Availability</span>
        </button>
      </div>

      {/* Availability Schedule Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-5">Day</th>
                <th className="py-3 px-5">Start Time</th>
                <th className="py-3 px-5">End Time</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {schedule.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 whitespace-nowrap">{row.day}</td>
                  <td className="py-3.5 px-5 text-slate-700 whitespace-nowrap">{row.startTime}</td>
                  <td className="py-3.5 px-5 text-slate-700 whitespace-nowrap">{row.endTime}</td>
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(row.id)}
                      title="Click to toggle status"
                    >
                      <StatusBadge status={row.status} />
                    </button>
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(row)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="Edit Availability"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingId(row.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete Row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Availability Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Availability' : 'Add Availability'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">Day of Week</label>
            <select
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          {formData.status === 'Available' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Start Time</label>
                <input
                  type="text"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  placeholder="e.g. 8:00 AM"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">End Time</label>
                <input
                  type="text"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  placeholder="e.g. 5:00 PM"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
            >
              {editingItem ? 'Save Changes' : 'Add Availability'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        title="Delete Availability Slot"
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-3 text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="font-medium">Are you sure you want to remove this day from your schedule?</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setDeletingId(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Reusable Contact Details Footer */}
      <ContactDetails />

    </div>
  );
}
