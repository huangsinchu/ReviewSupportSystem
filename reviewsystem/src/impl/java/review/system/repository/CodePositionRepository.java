package review.system.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.CodePosition;

public interface CodePositionRepository extends
		PagingAndSortingRepository<CodePosition, Long> {

}
