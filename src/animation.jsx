export const pageAnimation = {
    start: {
        // opacity: 0,
        // y: 300,
        opacity: 1,
        y: 0,
    },
    end: {
        opacity: 1,
        y: 0,
        transition: {
            // duration: 1,
            when: "afterChildren",
            // staggerChildren: 0.25,
        },
    },
};

export const sliderContainer = {
    start: { opacity: 1 },
    end: { opacity: 1, transition: { staggerChildren: 0.1, ease: "easeOut" } },
};

export const slider = {
    start: {
        opacity: 1,
        y: 0,
        x: "-130%",
    },
    end: {
        opacity: 1,
        y: 0,
        x: "100%",
        transition: { ease: "easeOut", duration: 1 },
    },
};

export const fadeIn = {
    start: {
        opacity: 0,
        y: 300,
    },
    end: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1,
            duration: 1,
        },
    },
};
