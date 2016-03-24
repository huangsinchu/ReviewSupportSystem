package review.system.api.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import review.system.entity.User;

@Path("/helloworld")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface HelloWorldService {
	
	@GET
	@Path("/")
    int helloworld();
	
	@GET
	@Path("/{id}")
	User getUser(@PathParam("id") Long id);
}
