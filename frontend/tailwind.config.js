/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                script: ['"Playfair Display"', 'serif'],
                mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
            },
            colors: {
                background: '#0B0D10', // Deep neutral black
                surface: '#111318',    // Dark card bg
                border: '#1E293B',
                primary: '#F8FAFC',    // Bright white
                secondary: '#A1A1AA',  // Muted gray
                muted: '#6B7280',
                accent: '#22D3EE',
                gold: '#F0B36E',
                amber: {
                    500: '#F59E0B',
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.4s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
