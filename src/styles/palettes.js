const COMMON_PALETTE = {
    warning: {
        // red
        main: "#ff0000",
    },
    success: {
        // green
        main: "#13a83a",
    },
    background: {
        // grey to black
        default: "#f5f5f5",
        dark: "#bababa",
        darker: "#242424",
        darkest: "black",
    },
    text: {
        darkBg: "white",
        lightBg: "black",
        faded: "#919191",
    },
    brandingWarm: {
        // orange
        main: "#EA7D4E",
    },
};

export const INDIANA_JONES_PALETTE = {
    ...COMMON_PALETTE,
    primary: {
        // orange
        main: "#DE8E49",
    },
    secondary: {
        // yellow
        main: "#EFC54D",
        light: "#EBD5A0",
        lightest: "#F9F5E3",
    },
    tertiary: {
        // brown
        dark: "#271811",
        main: "#54331D",
    },
    brandingWarm: {
        main: "#DE8E49",
    },
};

export const MATRIX_PALETTE = {
    ...COMMON_PALETTE,
    primary: {
        // Green-blue
        main: "#7B9A88",
        light: "#C1D6C6",
        lightest: "#DDEEF0",
        dark: "#60807B",
        darkest: "#1D2F2C",
    },
    secondary: {
        // Green-black
        dark: "#060406",
        main: "#0B1112",
        light: "#1D2F2C",
    },
    tertiary: {
        // Red
        main: "#841016",
    },
};

export const ALIEN_PALETTE = {
    ...COMMON_PALETTE,
    primary: {
        // Blue-green
        main: "#303E48",
        light: "#8694A5",
        lightest: "#B3BBBC",
        dark: "#07232C",
    },
    secondary: {
        // Almost black
        dark: "#010001",
        main: "#051211",
        light: "#192023",
    },
    tertiary: {
        // Burgundy-ish
        main: "#56363C",
        light: "#8F7978",
        dark: "#261B19",
    },
};

export const FURY_ROAD_PALETTE = {
    ...COMMON_PALETTE,
    primary: {
        // orange to brown
        main: "#5C2A08",
        dark: "#2E1712",
        light: "#E17811",
        lightest: "#EE8F49",
    },
    secondary: {
        // dark turquoise
        main: "#17383A",
        dark: "#3F4740",
        darkest: "#0F1217",
        light: "#0D646A",
    },
    tertiary: {
        // sand
        main: "#FFD1B5",
        dark: "#B98F73",
        light: "#fce3d4",
    },
};
