package review.system.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.DocPosition;

public interface DocPositionRepository extends
		PagingAndSortingRepository<DocPosition, Long> {

}
