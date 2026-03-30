import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "chats" | "contacts" | "search" | "notifications" | "profile" | "settings";

const MOCK_CHATS = [
  {
    id: 1, name: "Команда Youki", avatar: "🚀", isGroup: true, isCommunity: false,
    lastMsg: "Артём: Да, завтра в 10 встречаемся", time: "14:32", unread: 3,
    online: false, color: "from-purple-600 to-pink-500"
  },
  {
    id: 2, name: "Алина Морозова", avatar: "🌸", isGroup: false, isCommunity: false,
    lastMsg: "Ок, увидимся вечером! 😊", time: "13:01", unread: 1,
    online: true, color: "from-pink-500 to-orange-400"
  },
  {
    id: 3, name: "Design Space", avatar: "🎨", isGroup: false, isCommunity: true,
    lastMsg: "Новый пост: Тренды UI 2026", time: "12:45", unread: 12,
    online: false, color: "from-cyan-500 to-blue-500"
  },
  {
    id: 4, name: "Михаил Волков", avatar: "🦊", isGroup: false, isCommunity: false,
    lastMsg: "Отправил файл с макетами", time: "11:20", unread: 0,
    online: true, color: "from-orange-500 to-yellow-400"
  },
  {
    id: 5, name: "Tech Insider", avatar: "⚡", isGroup: false, isCommunity: true,
    lastMsg: "Apple анонсировала новые чипы", time: "10:58", unread: 5,
    online: false, color: "from-yellow-400 to-green-400"
  },
  {
    id: 6, name: "Вечеринка 🎉", avatar: "🎉", isGroup: true, isCommunity: false,
    lastMsg: "Катя: Не забудьте торт!", time: "вчера", unread: 0,
    online: false, color: "from-green-400 to-cyan-500"
  },
  {
    id: 7, name: "Соня Белова", avatar: "✨", isGroup: false, isCommunity: false,
    lastMsg: "Спасибо за помощь!", time: "вчера", unread: 0,
    online: false, color: "from-violet-500 to-purple-600"
  },
];

const MOCK_MESSAGES: Record<number, { id: number; text: string; out: boolean; time: string; status?: string }[]> = {
  1: [
    { id: 1, text: "Привет всем! Когда встречаемся?", out: false, time: "14:10" },
    { id: 2, text: "Завтра в 10 подойдёт?", out: true, time: "14:15", status: "read" },
    { id: 3, text: "Артём: Да, завтра в 10 встречаемся", out: false, time: "14:32" },
  ],
  2: [
    { id: 1, text: "Привет! Как дела?", out: false, time: "12:50" },
    { id: 2, text: "Всё отлично, как у тебя?", out: true, time: "12:52", status: "read" },
    { id: 3, text: "Ок, увидимся вечером! 😊", out: false, time: "13:01" },
  ],
  4: [
    { id: 1, text: "Привет! Скинь макеты когда будут готовы", out: true, time: "11:00", status: "read" },
    { id: 2, text: "Сейчас пришлю", out: false, time: "11:10" },
    { id: 3, text: "Отправил файл с макетами", out: false, time: "11:20" },
  ],
};

const MOCK_CONTACTS = [
  { id: 1, name: "Алина Морозова", status: "В сети", online: true, avatar: "🌸", color: "from-pink-500 to-orange-400" },
  { id: 2, name: "Артём Крылов", status: "Был час назад", online: false, avatar: "🦁", color: "from-orange-500 to-red-500" },
  { id: 3, name: "Михаил Волков", status: "В сети", online: true, avatar: "🦊", color: "from-orange-500 to-yellow-400" },
  { id: 4, name: "Катя Снегирёва", status: "Не беспокоить", online: false, avatar: "🦋", color: "from-purple-500 to-pink-500" },
  { id: 5, name: "Соня Белова", status: "Была вчера", online: false, avatar: "✨", color: "from-violet-500 to-purple-600" },
  { id: 6, name: "Денис Орлов", status: "В сети", online: true, avatar: "🦅", color: "from-cyan-500 to-blue-500" },
];

