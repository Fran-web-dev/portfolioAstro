import type { ReactNode } from "react"
import { motion } from "motion/react"

interface ScrollWrapperProps {
    children: ReactNode
    delay?: number
}

export const Wrapper = ({ children, delay = 0 }: ScrollWrapperProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{scale: 0.99}}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness:300, damping: 90, duration: 1, delay}}
            className="max-w-2xl mx-auto block"
        >
            {children}
        </motion.div>
    )
}
