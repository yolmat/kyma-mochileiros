export const createInputStyle = (errors = {}) => {
    return (field, extraClasses = "") => `
    w-full p-3 rounded-xl border transition-all outline-none
    ${errors?.[field]
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-300 focus:ring-2 focus:ring-blue-300"
        }
    bg-white text-black
    dark:bg-gray-700 dark:text-white dark:border-gray-600
    ${extraClasses}
  `
        .replace(/\s+/g, " ")
        .trim();
};