const MOCK_COMMUNITIES = [
  { id: 1, name: "Design Space", members: "12.4K", avatar: "🎨", color: "from-cyan-500 to-blue-500" },
  { id: 2, name: "Tech Insider", members: "89.2K", avatar: "⚡", color: "from-yellow-400 to-green-400" },
  { id: 3, name: "Youki Official", members: "256K", avatar: "🚀", color: "from-purple-600 to-pink-500" },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, text: "Алина Морозова написала вам", time: "14:32", emoji: "💬", read: false },
  { id: 2, text: "Вас добавили в группу «Вечеринка 🎉»", time: "13:01", emoji: "👥", read: false },
  { id: 3, text: "Design Space: новый пост", time: "12:45", emoji: "📣", read: false },
  { id: 4, text: "Михаил Волков отметил вас в сообщении", time: "вчера", emoji: "🔔", read: true },
  { id: 5, text: "Артём Крылов принял запрос в друзья", time: "вчера", emoji: "✅", read: true },
];

function AvatarCircle({ emoji, color, size = "md", online = false }: {
  emoji: string; color: string; size?: "sm" | "md" | "lg"; online?: boolean
}) {
  const sizes = { sm: "w-9 h-9 text-lg", md: "w-12 h-12 text-2xl", lg: "w-16 h-16 text-3xl" };
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizes[size]} rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <span>{emoji}</span>
      </div>
      {online && <span className="online-dot absolute -bottom-0.5 -right-0.5" />}
    </div>
  );
}

