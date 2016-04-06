package review.system.repository;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.Deficiency;
import review.system.entity.DeficiencyCombinationRecord;

public interface DeficiencyCombinationRepository extends
		PagingAndSortingRepository<DeficiencyCombinationRecord, Long> {

	public ArrayList<Deficiency> findByDeficiencyId(Long combinedId);

}
