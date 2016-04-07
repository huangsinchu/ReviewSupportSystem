package review.system.repository;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.Invatation;

public interface InvatationRepository extends
		PagingAndSortingRepository<Invatation, Long> {

	public ArrayList<Invatation> findByUserId(Long uid);

}
