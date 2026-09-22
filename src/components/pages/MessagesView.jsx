import React, { useState } from 'react';
import {
  Search,
  Send,
  Phone,
  MoreVertical,
  CheckCheck,
  ShieldCheck
} from 'lucide-react';

const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    name: 'TechFlow Plumbing',
    category: 'Plumbing Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    lastMessage: "I'll be arriving at your location by 9:30 AM tomorrow with the replacement PVC pipes.",
    time: '10:45 AM',
    unread: 2,
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Hello! Thank you for requesting our plumbing service.', time: '10:30 AM' },
      { id: 2, sender: 'me', text: 'Hi! The pipe under the kitchen sink is leaking heavily.', time: '10:35 AM' },
      { id: 3, sender: 'them', text: 'Understood. Is the main supply shut off?', time: '10:38 AM' },
      { id: 4, sender: 'me', text: 'Yes, I closed the main water valve.', time: '10:40 AM' },
      { id: 5, sender: 'them', text: "I'll be arriving at your location by 9:30 AM tomorrow with the replacement PVC pipes.", time: '10:45 AM' }
    ]
  },
  {
    id: 2,
    name: 'Ahmed Raza',
    category: 'Plumber',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    lastMessage: 'Got the address. See you on Saturday!',
    time: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'Hi, please share your exact gate number in Colombo 05.', time: 'Yesterday' },
      { id: 2, sender: 'me', text: 'It is No. 45/2, beside the pharmacy.', time: 'Yesterday' },
      { id: 3, sender: 'them', text: 'Got the address. See you on Saturday!', time: 'Yesterday' }
    ]
  },
  {
    id: 3,
    name: 'Bimal Perera',
    category: 'Certified Electrician',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    lastMessage: 'The trip switch replacement is completed successfully.',
    time: '3 days ago',
    unread: 0,
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'The trip switch replacement is completed successfully.', time: '3 days ago' }
    ]
  }
];

export default function MessagesView() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: messageInput.trim(),
      time: 'Just now'
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              lastMessage: messageInput.trim(),
              time: 'Just now',
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );

    setMessageInput('');
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl shadow-2xs overflow-hidden h-[calc(100vh-160px)] min-h-[550px] flex flex-col md:flex-row animate-in fade-in duration-200">
      
      {/* Left Chat List Column */}
      <div className="w-full md:w-80 border-r border-slate-100 flex flex-col bg-slate-50/50">
        
        {/* Header & Search */}
        <div className="p-4 border-b border-slate-200/80 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Messages
            </h2>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Demo Chat
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Conversation Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredConversations.map((chat) => {
            const isSelected = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setConversations((prev) =>
                    prev.map((c) => (c.id === chat.id ? { ...c, unread: 0 } : c))
                  );
                }}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-100/70'
                }`}
              >
                <div className="relative shrink-0 w-10 h-10 rounded-full bg-[#0B3A82] text-white font-bold flex items-center justify-center text-xs">
                  <span>{chat.name.charAt(0)}</span>
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="absolute inset-0 w-10 h-10 rounded-full object-cover border border-slate-200"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 truncate">{chat.name}</h3>
                    <span className="text-[10px] text-slate-400 shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{chat.lastMessage}</p>
                </div>

                {chat.unread > 0 && (
                  <span className="shrink-0 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-slate-200/80 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 w-9 h-9 rounded-full bg-[#0B3A82] text-white font-bold flex items-center justify-center text-xs">
              <span>{activeChat.name.charAt(0)}</span>
              <img
                src={activeChat.avatar}
                alt={activeChat.name}
                className="absolute inset-0 w-9 h-9 rounded-full object-cover border border-slate-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {activeChat.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              )}
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                {activeChat.name}
              </h3>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{activeChat.category} • Verified</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert(`Calling ${activeChat.name}...`)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
          <div className="text-center my-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200/60 px-3 py-1 rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>ServiceNest Encrypted Conversation</span>
            </span>
          </div>

          {activeChat.messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2.5 text-xs shadow-2xs ${
                    isMe
                      ? 'bg-[#2563EB] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-blue-200" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 sm:p-4 border-t border-slate-200/80 bg-white flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>

    </div>
  );
}
