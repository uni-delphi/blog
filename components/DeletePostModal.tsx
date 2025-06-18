"use client";

import React, { useEffect, useRef, useCallback } from "react";

type DeletePostModalProps = {
  postId: string;
  postTitle: string;
  user: any;
  onDelete: (postId: string) => void;
  onClose: () => void;
  open?: boolean;
};

const DeletePostModal = ({
  postId,
  postTitle,
  user,
  onDelete,
  onClose,
  open = false,
}: DeletePostModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleOutsideClick, handleKeyDown]);

  const handleConfirm = () => {
    onDelete(postId);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          ¿Eliminar post?
        </h2>
        <p className="mb-4">
          Estás por eliminar el post <strong>&quot;{postTitle}&quot;</strong>. Esta acción
          no se puede deshacer.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
