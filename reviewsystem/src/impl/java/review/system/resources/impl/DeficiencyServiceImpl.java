package review.system.resources.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.DeficiencyService;
import review.system.entity.Deficiency;
import review.system.entity.DeficiencyCombinationRecord;
import review.system.repository.DeficiencyCombinationRepository;
import review.system.repository.DeficiencyRepository;

public class DeficiencyServiceImpl implements DeficiencyService {

	@Autowired
	private DeficiencyRepository deficiencyRepository;

	@Autowired
	private DeficiencyCombinationRepository deficiencyCombinationRepository;

	@Override
	public Deficiency getDeficiency(Long id) {
		return deficiencyRepository.findOne(id);
	}

	@Override
	public void createDeficiency(Deficiency deficiency) {
		deficiencyRepository.save(deficiency);
	}

	@Override
	public ArrayList<DeficiencyCombinationRecord> getCombinedDeficiency(
			Long combinedId) {
		return deficiencyCombinationRepository.findByDeficiencyId(combinedId);
	}

	@Override
	public void createCombinedDeficiency(
			DeficiencyCombinationRecord deficiencyCombinationRecord) {
		deficiencyCombinationRepository.save(deficiencyCombinationRecord);
	}

	@Override
	public void deleteCombinedDeficiency(Long combinedId) {
		deficiencyCombinationRepository
				.delete(getCombinedDeficiency(combinedId));
	}

	@Override
	public ArrayList<Deficiency> getDeficiencyByUidOrRid(Long uid, Long rid) {
		if (uid != null) {
			if (rid != null) {
				return deficiencyRepository.findByUserIdAndReviewId(uid, rid);
			} else {
				return deficiencyRepository.findByUserId(uid);
			}
		} else {
			return deficiencyRepository.findByReviewId(rid);
		}
	}

}
