package review.system.api.resources;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import review.system.entity.DocPosition;
import review.system.entity.CodePosition;

@Path("/position")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface PositionService {
	@GET
	@Path("/code/{id}")
	CodePosition getCodePosition(@PathParam("id") Long id);

	@POST
	@Path("/code/")
	void createCodePosition(@Valid CodePosition codePosition);

	@GET
	@Path("/doc/{id}")
	DocPosition getDocPosition(@PathParam("id") Long id);

	@POST
	@Path("/doc/")
	void createDocPosition(@Valid DocPosition docPosition);
}
