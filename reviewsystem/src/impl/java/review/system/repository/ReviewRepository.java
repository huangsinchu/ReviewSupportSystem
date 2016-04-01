package review.system.repository;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.Review;

public interface ReviewRepository extends
		PagingAndSortingRepository<Review, Long> {

	public ArrayList<Review> findByUserId(Long uid);

}
