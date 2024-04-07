import { Contact } from "@prisma/client";
import ContactItem from "./contact-item";

interface ContactsListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  contacts?: Contact[];
}

const ContactsList: React.FC<ContactsListProps> = ({ contacts }) => {
  if (!contacts) {
    return null;
  }
  return (
    <div className="flex flex-col gap-3">
      <h2>Контакты</h2>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          phone={contact.phone}
          name={contact.name}
          mail={contact.mail}
          comment={contact.comment}
          contactId={contact.id}
        />
      ))}
    </div>
  );
};

export default ContactsList;
