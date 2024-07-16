import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from '../../Modal/Modal';
import { EditForm } from '../../EditForm/EditForm';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import { DeleteForm } from '../../DeleteForm/DeleteForm';
import { FcPortraitMode, FcInvite, FcCallback } from 'react-icons/fc';

export const ContactListItem = ({ filteredContact }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleEdit = () => setIsEditOpen(!isEditOpen);
  const toggleDelete = () => setIsDeleteOpen(!isDeleteOpen);

  return (
    <li className={css.contactListItem}>
      <div className={css.contactDetails}>
        <p>
          <FcPortraitMode />
          &nbsp;&nbsp;{filteredContact.name}
        </p>
        <p>
          <FcInvite />
          &nbsp;&nbsp;{filteredContact.phone}
        </p>
        <p>
          <FcCallback />
          &nbsp;&nbsp;{filteredContact.email}
        </p>
      </div>
      <div className={css.contactButtons}>
        <FaUserEdit className={css.editButton} onClick={toggleEdit} />
        <FaTrashAlt className={css.deleteButton} onClick={toggleDelete} />
      </div>
      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={toggleEdit}
        component={EditForm}
        modalTitle='Edit a Contact'
        filteredContact={filteredContact}
      />

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={toggleDelete}
        component={DeleteForm}
        modalTitle='Are you sure you want to delete this Contact?'
        filteredContact={filteredContact}
      />
    </li>
  );
};

ContactListItem.propTypes = {
  filteredContact: PropTypes.object.isRequired,
};
