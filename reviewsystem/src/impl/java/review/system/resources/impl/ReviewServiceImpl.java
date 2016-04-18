package review.system.resources.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.model.ReviewCount;
import review.system.api.resources.ReviewService;
import review.system.entity.Deficiency;
import review.system.entity.Review;
import review.system.repository.DeficiencyRepository;
import review.system.repository.ReviewRepository;

public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	private DeficiencyRepository deficiencyRepository;

	@Override
	public Review getReview(Long id) {
		return reviewRepository.findOne(id);
	}

	@Override
	public ArrayList<Review> getReviewByUser(Long uid) {
		return reviewRepository.findByUserId(uid);
	}

	@Override
	public Long createReview(Review review) {
		return reviewRepository.save(review).getId();
	}

	@Override
	public ReviewCount getReviewCount(Long id) {
		int totalDeficiencyCount = 0; // status 100
		int totalNewDeficiencyCount = 0;// status 200
		int totalDeclainedDeficiencyCount = 0;// status 300
		int totalCombinedDeficiencyCount = 0;// status 400
		int countedReviewer = 0;
		int deficiencyCount = 0;
		int combinedDeficiencyCount = 0;
		long previousUser = 0;

		int maxDeficiencyCount = 0;
		int maxCombinedDeficiencyCount = 0;

		ArrayList<Deficiency> deficiencyList = deficiencyRepository
				.findByReviewIdOrderByUserIdAsc(id);
		for (Deficiency deficiency : deficiencyList) {
			if (deficiency.getUserId() != previousUser) {
				countedReviewer++;
				deficiencyCount = 0;
				combinedDeficiencyCount = 0;
				previousUser = deficiency.getUserId();
			}

			if (deficiency.getStatus() == 200) {
				// combined deficiency
				totalNewDeficiencyCount++;
			} else if (deficiency.getStatus() == 300) {
				// declained deficiency
				totalDeclainedDeficiencyCount++;
			} else if (deficiency.getStatus() == 400) {
				// deficiency which is combined
				totalCombinedDeficiencyCount++;
				combinedDeficiencyCount++;
			} else {
				totalDeficiencyCount++;
				deficiencyCount++;
			}

			if ((deficiencyCount + combinedDeficiencyCount) > (maxDeficiencyCount + maxCombinedDeficiencyCount)) {
				maxDeficiencyCount = deficiencyCount;
				maxCombinedDeficiencyCount = combinedDeficiencyCount;
			}

		}

		double predictedDeficiencyCount;

		if (maxCombinedDeficiencyCount != 0) {
			double p = (maxDeficiencyCount + maxCombinedDeficiencyCount)
					/ maxCombinedDeficiencyCount;
			predictedDeficiencyCount = p
					* (totalDeficiencyCount + totalCombinedDeficiencyCount
							- maxDeficiencyCount - maxCombinedDeficiencyCount);
		} else {
			predictedDeficiencyCount = 0;
		}
		ReviewCount reviewCount = new ReviewCount(countedReviewer,
				totalDeficiencyCount + totalDeclainedDeficiencyCount
						+ totalCombinedDeficiencyCount, totalDeficiencyCount
						+ totalNewDeficiencyCount, predictedDeficiencyCount);
		return reviewCount;
	}
}
