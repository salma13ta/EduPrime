'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
    Search, Send, Paperclip, Smile, Phone, Video, 
    MoreVertical, CheckCheck, FileText, Image as ImageIcon, 
    X, Info, ShieldCheck, Sparkles, MessageSquare 
} from 'lucide-react';

interface Message {
    id: number;
    sender: 'student' | 'teacher';
    text: string;
    time: string;
    type?: 'text' | 'file';
    fileName?: string;
}

interface Teacher {
    id: number;
    name: string;
    subject: string;
    avatar: string;
    online: boolean;
    lastMessage: string;
    role: string;
}

const teachersList: Teacher[] = [
    {
        id: 1,
        name: 'Dr. Sarah Jenkins',
        subject: 'Advanced Mathematics',
        avatar: 'SJ',
        online: true,
        lastMessage: 'Great job on the latest calculus quiz!',
        role: 'Professor of Mathematics'
    },
    {
        id: 2,
        name: 'Prof. Michael Chang',
        subject: 'Physics & Mechanics',
        avatar: 'MC',
        online: false,
        lastMessage: 'Remember to submit your lab report by Thursday.',
        role: 'Head of Physics Dept'
    },
    {
        id: 3,
        name: 'Dr. Emily Watson',
        subject: 'Computer Science',
        avatar: 'EW',
        online: true,
        lastMessage: 'Check the new resources I uploaded for React.',
        role: 'Senior Lecturer'
    },
];

const initialMessages: Record<number, Message[]> = {
    1: [
        { id: 1, sender: 'teacher', text: 'Hello Alex! How can I help you with the calculus homework today?', time: '10:30 AM' },
        { id: 2, sender: 'student', text: 'Hi Dr. Sarah. I am struggling a bit with question number 4 on integration.', time: '10:32 AM' },
        { id: 3, sender: 'teacher', text: 'Ah, that one requires integration by parts. Try setting u = x.', time: '10:35 AM' },
        { id: 4, sender: 'student', text: 'Got it! Let me try that out. Thank you so much!', time: '10:38 AM' },
        { id: 5, sender: 'teacher', text: 'Great job on the latest calculus quiz!', time: '11:00 AM' },
    ],
    2: [
        { id: 1, sender: 'teacher', text: 'Remember to submit your lab report by Thursday.', time: 'Yesterday' },
    ],
    3: [
        { id: 1, sender: 'teacher', text: 'Check the new resources I uploaded for React.', time: '2 days ago' },
    ],
};

