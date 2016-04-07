package review.system.repository;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.Contact;

public interface ContactRepository extends
		PagingAndSortingRepository<Contact, Long> {

	public ArrayList<Contact> findByGroupId(Long groupId);

	public ArrayList<Contact> findByContactIdAndGroupId(Long contactId,
			Long groupId);

}
