'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiSearch,
    FiSend,
    FiImage,
    FiSmile,
    FiCheckCircle,
    FiPhone,
    FiVideo,
    FiX,
    FiMic,
    FiMicOff,
    FiInfo,
    FiArrowLeft
} from 'react-icons/fi';

interface Message {
    id: number;
    sender: 'user' | 'other';
    text: string;
    time: string;
    type?: 'text' | 'image' | 'file' | 'audio';
}

interface Contact {
    id: number;
    name: string;
    role: 'Students' | 'Parents' | 'Admins';
    roleTitle: string;
    avatar: string;
    online: boolean;
    unread: number;
    lastMessage: string;
    lastTime: string;
    messages: Message[];
}

const createMessageId = (counterRef: { current: number }) => {
    counterRef.current += 1;
    return counterRef.current;
};

const getMessageTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function MessagesView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'All' | 'Students' | 'Parents' | 'Admins'>('All');

    // حالة التحكم بالعرض في الموبايل (هل نحن في قائمة المحادثات أم داخل الشات)
    const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

    // بيانات المحادثات التفاعلية
    const [contacts, setContacts] = useState<Contact[]>([
        {
            id: 1,
            name: 'Mohamed Salah',
            role: 'Students',
            roleTitle: 'Student - Advanced Calculus',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
            online: true,
            unread: 2,
            lastMessage: 'Sir, I have a question regarding homework question #4.',
            lastTime: '10:45 AM',
            messages: [
                { id: 1, sender: 'other', text: 'Hello Dr. Ahmed, good morning!', time: '10:30 AM', type: 'text' },
                { id: 2, sender: 'other', text: 'Sir, I have a question regarding homework question #4.', time: '10:45 AM', type: 'text' },
            ]
        },
        {
            id: 2,
            name: 'Mrs. Fatma El-Sayed',
            role: 'Parents',
            roleTitle: 'Parent (Student: Karim)',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
            online: true,
            unread: 0,
            lastMessage: 'Thank you for following up with Karim’s progress.',
            lastTime: 'Yesterday',
            messages: [
                { id: 1, sender: 'other', text: 'Hello Doctor, how is Karim doing in class?', time: 'Yesterday', type: 'text' },
                { id: 2, sender: 'user', text: 'He is doing exceptional work, very focused!', time: 'Yesterday', type: 'text' },
                { id: 3, sender: 'other', text: 'Thank you for following up with Karim’s progress.', time: 'Yesterday', type: 'text' },
            ]
        },
        {
            id: 3,
            name: 'Admin Support (EduPlex)',
            role: 'Admins',
            roleTitle: 'Platform Administration',
            avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80',
            online: false,
            unread: 0,
            lastMessage: 'Your schedule for next week has been successfully updated.',
            lastTime: 'Jul 2',
            messages: [
                { id: 1, sender: 'other', text: 'Your schedule for next week has been successfully updated.', time: 'Jul 2', type: 'text' }
            ]
        },
        {
            id: 4,
            name: 'Youssef Nabil',
            role: 'Students',
            roleTitle: 'Student - Physics Package',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
            online: false,
            unread: 1,
            lastMessage: 'Will the lecture recording be uploaded today?',
            lastTime: 'Jul 1',
            messages: [
                { id: 1, sender: 'other', text: 'Will the lecture recording be uploaded today?', time: 'Jul 1', type: 'text' }
            ]
        }
    ]);

    const [selectedContactId, setSelectedContactId] = useState<number>(1);
    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    // حالات النوافذ المنبثقة
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [modalState, setModalState] = useState<'none' | 'audioCall' | 'videoCall' | 'info'>('none');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messageIdRef = useRef(0);

    const activeContact = contacts.find(c => c.id === selectedContactId) || contacts[0];

    // التمرير تلقائياً لأسفل المحادثة
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeContact.messages, mobileView]);

    // إرسال رسالة نصية
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: createMessageId(messageIdRef),
            sender: 'user',
            text: inputText,
            time: getMessageTime(),
            type: 'text'
        };

        updateMessages(newMessage, inputText);
        setInputText('');
        setShowEmojiPicker(false);
    };

    // رفع ملف أو صورة من الجهاز
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isImage = file.type.startsWith('image/');
        const sampleText = isImage ? `📷 [Image: ${file.name}]` : `📎 [File: ${file.name}]`;

        const newMessage: Message = {
            id: createMessageId(messageIdRef),
            sender: 'user',
            text: sampleText,
            time: getMessageTime(),
            type: isImage ? 'image' : 'file'
        };

        updateMessages(newMessage, sampleText);
        if (e.target) e.target.value = '';
    };

    // محاكاة تسجيل الصوت
    const toggleRecording = () => {
        if (!isRecording) {
            setIsRecording(true);
        } else {
            setIsRecording(false);
            const audioMessage: Message = {
                id: createMessageId(messageIdRef),
                sender: 'user',
                text: '🎤 [Voice Recording - 0:14]',
                time: getMessageTime(),
                type: 'audio'
            };
            updateMessages(audioMessage, '🎤 [Voice Recording]');
        }
    };

    const updateMessages = (newMessage: Message, lastMsgText: string) => {
        setContacts(prev => prev.map(c => {
            if (c.id === activeContact.id) {
                return {
                    ...c,
                    lastMessage: lastMsgText,
                    lastTime: 'Just now',
                    messages: [...c.messages, newMessage]
                };
            }
            return c;
        }));
    };

    const addEmoji = (emoji: string) => {
        setInputText(prev => prev + emoji);
    };

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeTab === 'All') return matchesSearch;
        return matchesSearch && contact.role === activeTab;
    });

    return (
        <div className="w-full h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-5rem)] text-slate-100 font-sans flex flex-col xl:flex-row gap-3 sm:gap-4 p-2 sm:p-4 relative overflow-hidden">

            {/* 1. Sidebar: Contacts List (تظهر بالكامل على الشاشات الكبيرة، وعلى الجوال حسب حالة mobileView) */}
            <div className={`w-full xl:w-85 bg-[#111522] border border-slate-800/80 rounded-2xl p-3 sm:p-4 flex flex-col shadow-xl h-full shrink-0 ${mobileView === 'chat' ? 'hidden xl:flex' : 'flex'
                }`}>
                {/* Header & Search */}
                <div className="space-y-2.5 sm:space-y-3 mb-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-sm sm:text-base font-black text-white tracking-wide">Messages</h2>
                        <span className="bg-indigo-600/25 text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                            {contacts.reduce((acc, c) => acc + c.unread, 0)} New
                        </span>
                    </div>

                    <div className="relative">
                        <FiSearch className="absolute left-3 top-3 text-slate-500 text-sm" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search conversations..."
                            className="w-full bg-[#151a28] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-1 bg-[#151a28] p-1 rounded-xl border border-slate-800/60 overflow-x-auto">
                        {(['All', 'Students', 'Parents', 'Admins'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative flex-1 py-1.5 px-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute inset-0 bg-indigo-600 rounded-lg shadow-md"
                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contacts Scrollable List */}
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {filteredContacts.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-xs">No conversations found.</div>
                    ) : (
                        filteredContacts.map((contact) => {
                            const isSelected = contact.id === selectedContactId;
                            return (
                                <div
                                    key={contact.id}
                                    onClick={() => {
                                        setSelectedContactId(contact.id);
                                        setContacts(prev => prev.map(item => item.id === contact.id ? { ...item, unread: 0 } : item));
                                        setMobileView('chat'); // الانتقال للشات عند الضغط على الجوال
                                    }}
                                    className={`p-2.5 sm:p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 border ${isSelected && window.innerWidth >= 1280
                                        ? 'bg-[#181f33] border-cyan-400/60 shadow-lg ring-1 ring-cyan-400/20'
                                        : 'bg-[#151a28]/40 border-slate-800/50 hover:bg-[#151a28]'
                                        }`}
                                >
                                    <div className="relative shrink-0">
                                        <img src={contact.avatar} alt={contact.name} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-slate-700" />
                                        {contact.online && (
                                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#111522] rounded-full" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-bold text-xs sm:text-sm text-white truncate">{contact.name}</h4>
                                            <span className="text-[9px] text-slate-500 shrink-0">{contact.lastTime}</span>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-slate-400 truncate mt-0.5">{contact.lastMessage}</p>
                                    </div>

                                    {contact.unread > 0 && (
                                        <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 font-black text-[9px] flex items-center justify-center shrink-0">
                                            {contact.unread}
                                        </span>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* 2. Main Chat Area (تظهر بالكامل على الشاشات الكبيرة، وعند الجوال تظهر فقط إذا كان mobileView === 'chat') */}
            <div className={`flex-1 bg-[#111522] border border-slate-800/80 rounded-2xl flex flex-col shadow-xl overflow-hidden h-full relative ${mobileView === 'list' ? 'hidden xl:flex' : 'flex'
                }`}>

                {/* Chat Header */}
                <div className="p-3 sm:p-4 border-b border-slate-800/80 flex justify-between items-center bg-[#131826] z-10">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        {/* زر العودة للقائمة في الموبايل */}
                        <button
                            onClick={() => setMobileView('list')}
                            className="xl:hidden w-8 h-8 rounded-lg bg-[#181f33] border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition shrink-0"
                            title="Back to Conversations"
                        >
                            <FiArrowLeft size={16} />
                        </button>

                        <div className="relative shrink-0">
                            <img src={activeContact.avatar} alt={activeContact.name} className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-slate-700" />
                            {activeContact.online && (
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-[#111522] rounded-full" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-xs sm:text-sm text-white truncate">{activeContact.name}</h3>
                            <p className="text-[9px] sm:text-[10px] text-cyan-400 flex items-center gap-1 font-medium truncate">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeContact.online ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                                <span className="truncate">{activeContact.roleTitle}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                        <button
                            onClick={() => setModalState('audioCall')}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#181f33] border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition"
                            title="Voice Call"
                        >
                            <FiPhone size={13} />
                        </button>
                        <button
                            onClick={() => setModalState('videoCall')}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#181f33] border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition"
                            title="Video Session"
                        >
                            <FiVideo size={13} />
                        </button>
                        <button
                            onClick={() => setModalState('info')}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#181f33] border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition"
                            title="Contact Info"
                        >
                            <FiInfo size={13} />
                        </button>
                    </div>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 bg-[#0f121d] custom-scrollbar">
                    <div className="text-center my-2">
                        <span className="text-[9px] bg-slate-800/60 text-slate-400 px-3 py-0.5 rounded-full border border-slate-700/50">
                            Today, July 10, 2026
                        </span>
                    </div>

                    {activeContact.messages.map((msg) => {
                        const isUser = msg.sender === 'user';
                        return (
                            <div
                                key={msg.id}
                                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] sm:max-w-[65%] p-3 rounded-2xl space-y-1 shadow-md ${isUser
                                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-br-xs'
                                    : 'bg-[#181f33] text-slate-200 border border-slate-800/80 rounded-bl-xs'
                                    }`}>
                                    <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                                    <div className={`flex items-center justify-end gap-1 text-[9px] font-medium ${isUser ? 'text-indigo-200' : 'text-slate-500'}`}>
                                        <span>{msg.time}</span>
                                        {isUser && <FiCheckCircle size={9} className="text-cyan-300" />}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Emoji Picker Popup */}
                <AnimatePresence>
                    {showEmojiPicker && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-20 left-10 bg-[#181f33] border border-slate-700 p-2.5 rounded-xl shadow-2xl z-20 flex gap-1.5"
                        >
                            {['😀', '👍', '🔥', '❤️', '👏', '💡', '🎉', '❓'].map(emoji => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => addEmoji(emoji)}
                                    className="w-7 h-7 flex items-center justify-center text-sm rounded-lg hover:bg-slate-700/50 transition"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Message Input Footer */}
                <form onSubmit={handleSendMessage} className="p-2.5 sm:p-3 border-t border-slate-800/80 bg-[#131826] flex items-center gap-2 relative z-10">

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                    />

                    {/* Image / File Upload Button */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-slate-400 hover:text-cyan-400 transition p-1.5 rounded-lg hover:bg-slate-800/50 shrink-0"
                        title="Upload Image or File"
                    >
                        <FiImage size={18} />
                    </button>

                    {/* Voice Record / Mic Button */}
                    <button
                        type="button"
                        onClick={toggleRecording}
                        className={`transition p-1.5 rounded-lg shrink-0 ${isRecording ? 'text-rose-500 bg-rose-500/10 animate-pulse' : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50'}`}
                        title={isRecording ? "Stop Recording" : "Record Audio Note"}
                    >
                        {isRecording ? <FiMicOff size={18} /> : <FiMic size={18} />}
                    </button>

                    <input
                        type="text"
                        value={isRecording ? "Recording voice note..." : inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isRecording}
                        placeholder="Type your message..."
                        className="flex-1 bg-[#181f33] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition disabled:opacity-50 min-w-0"
                    />

                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="text-slate-400 hover:text-yellow-400 transition p-1.5 rounded-lg hover:bg-slate-800/50 shrink-0"
                        title="Add Emoji"
                    >
                        <FiSmile size={18} />
                    </button>

                    <button
                        type="submit"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-600 text-slate-950 font-black flex items-center justify-center shadow-md shadow-cyan-500/20 hover:opacity-90 transition shrink-0"
                    >
                        <FiSend size={15} />
                    </button>
                </form>

            </div>

            {/* 3. Interactive Modals */}
            <AnimatePresence>
                {modalState !== 'none' && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#131826] border border-slate-700/80 rounded-2xl p-5 w-full max-w-sm shadow-2xl text-center space-y-4 relative"
                        >
                            <button
                                onClick={() => setModalState('none')}
                                className="absolute top-3 right-3 text-slate-400 hover:text-white bg-slate-800/60 p-1.5 rounded-lg transition"
                            >
                                <FiX size={14} />
                            </button>

                            {modalState === 'audioCall' && (
                                <div className="space-y-3 py-2">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center animate-pulse">
                                        <img src={activeContact.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-sm text-white">{activeContact.name}</h3>
                                        <p className="text-[11px] text-cyan-400 mt-0.5">Calling securely...</p>
                                    </div>
                                    <button
                                        onClick={() => setModalState('none')}
                                        className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md"
                                    >
                                        End Call
                                    </button>
                                </div>
                            )}

                            {modalState === 'videoCall' && (
                                <div className="space-y-3 py-1">
                                    <div className="w-full h-36 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                                        <img src={activeContact.avatar} alt="" className="w-full h-full object-cover opacity-50 filter blur-xs" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                                            <span className="text-[10px] font-bold text-white flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> Connecting Video...
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="font-extrabold text-sm text-white">{activeContact.name}</h3>
                                    <button
                                        onClick={() => setModalState('none')}
                                        className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md"
                                    >
                                        Leave Session
                                    </button>
                                </div>
                            )}

                            {modalState === 'info' && (
                                <div className="space-y-3 py-1 text-left">
                                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                                        <img src={activeContact.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                                        <div>
                                            <h3 className="font-bold text-xs text-white">{activeContact.name}</h3>
                                            <p className="text-[10px] text-cyan-400">{activeContact.roleTitle}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 text-xs text-slate-300">
                                        <div className="flex justify-between py-1 border-b border-slate-800/50">
                                            <span className="text-slate-500 text-[10px]">Status:</span>
                                            <span className={`text-[10px] ${activeContact.online ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>{activeContact.online ? 'Online' : 'Offline'}</span>
                                        </div>
                                        <div className="flex justify-between py-1 border-b border-slate-800/50">
                                            <span className="text-slate-500 text-[10px]">Category:</span>
                                            <span className="font-semibold text-white text-[10px]">{activeContact.role}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setModalState('none')}
                                        className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md mt-2"
                                    >
                                        Close Info
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}