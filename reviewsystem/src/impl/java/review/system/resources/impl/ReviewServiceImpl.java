package review.system.resources.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.ReviewService;
import review.system.entity.Review;
import review.system.repository.ReviewRepository;

public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;

	@Override
	public Review getReview(Long id) {
		return reviewRepository.findOne(id);
	}

	@Override
	public ArrayList<Review> getReviewByUid(Long uid) {
		return reviewRepository.findByUserId(uid);
	}

	@Override
	public void createReview(Review review) {
		reviewRepository.save(review);
	}
}
