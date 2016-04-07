package review.system.repository;

import java.util.ArrayList;

import org.springframework.data.repository.PagingAndSortingRepository;

import review.system.entity.DeficiencyCombinationRecord;

public interface DeficiencyCombinationRepository extends
		PagingAndSortingRepository<DeficiencyCombinationRecord, Long> {

	public ArrayList<DeficiencyCombinationRecord> findByDeficiencyId(
			Long combinedId);

}
