package review.system.api.resources;

import java.util.ArrayList;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import review.system.api.model.ReviewCount;
import review.system.entity.Review;

@Path("/review")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface ReviewService {

	@GET
	@Path("/{id}")
	Review getReview(@PathParam("id") Long id);

	@GET
	@Path("/")
	ArrayList<Review> getReviewByUser(@QueryParam("uid") Long uid);

	@POST
	@Path("/")
	Long createReview(@Valid Review review);

	@GET
	@Path("/{id}/count")
	ReviewCount getReviewCount(@PathParam("id") Long id);

}