function ChatsSection({ onOpenChat }: { onOpenChat: (chat: typeof MOCK_CHATS[0]) => void }) {
  const communities = MOCK_CHATS.filter(c => c.isCommunity);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold gradient-text">Youki</h1>
          <button className="w-9 h-9 rounded-2xl glass flex items-center justify-center hover:bg-[hsl(var(--youki-purple)/0.15)] transition-colors">
            <Icon name="Edit3" size={18} className="text-[hsl(var(--youki-purple))]" />
          </button>
        </div>
        <div className="glass rounded-2xl flex items-center gap-3 px-4 py-3">
          <Icon name="Search" size={16} className="text-[hsl(var(--muted-foreground))]" />
          <input placeholder="Поиск" className="bg-transparent text-sm w-full outline-none placeholder:text-[hsl(var(--muted-foreground))]" readOnly />
        </div>
      </div>

      {communities.length > 0 && (
        <div className="px-4 mb-4">
          <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Сообщества</p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {communities.map(c => (
              <button key={c.id} onClick={() => onOpenChat(c)}
                className="flex flex-col items-center gap-1.5 min-w-[60px] group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform relative`}>
                  <span>{c.avatar}</span>
                  {c.unread > 0 && (
                    <span className="badge-count absolute -top-1 -right-1">{c.unread}</span>
                  )}
                </div>
                <span className="text-[10px] text-[hsl(var(--muted-foreground))] truncate w-full text-center">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2">
        {MOCK_CHATS.filter(c => !c.isCommunity).map((chat, i) => (
          <button key={chat.id} onClick={() => onOpenChat(chat)}
            style={{ animationDelay: `${i * 50}ms` }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-[hsl(var(--youki-glass))] transition-all duration-150 text-left animate-fade-in">
            <AvatarCircle emoji={chat.avatar} color={chat.color} online={chat.online} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-sm truncate flex items-center gap-1.5">
                  {chat.name}
                  {chat.isGroup && <Icon name="Users" size={12} className="text-[hsl(var(--youki-purple))] flex-shrink-0" />}
                </span>
                <span className="text-[11px] text-[hsl(var(--muted-foreground))] flex-shrink-0">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span className="text-xs text-[hsl(var(--muted-foreground))] truncate">{chat.lastMsg}</span>
                {chat.unread > 0 && <span className="badge-count flex-shrink-0">{chat.unread}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatView({ chat, onBack }: { chat: typeof MOCK_CHATS[0]; onBack: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES[chat.id] || [
    { id: 1, text: `Это начало чата с ${chat.name}`, out: false, time: "сейчас" }
  ]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), text: input.trim(), out: true,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      status: "sent"
    }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full animate-slide-up">
      <div className="glass border-b border-[hsl(var(--border))] px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-xl glass flex items-center justify-center hover:bg-[hsl(var(--youki-purple)/0.15)] transition-colors mr-1">
          <Icon name="ChevronLeft" size={20} className="text-[hsl(var(--youki-purple))]" />
        </button>
        <AvatarCircle emoji={chat.avatar} color={chat.color} size="sm" online={chat.online} />
        <div className="flex-1">
          <p className="font-semibold text-sm">{chat.name}</p>
          <p className="text-xs">
            {chat.online
              ? <span className="text-[hsl(var(--youki-green))]">в сети</span>
              : <span className="text-[hsl(var(--muted-foreground))]">не в сети</span>}
          </p>
        </div>
        <button className="w-8 h-8 rounded-xl glass flex items-center justify-center">
          <Icon name="Phone" size={16} className="text-[hsl(var(--youki-cyan))]" />
        </button>
        <button className="w-8 h-8 rounded-xl glass flex items-center justify-center">
          <Icon name="MoreVertical" size={16} className="text-[hsl(var(--muted-foreground))]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {messages.map((msg, i) => (
          <div key={msg.id} style={{ animationDelay: `${i * 30}ms` }}
            className={`animate-fade-in flex ${msg.out ? "justify-end" : "justify-start"} mb-1`}>
            <div className={`max-w-[75%] px-4 py-2.5 ${msg.out ? "msg-bubble-out text-white" : "msg-bubble-in"}`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <div className={`flex items-center gap-1 mt-1 ${msg.out ? "justify-end" : "justify-start"}`}>
                <span className="text-[10px] opacity-60">{msg.time}</span>
                {msg.out && msg.status === "read" && (
                  <Icon name="CheckCheck" size={12} className="text-[hsl(var(--youki-cyan))] opacity-80" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-start">
          <div className="msg-bubble-in px-4 py-3 flex items-center gap-1.5">
            {[0, 1, 2].map(i => (
              <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-[hsl(var(--muted-foreground))] block" />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 glass border-t border-[hsl(var(--border))]">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0">
            <Icon name="Paperclip" size={16} className="text-[hsl(var(--muted-foreground))]" />
          </button>
          <div className="flex-1 glass rounded-2xl flex items-center gap-2 px-4 py-2.5">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Сообщение..."
              className="bg-transparent text-sm w-full outline-none placeholder:text-[hsl(var(--muted-foreground))]"
            />
            <Icon name="Smile" size={16} className="text-[hsl(var(--muted-foreground))] flex-shrink-0" />
          </div>
          <button onClick={send}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
            style={{ background: "linear-gradient(135deg, hsl(var(--youki-purple)), hsl(var(--youki-cyan)))" }}>
            <Icon name="Send" size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactsSection() {
  const online = MOCK_CONTACTS.filter(c => c.online);
  const offline = MOCK_CONTACTS.filter(c => !c.online);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Контакты</h2>
          <button className="w-9 h-9 rounded-2xl glass flex items-center justify-center hover:bg-[hsl(var(--youki-purple)/0.15)] transition-colors">
            <Icon name="UserPlus" size={16} className="text-[hsl(var(--youki-purple))]" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-[hsl(var(--youki-green))] uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--youki-green))] inline-block animate-pulse-glow" />
            В сети — {online.length}
          </p>
        </div>
        {online.map((c, i) => (
          <div key={c.id} style={{ animationDelay: `${i * 50}ms` }}
            className="animate-fade-in flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-[hsl(var(--youki-glass))] transition-all cursor-pointer">
            <AvatarCircle emoji={c.avatar} color={c.color} online={c.online} />
            <div className="flex-1">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-[hsl(var(--youki-green))]">{c.status}</p>
            </div>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-xl glass flex items-center justify-center">
                <Icon name="MessageCircle" size={14} className="text-[hsl(var(--youki-purple))]" />
              </button>
              <button className="w-8 h-8 rounded-xl glass flex items-center justify-center">
                <Icon name="Phone" size={14} className="text-[hsl(var(--youki-cyan))]" />
              </button>
            </div>
          </div>
        ))}
        <div className="px-3 mt-4 mb-2">
          <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Не в сети</p>
        </div>
        {offline.map((c, i) => (
          <div key={c.id} style={{ animationDelay: `${(online.length + i) * 50}ms` }}
            className="animate-fade-in flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-[hsl(var(--youki-glass))] transition-all cursor-pointer">
            <AvatarCircle emoji={c.avatar} color={c.color} online={false} />
            <div className="flex-1">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{c.status}</p>
            </div>
            <button className="w-8 h-8 rounded-xl glass flex items-center justify-center">
              <Icon name="MessageCircle" size={14} className="text-[hsl(var(--muted-foreground))]" />
            </button>
          </div>
        ))}
        <div className="px-3 mt-6 mb-2">
          <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Сообщества</p>
        </div>
        {MOCK_COMMUNITIES.map((c, i) => (
          <div key={c.id} style={{ animationDelay: `${(MOCK_CONTACTS.length + i) * 50}ms` }}
            className="animate-fade-in flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-[hsl(var(--youki-glass))] transition-all cursor-pointer mb-1">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
              <span>{c.avatar}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{c.members} участников</p>
            </div>
            <button className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={{ background: "hsl(var(--youki-purple)/0.15)", color: "hsl(var(--youki-purple))" }}>
              Вступить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchSection() {
  const [query, setQuery] = useState("");
  const all = [...MOCK_CHATS, ...MOCK_CONTACTS.map(c => ({ ...c, isGroup: false, isCommunity: false, lastMsg: "", time: "", unread: 0 }))];
  const filtered = query.length > 1 ? all.filter(c => c.name.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-4">
        <h2 className="text-xl font-bold mb-4">Поиск</h2>
        <div className="glass rounded-2xl flex items-center gap-3 px-4 py-3">
          <Icon name="Search" size={16} className="text-[hsl(var(--youki-purple))]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Люди, чаты, сообщества..."
            className="bg-transparent text-sm w-full outline-none placeholder:text-[hsl(var(--muted-foreground))]"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <Icon name="X" size={14} className="text-[hsl(var(--muted-foreground))]" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {!query && (
          <div className="px-2">
            <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3 px-2">Популярные сообщества</p>
            {MOCK_COMMUNITIES.map(c => (
              <div key={c.id}
                className="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-[hsl(var(--youki-glass))] transition-all cursor-pointer mb-1">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                  <span>{c.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{c.members} участников</p>
                </div>
                <Icon name="TrendingUp" size={16} className="text-[hsl(var(--youki-cyan))]" />
              </div>
            ))}
          </div>
        )}
        {query && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <p className="font-semibold text-[hsl(var(--muted-foreground))]">Ничего не найдено</p>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Попробуйте другой запрос</p>
          </div>
        )}
        {query && filtered.map((item, i) => (
          <div key={`${item.id}-${i}`} style={{ animationDelay: `${i * 40}ms` }}
            className="animate-fade-in flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-[hsl(var(--youki-glass))] transition-all cursor-pointer mb-1">
            <AvatarCircle emoji={item.avatar} color={item.color} />
            <div>
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                {item.isGroup ? "Группа" : item.isCommunity ? "Сообщество" : "Контакт"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsSection() {
  const [notes, setNotes] = useState(MOCK_NOTIFICATIONS);
  const unread = notes.filter(n => !n.read).length;

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Уведомления
            {unread > 0 && <span className="badge-count">{unread}</span>}
          </h2>
          {unread > 0 && (
            <button onClick={() => setNotes(prev => prev.map(n => ({ ...n, read: true })))}
              className="text-xs font-medium hover:opacity-80 transition-opacity"
              style={{ color: "hsl(var(--youki-purple))" }}>
              Прочитать все
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {notes.map((n, i) => (
          <div key={n.id} style={{ animationDelay: `${i * 50}ms` }}
            onClick={() => setNotes(prev => prev.map(nn => nn.id === n.id ? { ...nn, read: true } : nn))}
            className={`animate-fade-in flex items-center gap-3 px-3 py-3.5 rounded-2xl transition-all cursor-pointer mb-1 ${!n.read ? "bg-[hsl(var(--youki-purple)/0.08)]" : "hover:bg-[hsl(var(--youki-glass))]"}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${!n.read ? "glass neon-purple" : "glass"}`}>
              {n.emoji}
            </div>
            <div className="flex-1">
              <p className={`text-sm ${!n.read ? "font-semibold" : "text-[hsl(var(--muted-foreground))]"}`}>{n.text}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{n.time}</p>
            </div>
            {!n.read && (
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "hsl(var(--youki-purple))" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileSection() {
  const [bio, setBio] = useState("Привет! Я использую Youki 🚀");
  const [editingBio, setEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState(bio);

  const saveBio = () => {
    setBio(bioDraft.trim() || bio);
    setEditingBio(false);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-4">
        <h2 className="text-xl font-bold">Профиль</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <div className="glass rounded-3xl p-6 mb-4 flex flex-col items-center text-center">
          <div className="avatar-ring mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-4xl">
              👤
            </div>
          </div>
          <h3 className="text-xl font-bold">Ваше Имя</h3>
          <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>@username</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--youki-green))] animate-pulse-glow" />
            <span className="text-xs" style={{ color: "hsl(var(--youki-green))" }}>В сети</span>
          </div>
          <div className="flex gap-4 mt-5 w-full">
            {[["156", "Чатов"], ["48", "Контактов"], ["3", "Сообществ"]].map(([val, label]) => (
              <div key={label} className="flex-1 glass rounded-2xl py-3 text-center">
                <p className="font-bold text-lg gradient-text">{val}</p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg glass flex items-center justify-center flex-shrink-0">
                <Icon name="FileText" size={14} style={{ color: "hsl(var(--youki-purple))" }} />
              </div>
              <span className="text-sm font-semibold">О себе</span>
            </div>
            <button
              onClick={() => { setEditingBio(true); setBioDraft(bio); }}
              className="w-7 h-7 rounded-lg glass flex items-center justify-center hover:bg-[hsl(var(--youki-purple)/0.15)] transition-colors"
            >
              <Icon name="Pencil" size={13} style={{ color: "hsl(var(--youki-purple))" }} />
            </button>
          </div>
          {editingBio ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={bioDraft}
                onChange={e => setBioDraft(e.target.value)}
                maxLength={200}
                rows={3}
                autoFocus
                className="w-full bg-transparent text-sm outline-none resize-none placeholder:text-[hsl(var(--muted-foreground))] border border-[hsl(var(--youki-purple)/0.3)] rounded-xl px-3 py-2 focus:border-[hsl(var(--youki-purple)/0.7)] transition-colors"
                placeholder="Расскажи о себе..."
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px]" style={{ color: "hsl(var(--muted-foreground))" }}>{bioDraft.length}/200</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingBio(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium glass hover:bg-[hsl(var(--youki-glass))] transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={saveBio}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                    style={{ background: "hsl(var(--youki-purple))", color: "#fff" }}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{bio}</p>
          )}
        </div>

        {[
          { icon: "User", label: "Редактировать профиль", colorVar: "--youki-purple" },
          { icon: "Link", label: "Моя ссылка: youki.me/me", colorVar: "--youki-cyan" },
          { icon: "Star", label: "Premium подписка", colorVar: "--youki-orange" },
          { icon: "Shield", label: "Конфиденциальность", colorVar: "--youki-green" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-[hsl(var(--youki-glass))] transition-all cursor-pointer mb-1">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0">
              <Icon name={item.icon} size={18} style={{ color: `hsl(var(${item.colorVar}))` }} />
            </div>
            <span className="text-sm font-medium flex-1">{item.label}</span>
            <Icon name="ChevronRight" size={16} style={{ color: "hsl(var(--muted-foreground))" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  const [toggles, setToggles] = useState({ notifications: true, sounds: true, readReceipts: true });

  const groups = [
    {
      label: "Аккаунт",
      items: [
        { icon: "User", label: "Данные профиля", colorVar: "--youki-purple", arrow: true },
        { icon: "Lock", label: "Безопасность", colorVar: "--youki-cyan", arrow: true },
        { icon: "Smartphone", label: "Устройства", colorVar: "--youki-green", arrow: true },
      ]
    },
    {
      label: "Уведомления",
      items: [
        { icon: "Bell", label: "Push-уведомления", colorVar: "--youki-orange", toggleKey: "notifications" as const },
        { icon: "Volume2", label: "Звуки", colorVar: "--youki-pink", toggleKey: "sounds" as const },
        { icon: "Eye", label: "Подтверждение прочтения", colorVar: "--youki-cyan", toggleKey: "readReceipts" as const },
      ]
    },
    {
      label: "Прочее",
      items: [
        { icon: "HelpCircle", label: "Поддержка", colorVar: "--youki-purple", arrow: true },
        { icon: "Info", label: "О приложении", colorVar: "--muted-foreground", arrow: true },
        { icon: "LogOut", label: "Выйти", colorVar: "--destructive", arrow: false },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-4 pt-5 pb-4">
        <h2 className="text-xl font-bold">Настройки</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {groups.map(group => (
          <div key={group.label}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ color: "hsl(var(--muted-foreground))" }}>{group.label}</p>
            <div className="glass rounded-3xl overflow-hidden">
              {group.items.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-[hsl(var(--youki-glass)/0.5)] transition-all cursor-pointer">
                    <div className="w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={16} style={{ color: `hsl(var(${item.colorVar}))` }} />
                    </div>
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {item.toggleKey && (
                      <button
                        onClick={() => setToggles(prev => ({ ...prev, [item.toggleKey]: !prev[item.toggleKey] }))}
                        className="w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0"
                        style={toggles[item.toggleKey]
                          ? { background: "linear-gradient(135deg, hsl(var(--youki-purple)), hsl(var(--youki-cyan)))" }
                          : { background: "hsl(var(--border))" }}>
                        <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-sm ${toggles[item.toggleKey] ? "left-[calc(100%-22px)]" : "left-0.5"}`} />
                      </button>
                    )}
                    {item.arrow !== undefined && item.arrow && (
                      <Icon name="ChevronRight" size={16} style={{ color: "hsl(var(--muted-foreground))" }} />
                    )}
                  </div>
                  {i < group.items.length - 1 && <div className="mx-4 h-px bg-[hsl(var(--border))]" />}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xl flex-shrink-0">
            🚀
          </div>
          <div>
            <p className="font-bold text-sm gradient-text">Youki v1.0</p>
            <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Первая версия мессенджера</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [section, setSection] = useState<Section>("chats");
  const [openChat, setOpenChat] = useState<typeof MOCK_CHATS[0] | null>(null);

  const totalUnread = MOCK_CHATS.reduce((s, c) => s + (c.unread || 0), 0);
  const totalNotifs = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  const navItems: { id: Section; icon: string; label: string; badge?: number }[] = [
    { id: "chats", icon: "MessageCircle", label: "Чаты", badge: totalUnread },
    { id: "contacts", icon: "Users", label: "Люди" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "notifications", icon: "Bell", label: "События", badge: totalNotifs },
    { id: "profile", icon: "User", label: "Я" },
    { id: "settings", icon: "Settings", label: "Опции" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-0 md:p-4">
      <div className="w-full md:max-w-sm h-screen md:h-[780px] glass md:rounded-[32px] flex flex-col overflow-hidden"
        style={{ boxShadow: "0 0 60px hsl(var(--youki-purple)/0.2), 0 25px 60px rgba(0,0,0,0.4)" }}>

        {openChat ? (
          <ChatView chat={openChat} onBack={() => setOpenChat(null)} />
        ) : (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-hidden">
              {section === "chats" && <ChatsSection onOpenChat={setOpenChat} />}
              {section === "contacts" && <ContactsSection />}
              {section === "search" && <SearchSection />}
              {section === "notifications" && <NotificationsSection />}
              {section === "profile" && <ProfileSection />}
              {section === "settings" && <SettingsSection />}
            </div>
          </div>
        )}

        <nav className="glass border-t border-[hsl(var(--border))] px-1 py-1.5 flex-shrink-0">
          <div className="flex items-center justify-around">
            {navItems.map(item => (
              <button key={item.id}
                onClick={() => { setSection(item.id); setOpenChat(null); }}
                className={`nav-item flex-1 relative ${section === item.id && !openChat ? "active" : ""}`}>
                <div className="nav-icon relative inline-block">
                  <Icon name={item.icon} size={21} />
                  {item.badge && item.badge > 0 ? (
                    <span className="badge-count absolute -top-2 -right-2">{item.badge > 99 ? "99+" : item.badge}</span>
                  ) : null}
                </div>
                <span className="text-[10px] leading-none">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}