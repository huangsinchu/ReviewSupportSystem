package review.system.repository;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.Deficiency;

public interface DeficiencyRepository extends
		PagingAndSortingRepository<Deficiency, Long> {

	public ArrayList<Deficiency> findByReviewId(Long reviewId);

	public ArrayList<Deficiency> findByUserId(Long uid);

	public ArrayList<Deficiency> findByUserIdAndReviewId(Long uid, Long rid);

	public ArrayList<Deficiency> findByReviewIdOrderByUserIdAsc(Long id);

}
