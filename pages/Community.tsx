import React, { useState, useRef, useEffect } from 'react';
import { initialPosts, currentUser, contacts, initialChatHistory } from '../mockData';
import { ForumPost, ChatContact, ChatMessage } from '../types';
import { checkContentSafety } from '../services/gemini';
import { MessageSquare, Heart, Send, ShieldCheck, AlertTriangle, Users, MessageCircle, ArrowLeft } from 'lucide-react';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'chat'>('forum');

  // Forum State
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [category, setCategory] = useState<'Academics' | 'Career' | 'Wellness' | 'General'>('General');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Chat State
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, ChatMessage[]>>(initialChatHistory);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedContact, chatHistory]);

  const handlePostSubmit = async () => {
    if (!newPostContent.trim()) return;

    setIsSubmitting(true);
    setErrorMsg('');

    // AI Moderation Step
    const moderation = await checkContentSafety(newPostContent);

    if (!moderation.safe) {
      setErrorMsg(`Post blocked by AI Moderator: ${moderation.reason || 'Content flagged as inappropriate.'}`);
      setIsSubmitting(false);
      return;
    }

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: currentUser.name,
      authorAvatar: currentUser.avatar,
      category,
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsSubmitting(false);
  };

  const handleLike = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;
    
    // Optimistic update
    const tempMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    const contactId = selectedContact.id;
    setChatHistory(prev => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), tempMessage]
    }));
    setNewMessage('');

    // Background moderation check
    const moderation = await checkContentSafety(tempMessage.text);
    if (!moderation.safe) {
        // If unsafe, we could replace the message or show an alert. 
        // For this demo, let's flag it in the UI by updating the message or showing a toast.
        // Simplified: Just remove it or replace text
        setChatHistory(prev => ({
            ...prev,
            [contactId]: prev[contactId].map(m => m.id === tempMessage.id ? { ...m, text: '[Message removed by AI Moderator: Unsafe content detected]' } : m)
        }));
    }
  };

  const renderForum = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        {/* Left: Guidelines & Categories */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-2 text-blue-800 font-semibold">
              <ShieldCheck size={20} />
              <span>Community Guidelines</span>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              This is a safe space. Our AI Co-Pilot moderates all posts for bullying, hate speech, and toxicity.
              Be supportive and kind.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hidden lg:block">
            <h3 className="font-semibold text-slate-800 mb-3">Channels</h3>
            <div className="space-y-1">
              {['General', 'Academics', 'Career', 'Wellness'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat as any)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === cat ? 'bg-slate-100 font-medium text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  # {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder={`Share something in #${category}...`}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              rows={3}
            />
            {errorMsg && (
              <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <AlertTriangle size={12} /> {errorMsg}
              </div>
            )}
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                 <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-500">#{category}</span>
              </div>
              <button 
                onClick={handlePostSubmit}
                disabled={isSubmitting || !newPostContent.trim()}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all
                  ${isSubmitting ? 'bg-slate-300 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}
                `}
              >
                {isSubmitting ? 'Moderating...' : <><Send size={16} /> Post</>}
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.filter(p => p.category === category || category === 'General').map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{post.author}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">#{post.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center gap-4 border-t border-slate-50 pt-3">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-pink-500 transition-colors text-sm"
                  >
                    <Heart size={18} className={post.likes > 0 ? "fill-pink-50 text-pink-500" : ""} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors text-sm">
                    <MessageSquare size={18} />
                    <span>{post.replies.length} Replies</span>
                  </button>
                </div>

                {/* Replies Preview */}
                {post.replies.length > 0 && (
                  <div className="mt-4 bg-slate-50 p-3 rounded-lg space-y-2">
                    {post.replies.map(reply => (
                      <div key={reply.id} className="text-xs">
                        <span className="font-bold text-slate-700">{reply.author}: </span>
                        <span className="text-slate-600">{reply.content}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
  );

  const renderChat = () => (
      <div className="flex h-[calc(100vh-200px)] bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
          {/* Contacts List */}
          <div className={`${selectedContact ? 'hidden md:block' : 'w-full'} md:w-80 border-r border-slate-100 bg-slate-50 flex flex-col`}>
             <div className="p-4 border-b border-slate-200">
                 <h3 className="font-semibold text-slate-800">Messages</h3>
             </div>
             <div className="flex-1 overflow-y-auto">
                 {contacts.map(contact => (
                     <div 
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-colors ${selectedContact?.id === contact.id ? 'bg-white border-l-4 border-blue-500' : ''}`}
                     >
                         <div className="relative">
                             <img src={contact.avatar} className="w-10 h-10 rounded-full" alt={contact.name} />
                             {contact.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-50"></div>}
                         </div>
                         <div className="flex-1">
                             <p className="font-medium text-slate-800 text-sm">{contact.name}</p>
                             <p className="text-xs text-slate-500 truncate">{contact.major}</p>
                         </div>
                     </div>
                 ))}
             </div>
          </div>

          {/* Chat Window */}
          {selectedContact ? (
              <div className="flex-1 flex flex-col bg-white w-full">
                  <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                      <button onClick={() => setSelectedContact(null)} className="md:hidden text-slate-500">
                          <ArrowLeft size={20} />
                      </button>
                      <img src={selectedContact.avatar} className="w-8 h-8 rounded-full" alt={selectedContact.name} />
                      <div>
                          <p className="font-semibold text-slate-800 text-sm">{selectedContact.name}</p>
                          <p className="text-xs text-slate-500">{selectedContact.status === 'online' ? 'Active Now' : 'Offline'}</p>
                      </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                      {(chatHistory[selectedContact.id] || []).map(msg => (
                          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                                  msg.isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                              }`}>
                                  {msg.text}
                              </div>
                          </div>
                      ))}
                      <div ref={chatEndRef} />
                  </div>

                  <div className="p-4 border-t border-slate-100 bg-white">
                      <div className="flex gap-2">
                          <input 
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 p-2 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                          <button 
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
                          >
                              <Send size={18} />
                          </button>
                      </div>
                  </div>
              </div>
          ) : (
              <div className="hidden md:flex flex-1 items-center justify-center flex-col text-slate-400">
                  <MessageCircle size={48} className="mb-2 opacity-20" />
                  <p>Select a student to start chatting</p>
              </div>
          )}
      </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Community & Chat</h2>
          <p className="text-slate-500">Connect with peers, share experiences, and chat.</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-slate-200 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('forum')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'forum' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
            >
                Forum
            </button>
            <button 
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'chat' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}
            >
                Direct Chat
            </button>
        </div>
      </div>

      {activeTab === 'forum' ? renderForum() : renderChat()}
    </div>
  );
};

export default Community;
