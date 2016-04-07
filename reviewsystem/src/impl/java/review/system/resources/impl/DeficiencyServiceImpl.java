package review.system.resources.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.DeficiencyService;
import review.system.entity.Deficiency;
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
	public ArrayList<Deficiency> getDeficiencyByUser(Long uid) {
		return deficiencyRepository.findByUserId(uid);
	}

	@Override
	public ArrayList<Deficiency> getDeficiencyByReview(Long reviewId) {
		return deficiencyRepository.findByReviewId(reviewId);
	}

	@Override
	public void createDeficiency(Deficiency deficiency) {
		deficiencyRepository.save(deficiency);
	}

	@Override
	public ArrayList<Deficiency> getCombinedDeficiency(Long combinedId) {
		return deficiencyCombinationRepository.findByDeficiencyId(combinedId);
	}

}
