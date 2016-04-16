package review.system.api.model;

public class ReviewCount {

	private int countedReviewer;
	private int countedDeficiency;
	private int finalDeficiency;
	private double predictedDeficiency;

	public ReviewCount(int countedReviewer, int countedDeficiency,
			int finalDeficiency, double predictedDeficiency) {
		super();
		this.countedReviewer = countedReviewer;
		this.countedDeficiency = countedDeficiency;
		this.finalDeficiency = finalDeficiency;
		this.predictedDeficiency = predictedDeficiency;
	}

	public ReviewCount() {
		super();
	}

	public int getCountedReviewer() {
		return countedReviewer;
	}

	public void setCountedReviewer(int countedReviewer) {
		this.countedReviewer = countedReviewer;
	}

	public int getCountedDeficiency() {
		return countedDeficiency;
	}

	public void setCountedDeficiency(int countedDeficiency) {
		this.countedDeficiency = countedDeficiency;
	}

	public int getFinalDeficiency() {
		return finalDeficiency;
	}

	public void setFinalDeficiency(int finalDeficiency) {
		this.finalDeficiency = finalDeficiency;
	}

	public double getPredictedDeficiency() {
		return predictedDeficiency;
	}

	public void setPredictedDeficiency(double predictedDeficiency) {
		this.predictedDeficiency = predictedDeficiency;
	}

}
