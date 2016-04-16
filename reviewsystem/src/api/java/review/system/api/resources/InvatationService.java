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

import review.system.entity.Invatation;

@Path("/invatation")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface InvatationService {

	@GET
	@Path("/{id}")
	Invatation getInvatation(@PathParam("id") Long id);

	@GET
	@Path("/")
	ArrayList<Invatation> getInvatationByUser(@QueryParam("uid") Long uid);

	@POST
	@Path("/")
	Long createInvatation(@Valid Invatation invatation);
}
