import { Injectable, signal } from '@angular/core';

export interface ModalData {
  isOpen: boolean;
  type: 'confirm' | 'error' | 'success';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  action?: () => void;           
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal = signal<ModalData>({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: '',
    confirmText: 'OK',
    cancelText: 'Annuler'
  });

  openDeleteList(listId: string, listName: string) {
    this.modal.set({
      isOpen: true,
      type: 'confirm',
      title: 'Supprimer la liste ?',
      message: `La liste "${listName}" et toutes ses tâches seront définitivement supprimées. Cette action est irréversible.`,
      confirmText: 'Oui, supprimer',
      cancelText: 'Annuler',
      action: () => {}, // sera géré dans le composant
      data: { type: 'delete-list', id: listId }
    });
  }

  openDeleteTask(taskId: string, taskDescription: string) {
    this.modal.set({
      isOpen: true,
      type: 'confirm',
      title: 'Supprimer la tâche ?',
      message: `Voulez-vous vraiment supprimer "${taskDescription}" ?`,
      confirmText: 'Oui, supprimer',
      cancelText: 'Annuler',
      data: { type: 'delete-task', id: taskId }
    });
  }

  showError(title: string, message: string) {
    this.modal.set({
      isOpen: true,
      type: 'error',
      title: title,
      message: message,
      confirmText: 'OK'
    });
  }

  showSuccess(title: string, message: string) {
    this.modal.set({
      isOpen: true,
      type: 'success',
      title: title,
      message: message,
      confirmText: 'OK'
    });
  }

  close() {
    this.modal.update(m => ({ ...m, isOpen: false }));
  }
}