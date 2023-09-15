import {create} from "zustand";
export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (moviedId: string) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  moviedId: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({isOpen: true, movieId}),
  closeModal: () => set({isOpen: false, movieId: undefined}),
}));

export default useInfoModal;
