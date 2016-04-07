package review.system.repository;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.Group;

public interface GroupRepository extends
		PagingAndSortingRepository<Group, Long> {

	public ArrayList<Group> findByUserId(Long uid);

}
