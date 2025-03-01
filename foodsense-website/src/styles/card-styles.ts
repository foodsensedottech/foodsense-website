export const cardStyles = {
  base: `
    bg-white dark:bg-white/10
    backdrop-blur-sm 
    rounded-xl 
    border border-neutral-200/50 dark:border-white/10
    shadow-sm
    transform
    transition-all
    duration-300
    ease-in-out
    cursor-pointer
    hover:shadow-[0_8px_40px_rgba(241,193,0,0.25)]
    hover:border-primary/50
    hover:-translate-y-2
    hover:scale-102
    active:scale-98
    active:translate-y-0
  `,
  hover: `
    group
    hover:bg-white
    dark:hover:bg-white/10
  `,
  content: {
    title:
      "text-xl font-semibold mb-4 text-secondary group-hover:text-primary/90",
    text: "text-neutral-600 leading-relaxed",
    icon: "text-primary w-8 h-8 mb-4 transition-transform group-hover:scale-110",
  },
};
