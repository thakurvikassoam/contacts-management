import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../contact.model';
import { ContactService } from '../../contact.service';
import { ContactFormComponent } from '../contact-form.component/contact-form.component.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe,ContactFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrected typo
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact | null = null; // To hold the currently selected contact
  isEdit: any;

  constructor(private readonly contactService: ContactService) {}

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });
  }

  onContactSelected(contact: Contact): void {
    this.selectedContact = contact;
    this.contactService.updateContact(contact).subscribe(
      (response) => {
        this.onContactUpdated(response);
        console.log('Contact updated successfully:', response);
      },
      (error) => {
        console.error('Error updating contact:', error);
      }
    );
    
  }

  onContactAdded(newContact: Contact): void {
    this.contactService.addContact(newContact).subscribe(
      (response) => {
        this.onContactAdded(response);
        console.log('Contact added successfully:', response);
      },
      (error) => {
        console.error('Error adding contact:', error);
      }
    );
    //this.contacts.push(newContact); // Add new contact to the list
  }
  onSubmit(): void {
    const contactData: Contact = {
      id: this.isEdit ? this.selectedContact?.id : undefined, 
      firstName: this.selectedContact?.firstName ,
      lastName: this.selectedContact?.lastName,
      email: this.selectedContact?.email,
    };

    if (this.isEdit) {
      // Update existing contact
      this.contactService.updateContact(contactData).subscribe(
        (response) => {
          this.onContactUpdated(response);
          console.log('Contact updated successfully:', response);
        },
        (error) => {
          console.error('Error updating contact:', error);
        }
      );
    } else {
      // Add new contact
      this.contactService.addContact(contactData).subscribe(
        (response) => {
          this.onContactAdded(response);
          console.log('Contact added successfully:', response);
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
    }
  }


  onContactUpdated(updatedContact: Contact): void {
    this.contactService.updateContact(updatedContact).subscribe(
      (response: Contact) => {
        this.onContactUpdated(response);
        console.log('Contact updated successfully:', response);
      },
      (error: any) => {
        console.error('Error updating contact:', error);
      }
    );
  }

  onContactDeleted(contactId: number): void {
    if (contactId !== undefined) { // Check if id is defined before deletion
      this.contactService.deleteContact(contactId).subscribe(
        () => {
          this.onContactDeleted(contactId);
          console.log('Contact deleted successfully');
        },
        (error: any) => {
          console.error('Error deleting contact:', error);
        }
      );
    } else {
      console.error('Cannot delete contact. ID is undefined.');
    }
  }

}
