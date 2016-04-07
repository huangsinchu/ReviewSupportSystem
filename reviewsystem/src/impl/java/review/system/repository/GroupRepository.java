package review.system.repository;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.ContactGroup;

public interface GroupRepository extends
		PagingAndSortingRepository<ContactGroup, Long> {

	public ArrayList<ContactGroup> findByUserId(Long uid);

}
