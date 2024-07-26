import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

const animations: Variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
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
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    );
}

export default AnimatedPage;
