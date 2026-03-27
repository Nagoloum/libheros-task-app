import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { ListsService } from '../../../services/lists.service';
import { TasksService } from '../../../services/tasks.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './confirm-modal.html',
})
export class ConfirmModalComponent {
  private modalService = inject(ModalService);
  private listsService = inject(ListsService);
  private tasksService = inject(TasksService);

  modal = this.modalService.modal;

  confirm() {
    const current = this.modal();
    if (!current.isOpen) return;

    if (current.type === 'confirm' && current.data) {
      if (current.data.type === 'delete-list') {
        this.listsService.delete(current.data.id).subscribe({
          next: () => {
            this.modalService.showSuccess('Succès', 'Liste supprimée avec succès');
            setTimeout(() => window.location.reload(), 1500);
          },
          error: (err) =>
            this.modalService.showError(
              'Erreur',
              err.error?.message || 'Impossible de supprimer la liste',
            ),
        });
      } else if (current.data.type === 'delete-task') {
        this.tasksService.delete(current.data.id).subscribe({
          next: () => {
            this.modalService.showSuccess('Succès', 'Tâche supprimée');
            setTimeout(() => window.location.reload(), 1200);
          },
          error: (err) =>
            this.modalService.showError(
              'Erreur',
              err.error?.message || 'Impossible de supprimer la tâche',
            ),
        });
      }
    }
    this.modalService.close();
  }

  closeModal() {
    this.modalService.close();
  }
}
