import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

const animations: Variants = {
    initial: { opacity: 0, x: 100, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -100, scale: 0.9 },
};

interface AnimatedPageProps {
    children: ReactNode;
}

function AnimatedPage({ children }: AnimatedPageProps) {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                duration: 2,
                ease: "easeOut",
                // Stagger children if needed
                staggerChildren: 0.3,
            }}
        >
            {children}
        </motion.div>
    );
}

export default AnimatedPage;
