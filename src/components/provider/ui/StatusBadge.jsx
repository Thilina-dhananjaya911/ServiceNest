import React from 'react';

export default function StatusBadge({ status }) {
  const normalized = (status || '').toLowerCase().trim();

  let style = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotStyle = 'bg-slate-400';

  if (normalized === 'pending') {
    style = 'bg-amber-50 text-amber-700 border-amber-200/80';
    dotStyle = 'bg-amber-500';
  } else if (normalized === 'in progress') {
    style = 'bg-blue-50 text-blue-700 border-blue-200/80';
    dotStyle = 'bg-blue-500';
  } else if (normalized === 'accepted') {
    style = 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
    dotStyle = 'bg-indigo-500';
  } else if (normalized === 'completed' || normalized === 'active' || normalized === 'available') {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    dotStyle = 'bg-emerald-500';
  } else if (normalized === 'rejected' || normalized === 'inactive' || normalized === 'unavailable') {
    style = 'bg-rose-50 text-rose-700 border-rose-200/80';
    dotStyle = 'bg-rose-500';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} />
      <span>{status}</span>
    </span>
  );
}
