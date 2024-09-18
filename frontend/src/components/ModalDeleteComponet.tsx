function ModalDeleteComponet({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto p-6 relative z-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Deseja excluir?
        </h2>
        <p className="text-gray-600 mb-6">O usuário será excluido.</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
            onClick={onClose}
          >
            Não
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            onClick={onDelete}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteComponet;
