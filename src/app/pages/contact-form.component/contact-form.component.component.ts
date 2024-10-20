import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../contact.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.component.html',
  styleUrl: './contact-form.component.component.css'
})
export class ContactFormComponent {
  @Input() selectedContact: Contact | null = null; // Input to receive selected contact data from the parent
  @Output() contactAdded = new EventEmitter<Contact>(); // Output to emit when a new contact is added
  @Output() contactUpdated = new EventEmitter<Contact>(); // Output to emit when a contact is updated
  @Output() contactDeleted = new EventEmitter<number>(); // Output to emit when a contact is deleted

  firstName?: string = '';
  lastName?: string = '';
  email?: string = '';

  ngOnChanges(): void {
    if (this.selectedContact) {
      this.firstName = this.selectedContact.firstName; 
      this.lastName = this.selectedContact.lastName;
      this.email = this.selectedContact.email;
    } else {
      this.resetForm(); // Reset fields if not editing
    }
  }

  onSubmit(): void {
    const contact: Contact = {
      id: this.selectedContact ? this.selectedContact.id : 0, // Use existing ID if editing
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };

    if (this.selectedContact) {
      this.contactUpdated.emit(contact); // Emit updated contact
    } else {
      this.contactAdded.emit(contact); // Emit new contact
    }

    this.resetForm(); // Reset form after submission
  }

  onDelete(): void {
    if (this.selectedContact) {
      this.contactDeleted.emit(this.selectedContact.id); // Emit the ID of the contact to delete
      this.resetForm(); // Reset form after deletion
    }
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.selectedContact = null;
  }
}