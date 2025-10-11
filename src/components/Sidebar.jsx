// Sidebar.js
export default function Sidebar({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 flex justify-end bg-black/10 backdrop-blur-[1px] z-50">
      <div className="w-full sm:w-[400px] h-full bg-white shadow-lg relative flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-black">
          <h2 className="text-lg font-semibold text-white w-full text-center font-sans">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl absolute right-4 top-3"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
