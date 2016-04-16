package review.system.api.resources;

import java.util.ArrayList;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import review.system.entity.Deficiency;
import review.system.entity.DeficiencyCombinationRecord;

@Path("/deficiency")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface DeficiencyService {
	@GET
	@Path("/{id}")
	Deficiency getDeficiency(@PathParam("id") Long id);

	@GET
	@Path("/")
	ArrayList<Deficiency> getDeficiencyByUidOrRid(@QueryParam("uid") Long uid,
			@QueryParam("rid") Long rid);

	@POST
	@Path("/")
	Long createDeficiency(@Valid Deficiency deficiency);

	@GET
	@Path("/combine/{id}")
	ArrayList<DeficiencyCombinationRecord> getCombinedDeficiency(
			@PathParam("id") Long combinedId);

	@POST
	@Path("/combine")
	void createCombinedDeficiency(
			@Valid DeficiencyCombinationRecord deficiencyCombinationRecord);

	@DELETE
	@Path("/combine/{id}")
	void deleteCombinedDeficiency(@PathParam("id") Long combinedId);
}
