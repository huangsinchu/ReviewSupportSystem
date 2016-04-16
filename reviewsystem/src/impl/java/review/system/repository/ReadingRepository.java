package review.system.repository;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.Reading;

public interface ReadingRepository extends
		PagingAndSortingRepository<Reading, Long> {

	public ArrayList<Reading> findByReviewId(Long reviewId);

}
