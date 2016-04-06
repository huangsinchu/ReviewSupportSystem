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

import review.system.entity.Deficiency;

@Path("/deficiency")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface DeficiencyService {
	@GET
	@Path("/{id}")
	Deficiency getDeficiency(@PathParam("id") Long id);

	@GET
	@Path("/")
	ArrayList<Deficiency> getDeficiencyByUser(@QueryParam("uid") Long uid);

	@GET
	@Path("/")
	ArrayList<Deficiency> getDeficiencyByReview(
			@QueryParam("reviewId") Long reviewId);

	@GET
	@Path("/")
	ArrayList<Deficiency> getCombinedDeficiency(
			@QueryParam("combinedId") Long combinedId);

	@POST
	@Path("/")
	void createDeficiency(@Valid Deficiency deficiency);
}
