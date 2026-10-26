import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  LuArrowDown,
  LuArrowUp,
  LuCornerDownLeft,
  LuPrinter,
  LuSearch,
} from "react-icons/lu";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";

interface Profile {
  network: string;
  username: string;
  url: string;
}

interface Action {
  id: string;
  title: string;
  icon: IconType;
  url?: string;
  handler?: () => void;
  /** Teclas que se muestran como chips */
  keys?: string[];
  /** Comprueba si un evento de teclado activa la acción */
  match?: (e: KeyboardEvent) => boolean;
}

interface Props {
  profiles: Profile[];
}

const NETWORK_ICONS: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  X: FaXTwitter,
};

const NETWORK_KEYS: Record<string, string> = {
  GitHub: "g",
  LinkedIn: "l",
  X: "x",
};

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="keyboard-kbd inline-flex h-5 min-w-5 items-center justify-center rounded border px-1.5 font-mono text-[10px] font-medium">
      {children}
    </kbd>
  );
}

const isMod = (e: KeyboardEvent) => e.ctrlKey || e.metaKey;
const isAltMod = (e: KeyboardEvent, key: string) =>
  isMod(e) && e.altKey && e.key.toLowerCase() === key;

export default function KeyboardManager({ profiles }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isMac =
    typeof navigator !== "undefined" &&
    /mac/i.test(navigator.platform || navigator.userAgent);
  const modKey = isMac ? "⌘" : "Ctrl";
  const altKey = isMac ? "⌥" : "Alt";

  const actions: Action[] = useMemo(
    () => [
      {
        id: "print",
        title: "Imprimir",
        icon: LuPrinter,
        handler: () => window.print(),
        keys: [modKey, "P"],
        match: (e) => isMod(e) && e.key.toLowerCase() === "p",
      },
      ...profiles.map((profile) => {
        const key = NETWORK_KEYS[profile.network];
        return {
          id: profile.network,
          title: `Visitar ${profile.network}`,
          icon: NETWORK_ICONS[profile.network] ?? LuSearch,
          url: profile.url,
          keys: key ? [modKey, altKey, key.toUpperCase()] : undefined,
          match: key ? (e: KeyboardEvent) => isAltMod(e, key) : undefined,
        };
      }),
    ],
    [profiles, modKey, altKey],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.title.toLowerCase().includes(q));
  }, [actions, query]);

  const runAction = useCallback((action: Action) => {
    setOpen(false);
    if (action.handler) {
      action.handler();
    } else if (action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isMod(e) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      const action = actions.find((a) => a.match?.(e));
      if (action && action.id !== "print") {
        e.preventDefault();
        runAction(action);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [actions, runAction]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const onPaletteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      runAction(filtered[selected]);
    }
  };

  return (
    <>
      <footer className="keyboard-hint no-print fixed bottom-0 w-full border-t py-2 text-center text-xs backdrop-blur-sm">
        Pulsa <Kbd>{modKey}</Kbd> + <Kbd>K</Kbd> para abrir la paleta de
        comandos.
      </footer>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="keyboard-overlay no-print fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh] backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="keyboard-panel w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onPaletteKeyDown}
            >
            <div className="keyboard-search flex items-center gap-3 border-b px-4">
              <LuSearch className="keyboard-muted size-4 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                placeholder="Buscar comando…"
                className="keyboard-input w-full py-3.5 text-sm outline-none"
              />
              <Kbd>Esc</Kbd>
            </div>

            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="keyboard-text px-3 py-6 text-center text-sm">
                  Sin resultados
                </li>
              )}
              {filtered.map((action, i) => {
                const Icon = action.icon;
                const active = i === selected;
                return (
                  <li key={action.id}>
                    <button
                      type="button"
                      onClick={() => runAction(action)}
                      onMouseEnter={() => setSelected(i)}
                      className={`keyboard-action flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        active
                          ? "is-active"
                          : ""
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`keyboard-icon flex size-7 items-center justify-center rounded-md border ${
                            active
                              ? "is-active"
                              : ""
                          }`}
                        >
                          <Icon className="size-3.5" />
                        </span>
                        <span className="font-medium">{action.title}</span>
                      </span>
                      {action.keys && (
                        <span className="flex items-center gap-1">
                          {action.keys.map((key) => (
                            <Kbd key={key}>{key}</Kbd>
                          ))}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="keyboard-footer flex items-center justify-between border-t px-4 py-2.5 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Kbd>
                  <LuArrowUp className="size-3" />
                </Kbd>
                <Kbd>
                  <LuArrowDown className="size-3" />
                </Kbd>
                Navegar
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>
                  <LuCornerDownLeft className="size-3" />
                </Kbd>
                Seleccionar
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>Esc</Kbd>
                Cerrar
              </span>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
