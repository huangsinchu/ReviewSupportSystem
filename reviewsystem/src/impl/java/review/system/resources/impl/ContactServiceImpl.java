package review.system.resources.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.ContactService;
import review.system.entity.Contact;
import review.system.repository.ContactRepository;

public class ContactServiceImpl implements ContactService {

	@Autowired
	private ContactRepository contactRepository;

	@Override
	public Contact getContact(Long id) {
		return contactRepository.findOne(id);
	}

	@Override
	public ArrayList<Contact> getContactByGroup(Long groupId) {
		return contactRepository.findByGroupId(groupId);
	}

	@Override
	public void createContact(Contact contact) {
		contactRepository.save(contact);
	}
}
