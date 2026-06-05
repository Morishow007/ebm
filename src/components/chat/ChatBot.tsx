import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, RotateCcw, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import logotipo from '@/assets/images/logotipo.png'
import { cn } from '@/lib/utils'

import { chatNodes, type ChatOption } from './chatFlow'

interface Message {
  id: string
  from: 'bot' | 'user'
  text: string
}

function parseMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState('start')
  const [messages, setMessages] = useState<Message[]>([])
  const [hasNotification, setHasNotification] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const currentNode = chatNodes[currentNodeId]

  useEffect(() => {
    setMessages([{ id: 'bot-0', from: 'bot', text: chatNodes['start'].message }])
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleOption(option: ChatOption) {
    setHasNotification(false)

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
    setMessages([{ id: 'bot-reset', from: 'bot', text: chatNodes['start'].message }])
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
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="flex w-[340px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl sm:w-[380px]"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-black px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative rounded bg-white px-1.5 py-0.5">
                  <img src={logotipo} alt="EBM Engenharia" className="h-6 w-auto" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-black bg-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">EBM Engenharia</p>
                  <p className="text-xs text-zinc-400">Assistente virtual · Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reiniciar conversa"
                  className="rounded p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Reiniciar conversa"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Fechar chat"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 space-y-3 overflow-y-auto bg-zinc-50 p-4"
              style={{ minHeight: 260, maxHeight: 380 }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={cn('flex', msg.from === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.from === 'bot' && (
                    <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded bg-white border border-zinc-200 p-0.5">
                      <img src={logotipo} alt="" className="h-full w-auto object-contain" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                      msg.from === 'bot'
                        ? 'rounded-tl-sm bg-white text-zinc-800 shadow-sm ring-1 ring-zinc-100'
                        : 'rounded-tr-sm bg-zinc-900 text-white'
                    )}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}
                  />
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Options */}
            <div className="border-t border-zinc-100 bg-white p-3">
              <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                Escolha uma opção
              </p>
              <div className="flex max-h-[200px] flex-col gap-1.5 overflow-y-auto">
                {currentNode?.options.map((opt) => (
                  <button
                    key={opt.next + opt.label}
                    onClick={() => handleOption(opt)}
                    className="w-full rounded-lg border border-zinc-100 px-3 py-2 text-left text-sm text-zinc-700 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-zinc-900 active:bg-amber-100"
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
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-black shadow-lg transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
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