export default function TeacherChatSection() {
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher>(teachersList[0]);
    const [messages, setMessages] = useState<Record<number, Message[]>>(initialMessages);
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    
    // States for interactive modals/actions & Responsive view switcher on mobile
    const [activeModal, setActiveModal] = useState<'call' | 'video' | 'info' | null>(null);
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll smoothly to bottom when messages change or layout shifts
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, selectedTeacher, mobileView]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMessage: Message = {
            id: Date.now(),
            sender: 'student',
            text: inputText.trim(),
            time: currentTime,
            type: 'text'
        };

        setMessages((prev) => ({
            ...prev,
            [selectedTeacher.id]: [...(prev[selectedTeacher.id] || []), newMessage],
        }));

        setInputText('');

        // Realistic teacher response simulation
        setTimeout(() => {
            const replyMessage: Message = {
                id: Date.now() + 1,
                sender: 'teacher',
                text: `Thank you for your message, Alex. I have received it and will look into it shortly.`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => ({
                ...prev,
                [selectedTeacher.id]: [...(prev[selectedTeacher.id] || []), replyMessage],
            }));
        }, 2000);
    };

    const handleFileUploadSimulation = (fileType: string) => {
        setShowAttachmentMenu(false);
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newFileMessage: Message = {
            id: Date.now(),
            sender: 'student',
            text: `Uploaded a ${fileType}: Assignment_Final_v1.pdf`,
            time: currentTime,
            type: 'file',
            fileName: 'Assignment_Final_v1.pdf'
        };

        setMessages((prev) => ({
            ...prev,
            [selectedTeacher.id]: [...(prev[selectedTeacher.id] || []), newFileMessage],
        }));

        showToast(`تم إرسال الملف بنجاح إلى ${selectedTeacher.name}`);
    };

    const filteredTeachers = teachersList.filter(
        (t) =>
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentMessages = messages[selectedTeacher.id] || [];

    return (
        <div className="h-[calc(100vh-110px)] bg-[#110f1e] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative transition-all duration-300">
            
            {/* Toast Notification Bar Animation */}
            {toastMessage && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-purple-600 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-purple-400/30 animate-in fade-in slide-in-from-top-4 duration-300">
                    <Sparkles className="w-4 h-4 text-purple-200 animate-spin" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Sidebar: Teachers List (Responsive Hide/Show for Mobile & Desktop) */}
            <div className={`w-full md:w-80 border-r border-white/10 flex flex-col bg-[#0f0d19] transition-all duration-300 absolute md:relative inset-0 z-20 md:z-auto ${
                mobileView === 'chat' ? '-translate-x-full md:translate-x-0 hidden md:flex' : 'translate-x-0 flex'
            }`}>
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>Messages</span>
                            <span className="px-2 py-0.5 bg-purple-600/20 text-purple-400 text-[10px] rounded-full border border-purple-500/30">
                                {teachersList.length} Teachers
                            </span>
                        </h2>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                            type="text"
                            placeholder="Search teachers or subjects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-[#171426] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all shadow-inner"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-white/5 scroll-smooth">
                    {filteredTeachers.map((teacher) => {
                        const isSelected = selectedTeacher.id === teacher.id;
                        return (
                            <div
                                key={teacher.id}
                                onClick={() => {
                                    setSelectedTeacher(teacher);
                                    setMobileView('chat'); // Switch to chat view on mobile when clicked
                                }}
                                className={`p-4 flex items-center gap-3 cursor-pointer transition-all duration-200 hover:bg-purple-600/10 ${
                                    isSelected ? 'bg-purple-600/20 border-l-4 border-purple-500 scale-[0.99]' : ''
                                }`}
                            >
                                <div className="relative flex-shrink-0">
                                    <div className="w-11 h-11 rounded-2xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center font-bold text-sm text-purple-300 shadow-md">
                                        {teacher.avatar}
                                    </div>
                                    {teacher.online && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0f0d19] rounded-full animate-pulse" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h4 className="text-xs font-bold text-white truncate">{teacher.name}</h4>
                                    </div>
                                    <p className="text-[10px] text-purple-400 font-medium mb-1">{teacher.subject}</p>
                                    <p className="text-[11px] text-gray-400 truncate">{teacher.lastMessage}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Chat Area (Responsive Hide/Show for Mobile & Desktop) */}
            <div className={`flex-1 flex flex-col bg-[#08070d] absolute md:relative inset-0 z-20 md:z-auto transition-all duration-300 ${
                mobileView === 'list' ? 'hidden md:flex' : 'flex'
            }`}>
                
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#110f1e]/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        {/* Back button visible only on mobile screens to return to list */}
                        <button
                            onClick={() => setMobileView('list')}
                            className="md:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer"
                        >
                            <MessageSquare className="w-4 h-4 text-purple-400" />
                        </button>

                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-purple-600/25 border border-purple-500/30 flex items-center justify-center font-bold text-xs text-purple-300">
                                {selectedTeacher.avatar}
                            </div>
                            {selectedTeacher.online && (
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#110f1e] rounded-full" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                                {selectedTeacher.name}
                                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                            </h3>
                            <p className="text-[10px] text-gray-400">
                                {selectedTeacher.online ? <span className="text-emerald-400 font-medium">Online Now</span> : 'Offline'} • {selectedTeacher.role}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setActiveModal('call')}
                            title="Start Audio Call"
                            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/40 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                        >
                            <Phone className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setActiveModal('video')}
                            title="Start Video Lecture"
                            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/40 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                        >
                            <Video className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setActiveModal('info')}
                            title="Teacher Info"
                            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/40 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Messages Feed with Smooth Scroll Support */}
                <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4 scroll-smooth">
                    <div className="text-center my-2">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] text-gray-400 rounded-full shadow-sm">
                            End-to-end encrypted academic channel with {selectedTeacher.name}
                        </span>
                    </div>

                    {currentMessages.map((msg, index) => {
                        const isStudent = msg.sender === 'student';
                        return (
                            <div 
                                key={msg.id} 
                                className={`flex ${isStudent ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                                style={{ animationDelay: `${index * 30}ms` }}
                            >
                                <div
                                    className={`max-w-[85%] md:max-w-md p-3.5 rounded-2xl text-xs space-y-1.5 transition-all shadow-md ${
                                        isStudent
                                            ? 'bg-purple-600 text-white rounded-br-none shadow-purple-600/20'
                                            : 'bg-[#161326] border border-white/10 text-gray-200 rounded-bl-none'
                                    }`}
                                >
                                    {msg.type === 'file' ? (
                                        <div className="flex items-center gap-3 bg-black/25 p-2.5 rounded-xl border border-white/10">
                                            <FileText className="w-6 h-6 text-purple-300 flex-shrink-0 animate-pulse" />
                                            <div className="min-w-0 flex-1">
                                                <p className="font-bold text-white truncate text-xs">{msg.fileName}</p>
                                                <p className="text-[9px] text-purple-200">Academic Document • Ready</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="leading-relaxed">{msg.text}</p>
                                    )}

                                    <div
                                        className={`flex items-center justify-end gap-1 text-[9px] ${
                                            isStudent ? 'text-purple-200' : 'text-gray-400'
                                        }`}
                                    >
                                        <span>{msg.time}</span>
                                        {isStudent && <CheckCheck className="w-3 h-3 text-purple-200" />}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Attachment Popup Menu Animation */}
                {showAttachmentMenu && (
                    <div className="absolute bottom-20 left-4 md:left-80 z-30 bg-[#171426] border border-white/15 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 w-48 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                        <button 
                            onClick={() => handleFileUploadSimulation('Document')}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-xl transition-all cursor-pointer text-left"
                        >
                            <FileText className="w-4 h-4 text-purple-400" />
                            <span>Upload Document</span>
                        </button>
                        <button 
                            onClick={() => handleFileUploadSimulation('Image')}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-xl transition-all cursor-pointer text-left"
                        >
                            <ImageIcon className="w-4 h-4 text-emerald-400" />
                            <span>Upload Screenshot</span>
                        </button>
                    </div>
                )}

                {/* Message Input Box */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-[#110f1e]/80 backdrop-blur-md flex items-center gap-2 md:gap-3 relative">
                    <button
                        type="button"
                        onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                        title="Attach File"
                        className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer flex-shrink-0"
                    >
                        <Paperclip className="w-4 h-4" />
                    </button>
                    
                    <input
                        type="text"
                        placeholder={`Type a message to ${selectedTeacher.name}...`}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-[#08070d] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all shadow-inner"
                    />

                    <button
                        type="button"
                        onClick={() => showToast('Emoji panel clicked')}
                        title="Add Emoji"
                        className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer hidden md:block flex-shrink-0"
                    >
                        <Smile className="w-4 h-4" />
                    </button>

                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className={`p-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center flex-shrink-0 ${
                            inputText.trim() 
                                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30 cursor-pointer hover:scale-105 active:scale-95' 
                                : 'bg-white/5 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>

            {/* Interactive Modals with Smooth Scale-In Animation */}
            {activeModal && (
                <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#141223] border border-white/15 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 rounded-xl cursor-pointer transition-all hover:bg-white/10"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {activeModal === 'call' && (
                            <>
                                <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-300 font-bold text-xl animate-pulse">
                                    <Phone className="w-8 h-8" />
                                </div>
                                <h3 className="text-base font-bold text-white">Voice Call with {selectedTeacher.name}</h3>
                                <p className="text-xs text-gray-400">Initiating secure audio channel...</p>
                                <div className="pt-2 flex justify-center gap-3">
                                    <button 
                                        onClick={() => { showToast('Call ended'); setActiveModal(null); }}
                                        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-rose-600/30"
                                    >
                                        End Call
                                    </button>
                                </div>
                            </>
                        )}

                        {activeModal === 'video' && (
                            <>
                                <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-300 font-bold text-xl animate-pulse">
                                    <Video className="w-8 h-8" />
                                </div>
                                <h3 className="text-base font-bold text-white">Video Lecture Session</h3>
                                <p className="text-xs text-gray-400">Connecting to {selectedTeacher.name}&apos;s virtual room...</p>
                                <div className="pt-2 flex justify-center gap-3">
                                    <button 
                                        onClick={() => { showToast('Video session closed'); setActiveModal(null); }}
                                        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-rose-600/30"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}

                        {activeModal === 'info' && (
                            <>
                                <div className="w-16 h-16 rounded-2xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center mx-auto font-bold text-lg text-purple-300 shadow-md">
                                    {selectedTeacher.avatar}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">{selectedTeacher.name}</h3>
                                    <p className="text-xs text-purple-400 font-medium">{selectedTeacher.subject}</p>
                                </div>
                                <div className="text-left bg-[#0f0d19] p-3 rounded-2xl border border-white/5 space-y-1.5 text-xs shadow-inner">
                                    <p className="text-gray-300"><span className="text-gray-500">Role:</span> {selectedTeacher.role}</p>
                                    <p className="text-gray-300"><span className="text-gray-500">Status:</span> {selectedTeacher.online ? 'Active Now' : 'Away'}</p>
                                    <p className="text-gray-300"><span className="text-gray-500">Department:</span> Faculty of Science & Engineering</p>
                                </div>
                                <button 
                                    onClick={() => setActiveModal(null)}
                                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-purple-600/30"
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}