package review.system.resources.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import review.system.api.resources.ReadingService;
import review.system.entity.Reading;
import review.system.repository.ReadingRepository;

public class ReadingServiceImpl implements ReadingService {

	@Autowired
	private ReadingRepository readingRepository;

	@Override
	public Reading getReading(Long id) {
		return readingRepository.findOne(id);
	}

	@Override
	public Long createReading(Reading reading) {
		return readingRepository.save(reading).getId();
	}

	@Override
	public ArrayList<Reading> getReadingByReview(Long reviewId) {
		return readingRepository.findByReviewId(reviewId);
	}

}
