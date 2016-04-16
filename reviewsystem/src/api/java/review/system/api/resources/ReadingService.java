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

import review.system.entity.Reading;

@Path("/reading")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface ReadingService {

	@GET
	@Path("/{id}")
	Reading getReading(@PathParam("id") Long id);

	@GET
	@Path("/")
	ArrayList<Reading> getReadingByReview(@QueryParam("reviewId") Long reviewId);

	@POST
	@Path("/")
	Long createReading(@Valid Reading reading);
}
