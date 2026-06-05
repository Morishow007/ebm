import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, RotateCcw, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { chatNodes, type ChatOption } from './chatFlow'

interface Message {
  id: string
  from: 'bot' | 'user'
  text: string
}

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState('start')
  const [messages, setMessages] = useState<Message[]>([])
  const [hasNotification, setHasNotification] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const currentNode = chatNodes[currentNodeId]

  // Inicia a conversa com a saudação do primeiro nó
  useEffect(() => {
    setMessages([
      {
        id: 'bot-0',
        from: 'bot',
        text: chatNodes['start'].message,
      },
    ])
  }, [])

  // Auto-scroll ao receber nova mensagem
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleOption(option: ChatOption) {
    setHasNotification(false)

    // Adiciona a escolha do usuário ao histórico
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      from: 'user',
      text: option.label.replace(/^[\p{Emoji}\s]+/u, '').trim(),
    }

    const nextNode = chatNodes[option.next]
    const botMsg: Message = {
      id: `bot-${Date.now()}`,
      from: 'bot',
      text: nextNode.message,
    }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setCurrentNodeId(option.next)

    // Navegação interna ou link externo
    if (option.link) {
      if (option.external) {
        window.open(option.link, '_blank', 'noopener,noreferrer')
      } else {
        navigate(option.link)
        setIsOpen(false)
      }
    }
  }

  function handleReset() {
    setCurrentNodeId('start')
    setMessages([
      {
        id: 'bot-reset',
        from: 'bot',
        text: chatNodes['start'].message,
      },
    ])
  }

  function handleOpen() {
    setIsOpen(true)
    setHasNotification(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Janela do chat ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="flex w-[340px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl sm:w-[380px]"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-slate-950 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-slate-900 font-heading font-bold text-sm select-none">
                  EB
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">EBM Engenharia</p>
                  <p className="text-xs text-slate-400">Assistente virtual · Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reiniciar conversa"
                  className="rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                  aria-label="Reiniciar conversa"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                  aria-label="Fechar chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3" style={{ minHeight: 260, maxHeight: 380 }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'flex',
                    msg.from === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.from === 'bot' && (
                    <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400 text-slate-900 font-bold text-xs select-none">
                      EB
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                      msg.from === 'bot'
                        ? 'rounded-tl-sm bg-white text-slate-800 shadow-sm'
                        : 'rounded-tr-sm bg-slate-900 text-white'
                    )}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}
                  />
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Options */}
            <div className="border-t border-slate-100 bg-white p-3">
              <p className="mb-2 px-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Escolha uma opção
              </p>
              <div className="flex flex-col gap-1.5 max-h-[200px] overflow-y-auto pr-0.5">
                {currentNode?.options.map((opt) => (
                  <button
                    key={opt.next + opt.label}
                    onClick={() => handleOption(opt)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-slate-900 active:bg-amber-100"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Botão flutuante ────────────────────────────────────── */}
      <motion.button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-slate-900 shadow-lg transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        aria-label={isOpen ? 'Fechar assistente' : 'Abrir assistente virtual'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notificação */}
        {hasNotification && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
          >
            1
          </motion.span>
        )}
      </motion.button>
    </div>
  )
}
