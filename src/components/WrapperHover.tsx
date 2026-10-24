import type { ReactNode } from "react"
import { motion } from "motion/react"

interface WrapperHoverProp {
    children: ReactNode
}

export const WrapperHover = ({ children }: WrapperHoverProp) => {
    return (
        <motion.div whileHover={{ scale: 1.1, backgroundColor: "#facc15" }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            {children}
        </motion.div>
    )
}